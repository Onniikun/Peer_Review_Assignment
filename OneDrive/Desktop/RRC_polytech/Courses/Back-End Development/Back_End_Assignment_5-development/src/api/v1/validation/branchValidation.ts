import Joi from "Joi";
import { RequestSchema } from "../middleware/validate";

export const branchSchemas: Record<string, RequestSchema> = {
    create: {
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty"
            }),
            address: Joi.string().required().messages({
                "any.required": "Address is required",
                "string.empty": "Address cannot be empty"
            }),
            phone: Joi.number().required().integer().min(0).messages({
                "any.required": "Phone number is required",
                "number.empty": "Phone number cannot be empty",
                "number.integer": "Phone number must be an integer"
            })
        })
    },
    update: {
        params: Joi.object({
            id: Joi.number().integer().min(0).required().messages({
                "any.required": "Branch Id is required",
                "number.empty": "Branch ID cannot be empty.",
            })
        }),
        body: Joi.object({
            name: Joi.string().optional().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty"
            }),
            address: Joi.string().optional().messages({
                "any.required": "Address is required",
                "string.empty": "Address cannot be empty"
            }),
            phone: Joi.number().optional().integer().min(0).messages({
                "any.required": "Phone number is required",
                "number.empty": "Phone number cannot be empty",
                "number.integer": "Phone number must be an integer"
            })
        }),
    },
    getBranchById: {
        params: Joi.object({
            id: Joi.number().integer().required().messages({
                "any.required": "Branch ID is required.",
                "number.empty": "Branch ID cannot be empty.",
                "number.integer": "Branch ID must be an integer"
            })
        })
    },
    getBranchData: {
        params: Joi.object({
            id: Joi.number().integer().required().messages({
                "any.required": "Branch ID is required.",
                "number.empty": "Branch ID cannot be empty.",
                "number.integer": "Branch ID must be an integer"
            })
        }),
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty"
            }),
            address: Joi.string().required().messages({
                "any.required": "Address is required",
                "string.empty": "Address cannot be empty"
            }),
            phone: Joi.number().required().integer().min(0).messages({
                "any.required": "Phone number is required",
                "number.empty": "Phone number cannot be empty",
                "number.integer": "Phone number must be an integer"
            })
        })
    }
}
