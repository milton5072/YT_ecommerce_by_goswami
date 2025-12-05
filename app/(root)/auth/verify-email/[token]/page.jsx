"use client";
import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Card, CardContent, Button, Link } from "@/components/ui/card";
import { WEBSITE_HOME } from "../../../../../routes/WebsiteRoute";
const EmailVerification = ({ params }) => {
	const { token: pathToken } = use(params);
	const search = useSearchParams();
	const queryToken = search?.get?.("token");
	// Prefer token from query string (email links often include it as ?token=...)
	const token = queryToken
		? decodeURIComponent(String(queryToken)).trim()
		: pathToken;
	const [isVerified, setIsVerified] = useState(false);
	const [errorMsg, setErrorMsg] = useState(null);
	useEffect(() => {
		const verify = async () => {
			try {
				if (!token) {
					setErrorMsg("Missing token");
					return;
				}
				const decodedToken = decodeURIComponent(String(token)).trim();
				const { data: verificationResponse } = await axios.post(
					"/api/auth/register/verify-email",
					{ token: decodedToken },
					{ headers: { "Content-Type": "application/json" } }
				);
				if (verificationResponse?.success) {
					setIsVerified(true);
				} else {
					setErrorMsg(verificationResponse?.message || "Verification failed");
				}
			} catch (err) {
				setErrorMsg(
					err?.response?.data?.message || err.message || "Network error"
				);
			}
		};
		verify();
	}, [token]);
	return (
		<div>
			<Card>
				<CardContent>
					{isVerified ? (
						<div>
							<p className="text-green-600">Email verified successfully!</p>
						</div>
					) : errorMsg ? (
						<p className="text-red-600">{errorMsg}</p>
					) : (
						<p className="text-red-600">Verifying your email...</p>
					)}
				</CardContent>
			</Card>
			Verify Email Page
		</div>
	);
};
export default EmailVerification;
