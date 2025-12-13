import { connectDB } from "@/lib/databaseConnection";
import { response, catchError } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import optModel from "@/models/Otp.model";
import { SignJWT } from "jose";
import path from "path";
import { id } from "zod/locales";
export async function POST(request) {
	try {
		await connectDB();
		const payload = await request.json();
		const validationSchema = zSchema.pick({
			email: true,
			otp: true,
		});
		const validatedData = validationSchema.safeParse(payload);
		if (!validatedData.success) {
			return response(false, 401, "Invalid or missing input field.", {
				errors: validatedData.error.errors,
			});
		}
		const { email, otp } = validatedData.data;
		const getOtpData = await optModel.findOne({ email, otp });
		if (!getOtpData) {
			return response(false, 404, "Invalid or expaired OTP.", {});
		}
		const getUser = await UserModel.findOne({ email, deletedAt: null }).lean();
		if (!getUser) {
			return response(false, 404, "User not found.", {});
		}
		const loggedInUserData = {
			_id: getUser._id,
			role: getUser.role,
			name: getUser.name,
			email: getUser.email,
			avatar: getUser.avatar,
		};
		const secret = new TextEncoder().encode(process.env.SECRET_KEY);
		const token = await new SignJWT(loggedInUserData)
			.setProtectedHeader({ alg: "HS256", typ: "JWT" })
			.setIssuedAt()
			.setExpirationTime("24h")
			.sign(secret);
		const cookieStore = await cookies();
		cookieStore.set({
			name: "auth_token",
			value: token,
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			path: "/",
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		});
		// remove OTP after successful verification
		await getOtpData.deleteOne();
		return response(true, 200, "OTP verified successfully.", loggedInUserData);
	} catch (error) {
		return catchError(error, "Database connection failed.");
	}
}
