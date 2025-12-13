import { NextResponse } from "next/server";
import { connectDB } from "@/lib/databaseConnection";
import { response, catchError } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import optModel from "@/models/Otp.model";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";

export async function POST(request) {
  try {
    await connectDB();

    const payload = await request.json();

    const validationSchema = zSchema.pick({
      email: true,
      otp: true,
    });

    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return NextResponse.json(
        { success: false, message: "Invalid input" },
        { status: 401 }
      );
    }

    const { email, otp } = validatedData.data;

    const getOtpData = await optModel.findOne({ email, otp });
    if (!getOtpData) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired OTP" },
        { status: 404 }
      );
    }

    const getUser = await UserModel.findOne({
      email,
      deletedAt: null,
    }).lean();

    if (!getUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const loggedInUserData = {
      _id: getUser._id,
      role: getUser.role,
      name: getUser.name,
      email: getUser.email,
      avatar: getUser.avatar,
    };

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);

    const token = await new SignJWT(loggedInUserData)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);

    // ✅ COOKIE SET USING NextResponse
    const res = NextResponse.json({
      success: true,
      message: "OTP verified successfully",
      data: loggedInUserData,
    });

    res.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    await getOtpData.deleteOne();

    return res;
  } catch (error) {
    return catchError(error, "OTP verification failed");
  }
}
