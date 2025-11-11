"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ButtonLoading from "@/components/application/ButtonLoading";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
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

const formSchema = zSchema
	.pick({
		email: true,
	})
	.extend({ password: z.string().min("3", "Password is required!") });

const LoginPage = () => {
	// useForm সবসময় component এর ভিতরে কল করতে হবে
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	//submit handler
	const handleLoginSubmit = async (values) => {
		console.log("Submitted:", values);
	};
	const [loading, setLoading] = useState(false);
	const [isTypePassword, setIsTypePassword] = useState(true);

	return (
		<Card className="w-full max-w-sm">
			<CardContent>
				<p className="text-center text-2xl font-semibold">Logo</p>
				<p className="text-center mt-4">Log in to your account!</p>

				{/* form wrapper */}
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleLoginSubmit)}
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
			</CardContent>

			<CardFooter className="flex-col gap-2">
				<CardAction>
					<Button variant="link">Sign Up</Button>
				</CardAction>
			</CardFooter>
		</Card>
	);
};

export default LoginPage;
