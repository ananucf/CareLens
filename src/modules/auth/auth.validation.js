import Joi from 'joi';
import { generalFields } from '../../middleware/validate.js';

export const signupValidation = {
    body: Joi.object({
        name: generalFields.name.required().messages({
            'string.base': 'Name must be a string.',
            'string.empty': 'Name is required.',
            'string.min': 'Name must be at least 2 characters.',
            'string.max': 'Name must be at most 50 characters.'
        }),
        email: generalFields.email.required().messages({
            'string.email': 'Please enter a valid email address.',
            'any.required': 'Email is required.'
        }),
        password: generalFields.password.required().messages({
            'string.min': 'Password must be at least 8 characters.',
            'string.max': 'Password must be at most 30 characters.',
            'any.required': 'Password is required.'
        }),
        confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
            'any.only': 'Confirm password must match password'
          }),
        age: generalFields.age.optional(),
    })
};

export const signinValidation = {
    body: Joi.object({
        email: generalFields.email.required().messages({
            'string.email': 'Please enter a valid email address.',
            'any.required': 'Email is required.'
        }),
        password: generalFields.password.required().messages({
            'any.required': 'Password is required.'
        })
    })
};

export const verifyEmailValidation = {
    body: Joi.object({
        email: generalFields.email.required().messages({
            'string.email': 'Please enter a valid email address.',
            'any.required': 'Email is required.'
        }),
        otp: generalFields.otp
            .messages({
                'string.pattern.base': 'OTP must be exactly 5 digits, containing numbers only.',
                'string.length': 'OTP must be exactly 5 digits.',
                'any.required': 'OTP is required.'
            })
    })
};

export const resendOTPValidation = {
    params: Joi.object({
        token: Joi.string().required().messages({
            'any.required': 'Resend OTP token is required.'
        })
    })
};

export const changePasswordValidation = {
    body: Joi.object({
        email: generalFields.email.required().messages({
            'string.email': 'Please enter a valid email address.',
            'any.required': 'Email is required.'
        }),
        oldPassword: generalFields.password.required().messages({
            'any.required': 'Old password is required.'
        }),
        newPassword: generalFields.password.required().messages({
            'any.required': 'New password is required.'
        })
    })
};
