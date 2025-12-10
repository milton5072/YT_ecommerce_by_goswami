export const otpEmail = (otp) => {
	const html = `
                    <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>My Website</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 20px;
                    }
                </style>
            </head>
            <body>

                <p>We have received a request to verify your identity. Use the following one-time password (OTP) to complete the verification process.</p>
                <h1>${otp}</h1>
                

            </body>
            </html>

    `;
	return html;
};
