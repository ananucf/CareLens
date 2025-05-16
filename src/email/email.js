import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "ananmimucf@gmail.com",
        pass: "sskw dkci ygoi urfa",
    },
});
export const sendEmails = async ({ to, subject, text }) => {


    jwt.sign({ email:to }, 'anan', async (err, token) => {
        if (err) return res.json(err)
        const info = await transporter.sendMail({
            from: '"careLens👻" <ananmimucf@gmail.com>', // sender address
            to, // list of receivers
            subject, // Subject line
            // html: emailHtml(token), // html body
            html: text
        });
        console.log("Message sent: %s", info.messageId);

    })
}
