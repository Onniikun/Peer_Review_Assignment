import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/httpsConstants";
import * as storyService from "../service/storyService";
import { Story } from "../model/storyModel";



/**
 * Managaes requests and response for retrieving all story projects.
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllStories = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        const stories: Story[] = await storyService.getAllStories();
        res.status(HTTP_STATUS.OK).json({
            message: "All stories are retrieved successfully.",
            data: stories,
        })
    } catch(error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and reponses for retrieving a single story project.
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 * @returns 
 */
export const getStory = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const stories: Story | undefined = await storyService.getStory(id);

        if(!stories) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                messsage: `Story project with ID ${id} cannot be found.`
            });
            return;
        }
        res.status(HTTP_STATUS.OK).json({
            message: `Story project ID${id} returned.`,
            data: stories,
        });
    } catch (error: unknown) {
        next(error);
    }
};
/**
 * Manages requests and reponses for creating a new story project.
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const createStory = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, genre, type, expected_release_date, status } = req.body;
        if (!name || !genre || !type || !expected_release_date || !status) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                 message: "Missing data requirements." 
            });
        const newStory = await storyService.createStory({
        name,
        genre,
        type,
        expected_release_date,
        status,
        });
        res.status(HTTP_STATUS.CREATED).json({
            message: "Story project created successfully.",
            data: newStory,
            });
        };
    } catch (error: unknown) {
        next(error);
    }
};
/**
 * Manages requests and reponses for updating a story project.
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const updateStory = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, genre, type, expected_release_date, status } = req.body;

        const updateStory = await storyService.updateStory(id, 
            {name, genre, type, expected_release_date, status});

        res.status(HTTP_STATUS.OK).json({
            message: "Story project updated.",
            data: updateStory,
        });
    } catch (error: unknown) {
        next(error);
    }
};


/**
 * Manages requests and reponses for updating a story project status.
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const updateStoryStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const {status } = req.body;

        const updateStoryStatus = await storyService.updateStoryStatus(id, status);

        if (!updateStoryStatus) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: `Story with ID ${id} not found.`,
        });
        return;
        }
        res.status(HTTP_STATUS.OK).json({
            message: "Story project updated.",
            data: updateStory,
        });
    } catch (error: unknown) {
        next(error);
    }
};


/**
 * Manages requests and reponses to delete a story project
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const deleteStory = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        await storyService.deleteStory(id);
        res.status(HTTP_STATUS.OK).json({
            message: "Story project has been deleted successfully.",
        });
    } catch (error: unknown) {
        next(error);
    }
};