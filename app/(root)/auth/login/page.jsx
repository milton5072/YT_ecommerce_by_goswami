import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const loginPage = () => {
	return (
		<Card className="w-full max-w-sm">
			<CardContent>
				<p className="text-center text-2xl font-semibold">Logo</p>
				<p className="text-center mt-4">Log in to your account!</p>
				<form>
					<div className="flex flex-col gap-6">
						<div className="grid gap-2">
							<Label
								htmlFor="email"
								className="text-sm text-gray-400"
							>
								Email
							</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label
									htmlFor="password"
									className="text-sm text-gray-400"
								>
									Password
								</Label>
								<a
									href="#"
									className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
								>
									Forgot your password?
								</a>
							</div>
							<Input
								id="password"
								type="password"
								required
							/>
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex-col gap-2">
				<Button
					type="submit"
					className="w-full"
				>
					Login
				</Button>
				<Button
					variant="outline"
					className="w-full"
				>
					Login with Google
				</Button>
				<CardAction>
					<Button variant="link">Sign Up</Button>
				</CardAction>
			</CardFooter>
		</Card>
	);
};
export default loginPage;
