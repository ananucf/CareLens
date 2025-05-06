/* email.js */
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


/* email.js */
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// import { emailHtml } from "./email.Html.js";
// import jwt from "jsonwebtoken";

// // تحميل المتغيرات البيئية
// dotenv.config();

// // إنشاء transporter باستخدام بيانات الاعتماد من .env
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,  // يجب أن يكون لديك EMAIL_USER في ملف .env
//         pass: process.env.EMAIL_PASS,  // يجب أن يكون لديك EMAIL_PASS في ملف .env
//     },
// });

// export const sendEmails = async (email) => {
//     try {
//         // إنشاء توكن JWT للتحقق من البريد
//         jwt.sign({ email }, process.env.JWT_SECRET, async (err, token) => {
//             if (err) {
//                 console.error("JWT Error:", err);
//                 return;
//             }

//             // إرسال البريد الإلكتروني باستخدام nodemailer
//             const info = await transporter.sendMail({
//                 from: `"CareLens 👻" <${process.env.EMAIL_USER}>`, // المرسل
//                 to: email, // المستقبل
//                 subject: "Confirm Your Email", // موضوع الإيميل
//                 html: emailHtml(token), // محتوى الإيميل
//             });

//             console.log("Message sent: %s", info.messageId);
//         });
//     } catch (error) {
//         console.error("Email Sending Error:", error);
//     }
// };
