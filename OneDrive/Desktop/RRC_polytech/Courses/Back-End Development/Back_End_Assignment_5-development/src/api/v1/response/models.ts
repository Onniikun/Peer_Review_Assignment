
/**
 * Interface for a standard API response
 */
interface apiResponse<T> {
    status: string;
    data?: T;
    message?: string;
    error?: string;
    code?: string;
};
/**
 * A success API response model.
 * @param data - The data that include in response
 * @param message - Message status about the successfully API response
 * @returns 
 */
export const successResponse = <T> (
    data: T,
    message?: string
): apiResponse<T> => ({
    status: "success",
    data,
    message,
});
/**
 * A error API response model.
 * @param message - Error message
 * @param code - Error code for debugging
 * @returns 
 */
export const errorResponse = (
    message: string,
    code?: string
): apiResponse<null> => ({
    status: "error",
    error: message,
    code,
})