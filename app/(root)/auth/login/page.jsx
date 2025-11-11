"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const formSchema = zSchema.pick({
	email: true,
	password: true,
});

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
	const handleLoginSubmit = async (value) => {
		console.log("Submitted:", value);
	};

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
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="•••••••"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="w-full"
						>
							Login
						</Button>
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
