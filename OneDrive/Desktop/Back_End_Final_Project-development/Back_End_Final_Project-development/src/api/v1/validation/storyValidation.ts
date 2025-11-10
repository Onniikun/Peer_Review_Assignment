import Joi from "joi";
import { RequestSchema } from "../middleware/validate";
/**
 * @openapi
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - genre
 *         - type
 *         - expected_release_date
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for a story project
 *           example: "G5gRYX36bllXVjaY6ESh"
 *         name:
 *           type: string
 *           description: The name of the story project
 *           example: "Love, Translated"
 *         genre:
 *           type: string
 *           description: The genre of the story project
 *           example: "Romcom, slice of life"
 *         type:
 *           type: string
 *           description: The type/format that the story project uses.
 *           example: "Manga, Light novel, Manhwa"
 *         expected_release_date:
 *           type: number
 *           description: The expected release date for the story project
 *           example: "2026"
 *         status:
 *           type: string
 *           description: The current status of the story project
 *           example: "Pre Development"
 */
export const storySchemas: Record<string, RequestSchema> = {
    create: {
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Project name is required",
                "string.empty": "Project name cannot be empty",
            }),
            genre: Joi.string().required().messages({
                "any.required": "Project genre is required",
                "string.empty": "Project genre cannot be empty",
            }),
            type: Joi.string().required().messages({
                "any.required": "Project type is required",
                "string.empty": "Project type cannot be empty",
            }),
            expected_release_date: Joi.number().optional().min(0).messages({
                "number.base": "Expected release date must be a number",
            }),
            // Will change later on to have more statuses.
            status: Joi.string().required().valid("In Development", "Completed", "On Hold").messages({
                "any.required": "A project status is required",
                "string.empty": "Project status cannot be empty",
            }),
        })
    },
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Project ID is required",
                "string.empty": "Project ID cannot be empty",
            })
        }),
        body: Joi.object({
            name: Joi.string().optional().messages({
                "string.base": "Project name must be a string",
                "string.empty": "Project name cannot be empty",
            }),
            genre: Joi.string().optional().messages({
                "string.base": "Project genre must be a string",
                "string.empty": "Project genre cannot be empty",
            }),
            type: Joi.string().optional().messages({
                "string.base": "Project type must be a string",
                "string.empty": "Project type cannot be empty",
            }),
            expected_release_date: Joi.number().optional().messages({
                "number.base": "Expected release date must be a number",
            }),
            status: Joi.string().optional().valid("In Development", "Completed", "On Hold").messages({
                "any.required": "A project status is required",
                "string.empty": "Project status cannot be empty",
            }),
        })
    },
    updateStatus: {
        body: Joi.object({
            status: Joi.string().required().valid("In Development", "Completed", "On Hold").messages({
                "any.required": "A project status is required",
                "string.empty": "Project status cannot be empty",
            }),
        })
    },
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Project ID is required",
                "string.empty": "Project ID cannot be empty",
            })
        }),
    },
    storyData: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Project ID is required",
                "string.empty": "Project ID cannot be empty",
            })
        }),
        body: Joi.object({
            name: Joi.string().optional().messages({
                "string.base": "Project name must be a string",
                "string.empty": "Project name cannot be empty",
            }),
            genre: Joi.string().optional().messages({
                "string.base": "Project genre must be a string",
                "string.empty": "Project genre cannot be empty",
            }),
            type: Joi.string().optional().messages({
                "string.base": "Project type must be a string",
                "string.empty": "Project type cannot be empty",
            }),
            expected_release_date: Joi.number().optional().messages({
                "number.base": "Expected release date must be a number",
            }),
            status: Joi.string().optional().valid("In Development", "Completed", "On Hold").messages({
                "any.required": "A project status is required",
                "string.empty": "Project status cannot be empty",
            }),
        })
    }
}