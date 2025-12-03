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
			message: error.message,
			error,
		};
	} else {
		errorObj = {
			message: customMessage || "Internal Server Error",
		};
	}
	return response(false, error.code, ...errorObj, {});
};
