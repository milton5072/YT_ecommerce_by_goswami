import { z } from "zod";
const passwordRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/;

export const zSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(8, { message: "Must be at least 8 characters long" })
		.regex(passwordRegex, {
			message:
				"One capital letter one small letter 1 number and one special character needed",
		}),
	name: z
		.string()
		.min(2, "Name must be at least 2 characters.")
		.max(50, "Name must be at most 50 characters.")
		.trim(),
  otp: z
    .string().regex(/^\d{6}$/,{message: "OTP must be 6 digits"}),
});
