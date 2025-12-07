import z from "zod";
import { connectDB } from "../../../../../lib/databaseConnection";
import { catchError, generateOTP } from "../../../../../lib/helperFunction";
import { zSchema } from "../../../../../lib/zodSchema";
import { z } from "zod";
import optModel from "../../../../../models/Otp.model";
export async function POST(request) {
	try {
		await connectDB();
		const payload = await request.json();
		const validationSchema = zSchema
			.pick({
				email: true,
			})
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
		//get user data
		const getUser = await UserModel.findOne({ email });
		if (!getUser) {
			return response(false, 400, "Invalid login credentials.");
		}
		//resend verification email if not verified
		if (!getUser.isEmailVerified) {
			const secret = new TextEncoder().encode(process.env.SECRET_KEY);
			const token = await new SignJWT({
				userId: newRegistration._id.toString(),
			})
				.setIssuedAt()
				.setExpirationTime("1h")
				.setProtectedHeader({ alg: "HS256" })
				.sign(secret);
			await sendMail(
				"Email Verification Request from Kazi Asad",
				email,
				emailVerificationLink(
					`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/token?token=${token}`
				)
			);
			return response(
				false,
				401,
				"Please verify your email address. A new verification email has been sent to your email."
			);
		}
		//compare password
		const isPasswordVerified = await getUser.comparePassword(password);
		if (!isPasswordVerified) {
			return response(false, 400, "Invalid login credentials.");
		}
		// otp generation
    await optModel.deleteMany({email}) //deleting old otp
    const otp = generateOTP()

    //store otp in database
    const newOtpData = new optModel({
      email, otp
    })
    await newOtpData.save()


	} catch (error) {
		return catchError(error, "Login failed.");
	}
}
