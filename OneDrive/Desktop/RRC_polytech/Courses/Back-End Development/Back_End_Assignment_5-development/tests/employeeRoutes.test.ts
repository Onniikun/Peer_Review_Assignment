
import  request  from "supertest";
import app from "../src/app";
import * as employeeControllers from "../src/api/v1/controllers/employeeControllers";
import { HTTP_STATUS } from "../src/api/v1/constant/httpConstant";

jest.mock("../src/api/v1/controllers/employeeControllers", () => ({
    getAllEmployeeData: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    getEmployeeId: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    createEmployeeData: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
    updateEmployeeData: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    deleteEmployeeData: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
}));

describe("GET /api/v1/employees",() => {
    it("It should call getAllEmployeeData and return a 200 status", async () => {
        const response = await request(app).get("/api/v1/employees");
        expect(response.status).toBe(HTTP_STATUS.OK);
        expect(employeeControllers.getAllEmployeeData).toHaveBeenCalled();
    });
});

describe("GET /api/v1/employees/:1",() => {
    it("It should call getEmployeeId and return a 200 status", async () => {
        const response = await request(app).get("/api/v1/employees/:1");
        expect(response.status).toBe(HTTP_STATUS.OK);
        expect(employeeControllers.getEmployeeId).toHaveBeenCalled();
    });
});

describe("POST /api/v1/employees",() => {
    it("It should call createEmployeeData and create a new employee data.", async () => {
        const createEmployee = {
            id: 1,
            name: "John Doe",
            position: "Developer",
            department: "Engineering",
            email: "john@example.com",
            phone: "1234567890",
            branchId: 1,
        };
        await request(app).post("/api/v1/employees/").send(createEmployee);
        expect(employeeControllers.createEmployeeData).toHaveBeenCalled();
    });
});

describe("PUT /api/v1/employees/:1", () => {
    it("It should call updateEmployeeData and update employee data.", async () => {
        const updateEmployee = {
            id: 1,
            name: "John Doe",
            position: "Developer",
            department: "Engineering",
            email: "john@example.com",
            phone: "1234567890",
            branchId: 1,
        };
        await request(app).put("/api/v1/employees/:1").send(updateEmployee);
        expect(employeeControllers.updateEmployeeData).toHaveBeenCalled();
    })
})

describe("DELETE /api/v1/employees/:1", () => {
    it("It should call deleteEmployeeData and delete employee data.", async () => {
        await request(app).delete("/api/v1/employees/:1");
        expect(employeeControllers.deleteEmployeeData).toHaveBeenCalled();
    })
});
