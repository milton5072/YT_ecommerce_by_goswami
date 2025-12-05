"use client";

import { useSearchParams } from "next/navigation";

export default function VerifyResultPage() {
	const search = useSearchParams();
	const status = search.get("status");
	const message = search.get("message");

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="p-6 rounded shadow text-center">
				{status === "success" ? (
					<>
						<h2 className="text-2xl font-semibold text-green-600">
							Email verified
						</h2>
						<p className="mt-2">Thank you — your email has been verified.</p>
					</>
				) : (
					<>
						<h2 className="text-2xl font-semibold text-red-600">
							Verification failed
						</h2>
						<p className="mt-2">{message || "Unable to verify your email."}</p>
					</>
				)}
			</div>
		</div>
	);
}
