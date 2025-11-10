import Joi from "Joi";
import { RequestSchema } from "../middleware/validate"
/**
 * Employee data schema 
 */
export const employeeSchemas: Record<string, RequestSchema> = {
    // For createEmployeeData function. POST
    create: {
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty"
            }),
            position: Joi.string().required().messages({
                "any.required": "Position is required",
                "string.empty": "Position cannot be empty"
            }),
            department: Joi.string().required().messages({
                "any.required": "Department is required",
                "string.empty": "Department cannot be empty"
            }),
            email: Joi.string().required().messages({
                "any.required": "Email is required",
                "string.empty": "Email cannont be empty",
                "string.email": "Email must be valid"
            }),
            phone: Joi.number().required().integer().min(0).messages({
                "any.required": "Phone number is required",
                "number.empty": "Phone number cannot be empty",
                "number.integer": "Phone number has to be a number"            
            }),
            branchId: Joi.number().required().integer().min(0).messages({
                "any.required": "BranchId number is required",
                "number.empty": "BranchId number cannot be empty",
                "number.integer": "BranchId number has to be a number"            
            }),
        })
    },
    // For updateEmployeeData function. PUT
    update: {
        params: Joi.object({
            id: Joi.number().integer().min(0).required().messages({
                "any.required": "Employee ID is required",
                "number.empty": "Employee ID cannot be empty.",
                "number.integer": "Employee ID must be an integer"
            })        
        }),
        body: Joi.object({
            name: Joi.string().optional().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty"
            }),
            position: Joi.string().optional().messages({
                "any.required": "Position is required",
                "string.empty": "Position cannot be empty"
            }),
            department: Joi.string().optional().messages({
                "any.required": "Department is required",
                "string.empty": "Department cannot be empty"
            }),
            email: Joi.string().optional().messages({
                "any.required": "Email is required",
                "string.empty": "Email cannont be empty",
                "string.emial": "Email must be valid"
            }),
            phone: Joi.number().optional().integer().min(0).messages({
                "any.required": "Phone number is required",
                "number.empty": "Phone number cannot be empty",
                "number.interger": "Phone number has to be a number"            
            }),
            branchId: Joi.number().optional().integer().min(0).messages({
                "any.required": "BranchId number is required",
                "number.empty": "BranchId number cannot be empty",
                "number.integer": "BranchId number has to be a number"            
            }),
        })
    },
    getById: {
        params: Joi.object({
            id: Joi.number().integer().required().messages({
                "any.required": "Employee ID is required.",
                "number.empty": "Employee ID cannot be empty.",
                "number.integer": "Employee ID must be an integer"
            })
        })
    },
    getEmployeeData: {
        params: Joi.object({
            id: Joi.number().integer().required().messages({
                "any.required": "Employee ID is required",
                "number.empty": "Employee ID cannot be empty.",
                "number.integer": "Employee ID must be an integer"
            })        
        }),
        body: Joi.object({
            name: Joi.string().optional().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty"
            }),
            position: Joi.string().optional().messages({
                "any.required": "Position is required",
                "string.empty": "Position cannot be empty"
            }),
            department: Joi.string().optional().messages({
                "any.required": "Department is required",
                "string.empty": "Department cannot be empty"
            }),
            email: Joi.string().optional().messages({
                "any.required": "Email is required",
                "string.empty": "Email cannont be empty",
                "string.emial": "Email must be valid"
            }),
            phone: Joi.number().optional().integer().min(0).messages({
                "any.required": "Phone number is required",
                "number.empty": "Phone number cannot be empty",
                "number.interger": "Phone number has to be a number"            
            }),
            branchId: Joi.number().optional().integer().min(0).messages({
                "any.required": "BranchId number is required",
                "number.empty": "BranchId number cannot be empty",
                "number.interger": "BranchId number has to be a number"            
            }),
        })
    } 
};