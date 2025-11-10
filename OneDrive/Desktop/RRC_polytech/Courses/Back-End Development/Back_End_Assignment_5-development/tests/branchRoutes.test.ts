import  request  from "supertest";
import app from "../src/app";
import * as branchControllers from "../src/api/v1/controllers/branchesControllers";
import { HTTP_STATUS } from "../src/api/v1/constant/httpConstant";

jest.mock("../src/api/v1/controllers/branchesControllers", () => ({
    getAllBranchData: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    getBranchById: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    createBranchData: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
    updateBranchData: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    deleteBranchData: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
}));

describe("GET /api/v1/branches", () => {
    it("It should call getAllBranchData and return a 200 status", async () => {
        const response = await request(app).get("/api/v1/branches");
        expect(response.status).toBe(HTTP_STATUS.OK);
        expect(branchControllers.getAllBranchData).toHaveBeenCalled();
    });
});

describe("GET /api/v1/branches/:1", () => {
    it("It should call getBranchById and return a 200 status", async () => {
        const response = await request(app).get("/api/v1/branches/:1");
        expect(response.status).toBe(HTTP_STATUS.OK);
        expect(branchControllers.getBranchById).toHaveBeenCalled();
    });
});

describe("POST /api/v1/branches", () => {
    it("It should call createBranchData and create a new branch data.", async () => {
        const newBranch = {
            name: "Main Branch",
            address: "123 Street",
            phone: 1234567890,
        };
        await request(app).post("/api/v1/branches").send(newBranch);
        expect(branchControllers.createBranchData).toHaveBeenCalled();
    });
});

describe("PUT /api/v1/branches/:1", () => {
    it("It should call updateBranchData and update branch data.", async () => {
        const updateBranch = {
            id: 1,
            name: "Updated Branch",
            address: "123 Avenue",
            phone: 9876543210,
        };
        await request(app).put("/api/v1/branches/:1").send(updateBranch);
        expect(branchControllers.updateBranchData).toHaveBeenCalled();
    });
});

describe("DELETE /api/v1/branches/:1", () => {
    it("It should call deleteBranchData and delete branch data.", async () => {
        await request(app).delete("/api/v1/branches/:1");
        expect(branchControllers.deleteBranchData).toHaveBeenCalled();
    });
});