import { NextResponse } from "next/server";

export const response = (success, statusCode, message, data = {}) => {
	return NextResponse.json(
		{
			success,
			message,
			data,
		},
		{
			status: statusCode,
		}
	);
};

export const catchError = (error, customMessage) => {
	// handling duplicate key error
	if (error.code === 11000) {
		const keys = Object.keys(error.keyValue)[0];
		error.message = `Duplicate fields: ${keys}. These fields value must be unique.`;
		return response(
			false,
			409,
			`An account with this ${keys} already exists.`,
			{}
		);
	}
	let errorObj = {};
	if (process.env.NODE_ENV === "development") {
		errorObj = {
			message: error?.message || customMessage || "Internal Server Error",
			error,
		};
	} else {
		errorObj = {
			message: customMessage || "Internal Server Error",
		};
	}

	// Determine a numeric HTTP status code. Prefer common fields that may hold status information.
	let statusCode = 500;
	if (
		typeof error?.status === "number" &&
		error.status >= 100 &&
		error.status <= 599
	) {
		statusCode = error.status;
	} else if (
		typeof error?.statusCode === "number" &&
		error.statusCode >= 100 &&
		error.statusCode <= 599
	) {
		statusCode = error.statusCode;
	} else if (
		typeof error?.code === "number" &&
		error.code >= 100 &&
		error.code <= 599
	) {
		statusCode = error.code;
	} else if (!isNaN(Number(error?.status))) {
		const n = Number(error.status);
		if (n >= 100 && n <= 599) statusCode = n;
	} else if (!isNaN(Number(error?.statusCode))) {
		const n = Number(error.statusCode);
		if (n >= 100 && n <= 599) statusCode = n;
	}
	const message = errorObj.message;
	const data =
		process.env.NODE_ENV === "development" ? { error: errorObj.error } : {};

	return response(false, statusCode, message, data);
};
