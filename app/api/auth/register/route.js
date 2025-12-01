import { response } from "../../../../lib/helperFunction";
import UserModel from "../../../../models/User.model";
import connectDB from "./lib/databaseConnection";
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
		const checkUser = await UserModel.exists({ email });
		if (checkUser) {
			return response(
				true,
				409,
				"User already exists with this email.",
				validatedData.error
			);
		}
		const newRegistration = new UserModel({
			name,
			email,
			password,
		});
		await newRegistration.save();
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT({ userId: newRegistration._id })
    .setIssueAt()
    .setExpirationTime('1h')
    .setProtectedHeader({ alg: 'HS256' })
    .sign(secret);
	} catch (error) {
		return new Response(JSON.stringify({ message: "Internal Server Error" }), {
			status: 500,
		});
	}
}
