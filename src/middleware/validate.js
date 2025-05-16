import Joi from 'joi';
import { AppError } from '../utils/appError.js';

// ----------- General Fields ------------
export const generalFields = {
    id: Joi.string().hex().length(24),  // MongoDB ObjectId
    name: Joi.string().min(2).max(50),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(8).max(30).required().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    age: Joi.number().min(10).max(100),
    otp: Joi.string().pattern(/^\d{5}$/).required() // otp مكون من 5 أرقام
};

// ----------- Validation Middleware ------------
export const validation = (schema) => {
    return (req, res, next) => {
        const inputs = { body: req.body, params: req.params, query: req.query, headers: req.headers };
        
        let validationResult;
        
        if (schema.body) {
            validationResult = schema.body.validate(inputs.body, { abortEarly: false });
        }
        if (!validationResult?.error && schema.params) {
            validationResult = schema.params.validate(inputs.params, { abortEarly: false });
        }
        if (!validationResult?.error && schema.query) {
            validationResult = schema.query.validate(inputs.query, { abortEarly: false });
        }
        
        if (validationResult?.error) {
            const errorMessages = validationResult.error.details.map(err => err.message).join(", ");
            return next(new AppError(errorMessages, 400));
        }
        
        next();
    };
};
