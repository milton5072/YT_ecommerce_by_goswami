(async () => {
	const fs = require("fs");
	const path = require("path");
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

	const env = parseEnvFile(path.join(process.cwd(), ".env.local"));
	const secretKey = env.SECRET_KEY || process.env.SECRET_KEY;
	console.log("secretKey:", secretKey && secretKey.length);
	const token = process.argv[2];
	if (!token) {
		console.error("Usage: node scripts/debug-jwt.js <token>");
		process.exit(2);
	}
	try {
		const { jwtVerify } = await import("jose");
		const secret = new TextEncoder().encode(secretKey);
		const decoded = await jwtVerify(token, secret);
		console.log("decoded payload:", decoded.payload);
	} catch (err) {
		console.error("jwtVerify error:", err);
	}
})();
