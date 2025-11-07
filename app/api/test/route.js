import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/databaseConnection";

export async function GET() {
	await connectDB();
	return NextResponse.json({
		success: true,
		message: "connection success.",
	});
}
