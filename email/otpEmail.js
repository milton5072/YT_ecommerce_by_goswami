
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

                <h1>Welcome to My Website</h1>
                <p>${otp}</p>
                

            </body>
            </html>

    `;
	return html;
};
