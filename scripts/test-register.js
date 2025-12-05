const http = require("http");

function wait(ms) {
	return new Promise((res) => setTimeout(res, ms));
}

async function tryPost(retries = 10, delay = 1000) {
	const email = `test+${Date.now()}@example.com`;
	const data = JSON.stringify({
		name: "Test User",
		email,
		password: "Password1!",
	});

	for (let i = 0; i < retries; i++) {
		try {
			const resBody = await new Promise((resolve, reject) => {
				const req = http.request(
					{
						hostname: "localhost",
						port: 3000,
						path: "/api/auth/register",
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Content-Length": Buffer.byteLength(data),
						},
						timeout: 5000,
					},
					(res) => {
						let body = "";
						res.on("data", (chunk) => (body += chunk));
						res.on("end", () => resolve({ statusCode: res.statusCode, body }));
					}
				);
				req.on("error", reject);
				req.write(data);
				req.end();
			});

			console.log("Request finished:", resBody.statusCode, resBody.body);
			return;
		} catch (err) {
			console.log(
				`Attempt ${i + 1} failed: ${
					err.message || err
				}. Retrying in ${delay}ms...`
			);
			await wait(delay);
		}
	}
	console.error("All attempts failed. Is the dev server running?");
}

tryPost();
