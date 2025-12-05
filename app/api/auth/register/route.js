import { response, catchError } from "../../../../lib/helperFunction";
import UserModel from "../../../../models/User.model";
import { connectDB } from "../../../../lib/databaseConnection";
import { zSchema } from "../../../../lib/zodSchema";
import { SignJWT } from "jose";
import { sendMail } from "../../../../lib/sendMail";
import { emailVerificationLink } from "../../../../email/emailVerificationLink";
export async function POST(request) {
	try {
		await connectDB();
		const validationSchema = zSchema.pick({
			name: true,
			email: true,
			password: true,
		});
		const payload = await request.json();
		const validatedData = validationSchema.safeParse(payload);
		if (!validatedData.success) {
			return response(false, 401, "Invalid or missing input field.", {
				errors: validatedData.error.errors,
			});
		}
		const { name, email, password } = validatedData.data;
		// check if user already exists
		const checkUser = await UserModel.exists({ email });
		if (checkUser) {
			return response(false, 409, "User already exists with this email.", {});
		}
		// create new user
		const newRegistration = new UserModel({
			name,
			email,
			password,
		});
		await newRegistration.save();
		const secret = new TextEncoder().encode(process.env.SECRET_KEY);
		const token = await new SignJWT({ userId: newRegistration._id.toString() })
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
			true,
			201,
			"Registration successful. Please verify your email address.",
			{
				userId: newRegistration._id,
			}
		);
	} catch (error) {
		return catchError(error, "Registration failed.");
	}
}
