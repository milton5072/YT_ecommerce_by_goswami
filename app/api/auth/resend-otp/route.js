import connectDB from "@/lib/dbConnect";
import { response, catchError } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import optModel from "@/models/Otp.model";
import UserModel from "@/models/User.model";
import { generateOTP } from "@/lib/otpGenerator";
import { sendMail } from "@/lib/sendMail";
import { otpEmail } from "@/lib/emailTemplates/otpEmailTemplate";

export async function POST(request) {
	try {
		await connectDB();
		const payload = await request.json();
		const validationSchema = zSchema.pick({
			email: true,
		});
		const validatedData = validationSchema.safeParse(payload);
		if (!validatedData.success) {
			return response(false, 401, "Invalid or missing input field.", {
				errors: validatedData.error.errors,
			});
		}
		const getUser = await UserModel.findOne({ email });
		if (!getUser) {
			return response(false, 404, "User not found.", {});
		}
		// remove old otps
		await optModel.deleteMany({ email });
		// create and send new otp
		const otp = generateOTP();
		const newOtpData = new optModel({ email, otp });
		await newOtpData.save();

		// send otp to user email
		const otpSendStatus = await sendMail(
			"Your login verification code. ",
			email,
			otpEmail(otp)
		);
		if (!otpSendStatus.success) {
			return response(
				false,
				500,
				"Failed to send OTP email. Please try again later.",
				{}
			);
		}
		return response(true, 200, "OTP resent successfully.", {});
	} catch (error) {
		return catchError(error, "Database connection failed.");
	}
}
