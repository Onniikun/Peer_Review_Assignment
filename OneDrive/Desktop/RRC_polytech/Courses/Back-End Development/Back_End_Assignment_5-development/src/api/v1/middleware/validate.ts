import { HTTP_STATUS } from "../constant/httpConstant";
import { ObjectSchema } from "Joi";
import { MiddlewareFunction } from "../types/express";
import { Request, Response, NextFunction } from "express";

export interface RequestSchema {
    body?: ObjectSchema;
    params?: ObjectSchema;
    query?: ObjectSchema;
}

export interface schemaValidation {
    stripBody?: boolean;
    stripQuery?: boolean;
    stripParams?: boolean;
}

export const validateRequest = (
    schemas: RequestSchema,
    options: schemaValidation = {}
): MiddlewareFunction => {
    const STRIP_BODY: boolean = true;
    const STRIP_PARAMS: boolean = true;
    const STRIP_QUERY: boolean = true;
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors: string[] = [];
            const validateRequestSection = <T>(
                validationSchema: ObjectSchema,
                requestData: T,
                requestSectionName: string,
                shouldStripFields: boolean
            ): T => {
                // abortEarly false means continue validation even if something fails validation
                const { error, value: strippedFields } =
                    validationSchema.validate(requestData, {
                        abortEarly: false,
                        stripUnknown: shouldStripFields,
                    });

                if (error) {
                    errors.push(
                        ...error.details.map(
                            (detail) =>
                                `${requestSectionName}: ${detail.message}`
                        )
                    );
                } else if (shouldStripFields) {
                    return strippedFields as T;
                }

                return requestData;
            };

            // validate each request part if a schema is provided
            if (schemas.body) {
                req.body = validateRequestSection(
                    schemas.body,
                    req.body,
                    "Body",
                    options.stripBody ?? STRIP_BODY
                );
            }

            if (schemas.params) {
                req.params = validateRequestSection(
                    schemas.params,
                    req.params,
                    "Params",
                    options.stripParams ?? STRIP_PARAMS
                );
            }

            if (schemas.query) {
                req.query = validateRequestSection(
                    schemas.query,
                    req.query,
                    "Query",
                    options.stripQuery ?? STRIP_QUERY
                );
            }

            // If there are any validation erros, return them
            if (errors.length > 0) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({
                    error: `Validation error: ${errors.join(", ")}`,
                });
            }

            next();
        } catch (error: unknown) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Error during validation."
            });
        }
    };
};