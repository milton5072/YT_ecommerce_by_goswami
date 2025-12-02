export const sendMail = async (subject, receiver, body) => {
    const transporter = nodemailer.createTransport({
        host: "process.env.NODEMAILER_HOST",
        port: "process.env.NODEMAILER_HOST",
        secure: false,
        auth: {
            user: "username",
            pass: "password"
        }
    });
}