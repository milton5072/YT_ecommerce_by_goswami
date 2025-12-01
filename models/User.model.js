import mongoose from "mongoose";
import { trim } from "zod";
import { is } from "zod/locales";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		role: {
			type: String,
			required: true,
			enum: ["user", "admin", "stuff"],
			default: "user",
		},
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
		},
		email: {
			type: String,
			required: true,
      
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			select: false,
		},
		avatar: {
			url: {
				type: String,
				trim: true,
			},
			public_id: {
				type: String,
				trim: true,
			},
		},
		isEmailVerified: {
			type: Boolean,
			default: false,
		},
		phone: {
			type: String,
			trim: true,
		},
		address: {
			type: String,
			trim: true,
		},
		deletedAt: {
			type: Date,
			default: null,
			index: true,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods = {
	comparePassword: async function (candidatePassword) {
		return await bcrypt.compare(candidatePassword, this.password);
	},
};

const UserModel =
	mongoose.models.User || mongoose.model("User", userSchema, "users");

export default UserModel;
