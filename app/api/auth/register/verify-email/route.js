import { connectDB } from "../../../../../lib/databaseConnection";
import { jwtVerify } from "jose";
import UserModel from "../../../../../models/User.model";
import { response, catchError } from "../../../../../lib/helperFunction";
import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";

export async function POST(request) {
	try {
		await connectDB();
		// Accept token from multiple sources: JSON body, Authorization header, or full URL
		const contentType = request.headers.get("content-type") || "";
		let bodyToken = null;
		if (contentType.includes("application/json")) {
			try {
				const body = await request.json();
				bodyToken = body?.token ?? null;
			} catch (e) {
				bodyToken = null;
			}
		} else if (contentType.includes("application/x-www-form-urlencoded")) {
			try {
				const text = await request.text();
				const params = new URLSearchParams(text);
				bodyToken = params.get("token") || null;
			} catch (e) {
				bodyToken = null;
			}
		} else {
			try {
				const text = await request.text();
				if (text) {
					const maybe = text.trim();
					if (maybe.startsWith("http")) {
						const u = new URL(maybe);
						bodyToken = u.searchParams.get("token");
					} else if (maybe.includes("token=")) {
						const params = new URLSearchParams(maybe);
						bodyToken = params.get("token");
					} else {
						try {
							const parsed = JSON.parse(maybe);
							bodyToken = parsed?.token ?? null;
						} catch (e) {
							bodyToken = maybe;
						}
					}
				}
			} catch (e) {
				bodyToken = null;
			}
		}

		// also accept Authorization: Bearer <token>
		const auth =
			request.headers.get("authorization") ||
			request.headers.get("Authorization");
		let token = null;
		if (auth && auth.toLowerCase().startsWith("bearer ")) {
			token = auth.split(" ")[1].trim();
		}
		if (!token) token = bodyToken;
		// Verify the token and update user verification status logic goes here
		if (!token) {
			return response(false, 400, "Invalid token.", {});
		}
		// Try to decode and sanitize token (POST bodies may include url-encoded tokens or full URLs)
		try {
			token = decodeURIComponent(String(token)).trim();
		} catch (e) {
			token = String(token).trim();
		}

		// masked logging for debugging (first/last 6 characters) — only in development
		try {
			if (process.env.NODE_ENV === "development") {
				const t = String(token);
				const masked = t.length > 12 ? `${t.slice(0, 6)}...${t.slice(-6)}` : t;
				console.log("verify-email POST received token:", masked);
			}
		} catch (e) {
			// ignore logging errors
		}

		// If token looks like a full URL, try to extract token param again
		if (!/^[-_A-Za-z0-9]+\.[-_A-Za-z0-9]+\.[-_A-Za-z0-9]+$/.test(token)) {
			if (/^https?:\/\//.test(token)) {
				try {
					const u = new URL(token);
					const t2 = u.searchParams.get("token");
					if (t2) token = t2;
				} catch (e) {}
			}
		}

		if (!/^[-_A-Za-z0-9]+\.[-_A-Za-z0-9]+\.[-_A-Za-z0-9]+$/.test(token)) {
			return response(false, 400, "Invalid token format.", {});
		}
		const secret = new TextEncoder().encode(process.env.SECRET_KEY);
		let decoded;
		try {
			decoded = await jwtVerify(token, secret);
		} catch (err) {
			if (err?.code === "ERR_JWS_INVALID" || err?.name === "JWSInvalid") {
				return response(false, 400, "Invalid token.", {});
			}
			if (err?.code === "ERR_JWT_EXPIRED" || err?.name === "JWTExpired") {
				return response(false, 401, "Token expired or invalid.", {});
			}
			throw err;
		}
		const userId = decoded.payload.userId;
		if (!isValidObjectId(userId)) {
			return response(false, 400, "Invalid user ID in token.", {});
		}
		//get user
		const user = await UserModel.findById(userId);
		if (!user) {
			return new Response(JSON.stringify({ message: "User not found." }), {
				status: 404,
			});
		}
		user.isEmailVerified = true;
		await user.save();
		return new Response(
			JSON.stringify({ message: "Email verified successfully." }),
			{ status: 200 }
		);
	} catch (error) {
		console.error("verify-email error:", error);
		// Handle JWT expiration explicitly
		if (error?.code === "ERR_JWT_EXPIRED" || error?.name === "JWTExpired") {
			return response(false, 401, "Token expired or invalid.", {});
		}
		return catchError(error, "Registration failed.");
	}
}

export async function GET(request) {
	try {
		// Redirect to client-side verification page which will POST to the API
		const url = new URL(request.url);
		let token = url.searchParams.get("token");
		if (!token) {
			return response(false, 400, "Invalid token.", {});
		}
		try {
			token = decodeURIComponent(String(token)).trim();
		} catch (e) {
			token = String(token).trim();
		}

		const redirectUrl = new URL(`/auth/verify-email`, request.url);
		redirectUrl.searchParams.set("token", token);
		return NextResponse.redirect(redirectUrl);
	} catch (error) {
		console.error("verify-email GET error:", error);
		return catchError(error, "Verification failed.");
	}
}
