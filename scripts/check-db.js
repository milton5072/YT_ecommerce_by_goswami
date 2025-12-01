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
		// remove surrounding quotes if present
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

(async function main() {
	try {
		const envPath = path.join(process.cwd(), ".env.local");
		const env = parseEnvFile(envPath);
		const uri = env.MONGODB_URI || process.env.MONGODB_URI;
		if (!uri) {
			console.error("No MONGODB_URI found in .env.local or process.env");
			process.exit(2);
		}

		console.log("Using MONGODB_URI:", uri.replace(/(.{8}).+(.{8})/, "$1...$2"));

		await mongoose.connect(uri, {
			dbName: "YT_ecommerce",
			bufferCommands: false,
		});
		console.log("MongoDB connection successful.");
		await mongoose.disconnect();
		process.exit(0);
	} catch (err) {
		console.error("MongoDB connection failed:");
		console.error(err);
		process.exit(1);
	}
})();
