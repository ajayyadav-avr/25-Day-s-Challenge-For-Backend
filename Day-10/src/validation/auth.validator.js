import { body,validationResult } from "express-validator";

const validate = (req,res,next)=>{
        const errors = validationResult(req)

        if(errors.isEmpty()){
            return next()
        }

        res.status(400).json({
            errors : errors.array()
        })
    }

export const registerValidation = [
    body("username").isString().withMessage("user shoulde be string"),
    body("email").isEmail().withMessage("email shoulde be valid email address"),
    body("password").isLength({min : 6}).withMessage("password should be at least 6 char long"),
    validate
]