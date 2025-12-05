"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyEmailPage() {
	const search = useSearchParams();
	const router = useRouter();
	const token = search.get("token");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!token) {
			router.push(
				"/auth/verify-email/result?status=error&message=" +
					encodeURIComponent("Missing token")
			);
			return;
		}

		(async () => {
			try {
				const res = await fetch("/api/auth/register/verify-email", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ token }),
				});
				const payload = await res.json().catch(() => ({}));
				if (res.ok) {
					router.push("/auth/verify-email/result?status=success");
				} else {
					const msg = payload?.message || "Verification failed";
					router.push(
						"/auth/verify-email/result?status=error&message=" +
							encodeURIComponent(msg)
					);
				}
			} catch (err) {
				console.error("client verify error", err);
				router.push(
					"/auth/verify-email/result?status=error&message=" +
						encodeURIComponent("Network error")
				);
			}
		})();
	}, [token, router]);

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="text-center p-6 rounded shadow">
				<h2 className="text-xl font-semibold">Verifying...</h2>
				<p className="mt-4 text-sm text-muted-foreground">
					Please wait while we verify your email.
				</p>
			</div>
		</div>
	);
}
