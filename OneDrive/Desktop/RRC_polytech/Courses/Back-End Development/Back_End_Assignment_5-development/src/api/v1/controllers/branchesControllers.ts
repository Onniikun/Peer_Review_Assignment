import { Request, Response, NextFunction } from "express";
import * as branchesService from "../services/branchesServices";
import { Branches, branches} from "../../../data/branches";
import { HTTP_STATUS } from "../constant/httpConstant";
import { successResponse } from "../response/models";
import { errorResponse } from "../response/models";

/**
 * Retrieves all branch data.
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllBranchData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const branches: Branches[] = await branchesService.getAllBranches();
        res.status(HTTP_STATUS.OK).json(
            successResponse(branches, "Branch data retrieved.")
        );
    } catch (error: any) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponse("Couldnt retrieve branch data.")
        );
    }
};

/**
 * Retrieves a branch by ID.
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getBranchById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id, 10);
        const branch = await branchesService.getBranchesId(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(branch, `Branch Id ${id}`)
        );
    } catch (error: any) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponse("Couldnt find Branch Id.")
        );
    }
};

/**
 * Creates a new branch.
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const createBranchData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, address, phone } = req.body;
        const newBranch: Branches = {
            id: branches.length > 0 ? branches[branches.length - 1].id + 1:1,
            name, address, phone
        }
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newBranch, "Branch data created.")
        );
    } catch (error: any) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponse("Couldnt create branch data.")
        );
    }
};

/**
 * Updates an existing branch.
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const updateBranchData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id, 10);
        const updateData: Pick<Branches, "id" |"name"| "address" | "phone"> = req.body;
        const updatedBranch = await branchesService.updateBranchData(id, updateData);
        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedBranch, "Branch data updated successfully.")
        );
    } catch (error: any) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponse("Couldnt update branch information.")
        );
    }
};

/**
 * Deletes a branch.
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const deleteBranchData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await branchesService.deleteBranchData(id);
            res.status(HTTP_STATUS.OK).json(
                successResponse(await branchesService.deleteBranchData(id), "Branch information deleted successfully.")
            );
    } catch (error: any) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponse("Couldnt delete branch information.")
        );
    }
};