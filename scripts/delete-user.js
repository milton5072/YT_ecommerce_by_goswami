const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

function parseEnvFile(envPath) {
	if (!fs.existsSync(envPath)) return {};
	const content = fs.readFileSync(envPath, "utf8");
	const lines = content.split(/\r?\n/);
	const env = {};
	for (let line of lines) {
		line = line.trim();
		if (!line || line.startsWith("#")) continue;
		const idx = line.indexOf("=");
		if (idx === -1) continue;
		const key = line.slice(0, idx).trim();
		let val = line.slice(idx + 1).trim();
		if (
			(val.startsWith('"') && val.endsWith('"')) ||
			(val.startsWith("'") && val.endsWith("'"))
		) {
			val = val.slice(1, -1);
		}
		env[key] = val;
	}
	return env;
}

async function main() {
	const envPath = path.join(process.cwd(), ".env.local");
	const env = parseEnvFile(envPath);
	const uri = env.MONGODB_URI || process.env.MONGODB_URI;
	if (!uri) {
		console.error("No MONGODB_URI found in .env.local or process.env");
		process.exit(2);
	}

	const targetEmail = process.argv[2] || "nextoxyofficial@gmail.com";
	console.log("Deleting user with email:", targetEmail);

	try {
		await mongoose.connect(uri, {
			dbName: "YT_ecommerce",
			bufferCommands: false,
		});
		const res = await mongoose.connection
			.collection("users")
			.deleteOne({ email: targetEmail });
		console.log("deleteResult:", res);
		await mongoose.disconnect();
		process.exit(0);
	} catch (err) {
		console.error("Error deleting user:", err);
		process.exit(1);
	}
}

main();
