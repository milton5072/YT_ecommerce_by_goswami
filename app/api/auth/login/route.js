import z from "zod";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, generateOTP, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import optModel from "@/models/Otp.model";
import { otpEmail } from "@/email/otpEmail";
import { sendMail } from "@/lib/sendMail";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";
import { emailVerificationLink } from "@/email/emailVerificationLink";

export async function POST(request) {
	try {
		await connectDB();
		const payload = await request.json();

		const validationSchema = zSchema
			.pick({ email: true })
			.extend({ password: z.string() });

		const validatedData = validationSchema.safeParse(payload);

		if (!validatedData.success) {
			return response(
				false,
				401,
				"Invalid or missing input field.",
				validatedData.error
			);
		}

		const { email, password } = validatedData.data;

		// find user
		const getUser = await UserModel.findOne({
			deletedAt: null,
			email,
		}).select("+password");

		if (!getUser) {
			return response(false, 400, "Invalid login credentials.");
		}

		// if user not verified send email
		if (!getUser.isEmailVerified) {
			const secret = new TextEncoder().encode(process.env.SECRET_KEY);

			const token = await new SignJWT({
				userId: getUser._id.toString(), // ✔ FIXED
			})
				.setIssuedAt()
				.setExpirationTime("1h")
				.setProtectedHeader({ alg: "HS256" })
				.sign(secret);

			await sendMail(
				"Email Verification Request from Kazi Asad",
				email,
				emailVerificationLink(
					`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email?token=${token}` // ✔ FIXED
				)
			);

			return response(
				false,
				401,
				"Please verify your email address. A new verification email has been sent."
			);
		}

		// verify password
		const isPasswordVerified = await getUser.comparePassword(password);

		if (!isPasswordVerified) {
			return response(false, 400, "Invalid login credentials.");
		}

		// generate otp
		await optModel.deleteMany({ email });
		const otp = generateOTP();

		const newOtpData = new optModel({
			email,
			otp,
		});

		await newOtpData.save();

		const otpEmailStatus = await sendMail(
			"Your login verification code.",
			email,
			otpEmail(otp)
		);

		if (!otpEmailStatus.success) {
			return response(false, 400, "Failed to send otp.");
		}

		return response(true, 200, "Please verify your OTP.");
	} catch (error) {
		return catchError(error, "Login failed.");
	}
}
