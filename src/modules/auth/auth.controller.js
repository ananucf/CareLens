/* auth.controller.js */
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { catchError } from "../../middleware/catchError.js"
import { User } from "../../../database/models/user.model.js"
import { AppError } from "../../utils/appError.js"
import { customAlphabet } from "nanoid"
import { sendEmails } from "../../email/email.js"

/*
 * const response=axios("http://127.0.0.1/pred",{method:"POST",body:req.body})
 * const response=axios("http://127.0.0.1/pred",{method:"POST",body:req.body})
 * const response=axios("http://127.0.0.1/pred",{method:"POST",body:req.body})
 * const response=axios("http://127.0.0.1/pred",{method:"POST",body:req.body})
 * db 
 */


const generateOTP = customAlphabet("0123456789", 5)

const signup = catchError(async (req, res) => {
    const { name, email, password, confirmPassword, age } = req.body;
    
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    const otp = generateOTP();

    const resendOTPToken = jwt.sign({ email }, "resendOtp");

    // Sending the email with the OTP
    await sendEmails({
        to: email,
        subject: "Confirm your email",
        text: `<h1>Your OTP is ${otp}. This OTP is valid for only 3 minutes.</h1>
        <h3>If the OTP has expired, click this <a href="http://localhost:3002/api/auth/resendOTP/${resendOTPToken}">link</a> to resend it.</h3>`
    });

    const otpExpire = Date.now() + 3 * 60 * 1000; // OTP expiration time (3 minutes)

    // Checking if the user already exists with the given email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email is already in use" });
    }

    // Creating a new user object
    const user = new User({
        name,
        email,
        password,
        age,
        otpCode: otp,
        otpExpire,
        confirmEmail: false // Flag for email confirmation
    });

    // Saving the user object to the database
    await user.save();

    return res.status(200).json({ message: "User created successfully. Please confirm your email.", user });
});

// const signup = catchError(async (req, res) => {

//     // let user = new User(req.body)
//     // await user.save()
//     // let token = jwt.sign({ userId: user._id, role: user.role }, "myNameIsAnan")
//     // res.json({ message: "success", token })

//     const { name,
//         email,
//         password,
//         phone,
//         age, } = req.body
//     const otp = generateOTP();

//     const resendOTPToken = jwt.sign({ email }, "resendOtp")

//     await sendEmails({
//         to: email,
//         subject: "confirm your email",
//         text: `<h1>your otp is ${otp}, this OTP valid for only 3 minutes</h1>
//         <h3>if the otp expired click this <a href="http://localhost:3002/api/auth/resendOTP/${resendOTPToken}">link</a></h3>
//         `
//     })
//     console.log(`${req.prortocol}://${req.headers.host}/auth/resendOTP/${resendOTPToken}`);


//     const otpExpire = Date.now() + 3 * 60 * 1000

//     const user = await User.create({
//         name,
//         email,
//         password,
//         phone,
//         age,
//         otpCode: otp,
//         otpExpire
//     })

//     return res.status(200).json({ messge: "Done", user })
// })

const confirmEmail = catchError(async (req, res, next) => {
    const { email, otp } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: "invalid email, please signup first", status: false })
    }

    if (user.confirmEmail) {
        return res.status(400).json({ message: "email already confirmed", status: false })
    }

    if (user.otpCode != otp) {
        return res.status(404).json({ message: "Invalid OTP", status: false })
    }

    const currentDate = new Date();

    if (currentDate > user.otpExpire) {
        return res.status(404).json({ message: "OTP expired", status: false })
    }

    user.confirmEmail = true
    await user.save()
    return res.status(200).json({ message: "Email confirmed" })
})

const resendOTP = catchError(async (req, res, next) => {
    const { token } = req.params

    const { email } = jwt.verify(token, 'resendOtp')

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: "invalid email, please signup first", status: false })
    }

    if (user.confirmEmail) {
        return res.status(404).json({ message: "email is already confirmed", status: false })
    }

    const currentDate = new Date()
    if (user.otpExpire > currentDate) {
        return res.status(404).json({
            message: `last otp still valid, we cannot send you another one, you can try after 
            ${(user.otpExpire - currentDate) / (1000 * 60).toFixed(2)} minutes`
            , status: false
        })
    }

    const otp = generateOTP()

    await sendEmails({
        to: email,
        subject: "resend OTP",
        text: `<h1>your otp is ${otp}, this OTP valid for only 3 minutes</h1>`
    })

    const otpExpire = Date.now() + 3 * 60 * 1000

    user.otpCode = otp
    user.otpExpire = otpExpire
    await user.save()
    return res.status(200).json({ message: "check your email" })
})

const signin = catchError(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ userId: user._id, role: user.role }, "myNameIsAnan")
        return res.json({ message: "success", token })
    }
    next(new AppError("Incorrect email or password", 401))
})

const changeUserPassword = catchError(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })

    if (user && bcrypt.compareSync(req.body.oldPassword, user.password)) {
        await User.findOneAndUpdate({ email: req.body.email }, { password: req.body.newPassword, passwordChangedAt: Date.now() })
        let token = jwt.sign({ userId: user._id, role: user.role }, "myNameIsAnan")
        return res.json({ message: "Password changed successfully" })
    }
    next(new AppError("Incorrect email or password", 401))
})

const protectedRoutes = catchError(async (req, res, next) => {
    let { token } = req.headers
    let userPayload = null
    if (!token) return next(new AppError('token not provided', 401))
    jwt.verify(token, 'myNameIsAnan', (err, payload) => {
        if (err) return next(new AppError(err, 401))
        userPayload = payload
    })

    let user = await User.findById(userPayload.userId)
    if (!user) return next(new AppError('user not found', 401))

    if (user.passwordChangedAt) {
        let time = parseInt(user.passwordChangedAt.getTime() / 1000)
        if (time > userPayload.iat) return next(new AppError('invalid token ... login again', 401))
    }
    req.user = user
    next()
})

const allowedTo = (...roles) => {
    return catchError(async (req, res, next) => {
        if (roles.includes(req.user.role))
            return next()
        return next(new AppError('you are not authorized to access this endpoint', 401))
    })
}

const logout = (req, res, next) => {
    res.status(200).json({ message: "Logged out successfully." });
};


export {
    signup,
    signin,
    confirmEmail,
    resendOTP,
    logout,
    changeUserPassword,
    protectedRoutes,
    allowedTo
}
