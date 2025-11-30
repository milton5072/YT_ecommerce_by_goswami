import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
});
