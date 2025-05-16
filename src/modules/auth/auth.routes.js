import express from "express";
import { checkEmail } from "../../middleware/checkEmail.js";
import { changeUserPassword, confirmEmail, logout, resendOTP, signin, signup } from "./auth.controller.js";
import { changePasswordValidation, resendOTPValidation, signinValidation, signupValidation, verifyEmailValidation } from "./auth.validation.js";
import { validation } from "../../middleware/validate.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const authRouter = express.Router();

authRouter.post('/signup', checkEmail, validation(signupValidation), signup);
authRouter.post('/verifyEmail', validation(verifyEmailValidation), confirmEmail);
authRouter.get('/resendOTP/:token', validation(resendOTPValidation), resendOTP); 
authRouter.post('/signin', validation(signinValidation), signin);
authRouter.post('/logout',verifyToken,  logout);
authRouter.patch('/change-password', verifyToken, validation(changePasswordValidation), changeUserPassword);

export default authRouter;
