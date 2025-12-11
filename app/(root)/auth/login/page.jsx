"use client";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ButtonLoading from "@/components/application/ButtonLoading";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { WEBSITE_REGISTER } from "../../../../routes/WebsiteRoute";
import { Card, CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zSchema } from "@/lib/zodSchema";
import { z } from "zod";
import { useState } from "react";
import Link from "next/link";
import { showToast } from "../../../../lib/showToast";
import OtpVarification from "../../../../components/application/OtpVarification";

const formSchema = zSchema
	.pick({
		email: true,
	})
	.extend({ password: z.string().min("3", "Password is required!") });

const LoginPage = () => {
	const [loading, setLoading] = useState(false);
	const [otpVerificationLoading, setOtpVerificationLoading] = useState(false);
	const [isTypePassword, setIsTypePassword] = useState(true);
	const [otpEmail, setOtpEmail] = useState("");

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// destructure handleSubmit to avoid `form.handleSubmit is not a function` errors
	const { handleSubmit } = form;

	//submit handler
	const handleLoginSubmit = async (values) => {
		try {
			setLoading(true);
			const { data: registerResponse } = await axios.post(
				"/api/auth/login",
				values
			);
			if (!registerResponse.success) {
				throw new Error(registerResponse.message);
			}
			setOtpEmail(values.email);
			setLoading(false);
			form.reset();
			showToast("success", registerResponse.message);
		} catch (error) {
			showToast("error", error?.response?.data?.message || error.message);
		} finally {
			setLoading(false);
		}
	};
  // OTP verification 
  const handleOtpVerification = async(values)=>{
    try {
			setOtpVerificationLoading(true);
			const { data: registerResponse } = await axios.post(
				"/api/auth/verify-otp",
				values
			);
			if (!registerResponse.success) {
				throw new Error(registerResponse.message);
			}
			setOtpEmail('');
			showToast("success", registerResponse.message);
		} catch (error) {
			showToast("error", error?.response?.data?.message || error.message);
		} finally {
			setOtpVerificationLoading(false);
		}
  }
	return (
    <>
      <Card className="w-full max-w-sm m-auto">
        {!otpEmail ? (
          
			  <CardContent>
				
          <p className="text-center text-2xl font-semibold">Logo</p>
          <p className="text-center mt-4">Log in to your account!</p>
						{/* form wrapper */}
						<Form {...form}>
							<form
								onSubmit={handleSubmit(handleLoginSubmit)}
								className="space-y-4"
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													type="email"
													placeholder="example@gmail.com"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem className="relative">
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													type={isTypePassword ? "password" : "text"}
													placeholder="•••••••"
													{...field}
												/>
											</FormControl>
											<button
												type="button"
												className="absolute top-1/2 right-2 cursor-pointer"
												onClick={() => setIsTypePassword(!isTypePassword)}
											>
												{isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
											</button>
											<FormMessage />
										</FormItem>
									)}
								/>

								<ButtonLoading
									type="submit"
									text="Login"
									loading={loading}
									className="w-full cursor-pointer"
								/>
							</form>
						</Form>
            <div>
				<div className="flex items-center justify-center gap-2">
					<p>Do not have a account?</p>
					<Link
						className="text-primary text-sm underline"
						href={WEBSITE_REGISTER}
					>
						Create an Account
					</Link>
				</div>
				<Link
					href="/"
					className="flex items-center justify-center text-primary text-sm underline"
				>
					Forget Password
				</Link>
			</div>
				
			</CardContent>
			
    )
    :(<>
      <OtpVarification email={otpEmail} loading={otpVerificationLoading} onSubmit={handleOtpVerification}/>
    </>) 
					

				}
	    </Card>
    </>
	)
};

export default LoginPage;
