const http = require("http");
const token = process.argv[2];
if (!token) {
	console.error("Usage: node scripts/test-verify.js <token>");
	process.exit(2);
}
const data = JSON.stringify({ token });

const req = http.request(
	{
		hostname: "localhost",
		port: 3000,
		path: "/api/auth/register/verify-email",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Content-Length": Buffer.byteLength(data),
		},
	},
	(res) => {
		let body = "";
		res.on("data", (c) => (body += c));
		res.on("end", () => {
			console.log("status", res.statusCode);
			console.log("body", body);
		});
	}
);
req.on("error", (err) => console.error("request error", err));
req.write(data);
req.end();
