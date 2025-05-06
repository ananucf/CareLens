//catchError.js
// import { AppError } from "../utils/appError.js"
// export const catchError = (fn) => {
//     return (req, res, next) => {
//         fn(req, res, next).catch(err => {
//             next(new AppError(err.message, 500))
//         }) 
//     }
// }


import { AppError } from "../utils/appError.js";
export const catchError = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(err => {
                next(new AppError(err.message || 'Internal Server Error', 500)); 
            });
    }
}
