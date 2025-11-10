import * as branchControllers from "../src/api/v1/controllers/branchesControllers";
import { HTTP_STATUS } from "../src/api/v1/constant/httpConstant";
import * as branchServices from "../src/api/v1/services/branchesServices";
import { Branches, branches } from "../src/data/branches";
import { Request, Response, NextFunction } from "express";

jest.mock("../src/api/v1/services/branchesServices");

describe("branch Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    describe("getAllBranchData", () => {
        it("It should retrieve all branch data", async () => {
            const mockBranches: Branches[] = [
                { 
                    id: 1, 
                    name: "Main Branch", 
                    address: "123 Street", 
                    phone: 1234567890 
                },
                { 
                    id: 2, 
                    name: "Secondary Branch", 
                    address: "456 Avenue", 
                    phone: 9876543210 },
            ];

            (branchServices.getAllBranches as jest.Mock).mockReturnValue(mockBranches);

            await branchControllers.getAllBranchData(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch data retrieved.",
                data: mockBranches,
            });
        });
    });

    describe("getBranchById", () => {
        it("It should retrieve only branch by ID", async () => {
            const mockBranch: Branches = { id: 1, name: "Main Branch", address: "123 Street", phone: 1234567890 };
            mockReq = { params: { id: "1" } };

            (branchServices.getBranchesId as jest.Mock).mockReturnValue(mockBranch);

            await branchControllers.getBranchById(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch Id 1",
                data: mockBranch,
            });
        });
    });

    describe("createBranchData", () => {
        it("It should create new branch data", async () => {
            const mockCreateBranch: Branches = { id: 11, name: "New Branch", address: "789 Road", phone: 5555555555 };
            mockReq = { body: mockCreateBranch };

            (branchServices.createBranchData as jest.Mock).mockReturnValue(mockCreateBranch);

            await branchControllers.createBranchData(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch data created.",
                data: mockCreateBranch,
            });
        });
    });

    describe("updateBranchData", () => {
        it("It should update existing branch data", async () => {
            const mockUpdateBranch: Branches = { id: 1, name: "Updated Branch", address: "123 Street Updated", phone: 1112223333 };
            mockReq = { params: { id: "1" }, body: mockUpdateBranch };

            (branchServices.updateBranchData as jest.Mock).mockReturnValue(mockUpdateBranch);

            await branchControllers.updateBranchData(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch data updated successfully.",
                data: mockUpdateBranch,
            });
        });
    });

    describe("deleteBranchData", () => {
        it("It should delete branch data", async () => {
            mockReq = { params: { id: "1" } };
            (branchServices.deleteBranchData as jest.Mock).mockReturnValue(true);

            await branchControllers.deleteBranchData(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch information deleted successfully.",
            });
        });
    });
});