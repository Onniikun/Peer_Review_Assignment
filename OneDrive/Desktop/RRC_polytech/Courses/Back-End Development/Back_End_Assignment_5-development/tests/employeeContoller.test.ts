import * as employeeControllers from "../src/api/v1/controllers/employeeControllers";
import { HTTP_STATUS } from "../src/api/v1/constant/httpConstant";
import * as employeeServices from "../src/api/v1/services/employeeServices";
import { Employee, employees } from "../src/data/employees";
import { Request, Response, NextFunction } from "express";

jest.mock("../src/api/v1/services/employeeServices");

describe("employee Controller", () => {
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

    describe("getAllEmployeeData", () =>{
        it("It should retrieve all employee data.", async () => {
            const mockEmployee: Employee[] = [
                {
                    id: 1,
                    name: "Nathan Natoza",
                    position: "Commander",
                    department: "Head of staff",
                    email: "NathanNatoza@gmail.com",
                    phone: 124782999,
                    branchId: 1,
                },
                {
                    id: 2,
                    name: "Jane Smith",
                    position: "Designer",
                    department: "Creative",
                    email: "jane.smith@example.com",
                    phone: 9876543210,
                    branchId: 2,
                },
            ];
            (employeeServices.getAllEmployeeData as jest.Mock).mockReturnValue(mockEmployee);
            await employeeControllers.getAllEmployeeData(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee Data retrieved.",
                data: mockEmployee,
            })
        })
    })
    describe("getEmployeeId", () => {
        it("It should retrieve only employee Id.", async () => {

            const mockEmployee1 = [{ id: 1}];
            const mockReq = { params: {id: "1 "}, } as unknown as Request;

            (employeeServices.getEmployeeId as jest.Mock).mockReturnValue(mockEmployee1);
            await employeeControllers.getEmployeeId(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee Id 1",
                data: mockEmployee1
            })
        })
    })
    describe("createEmployeeData", () => {
        it("It should create new employee data", async () => {
            const mockCreateEmployee = {
                    id: 36,
                    name: "Nathan Natoza",
                    position: "Commander",
                    department: "Head of staff",
                    email: "NathanNatoza@gmail.com",
                    phone: 124782999,
                    branchId: 1,
            };
            (employeeServices.createEmployeeData as jest.Mock).mockReturnValue(mockCreateEmployee);
            const mockReq = { body: mockCreateEmployee } as unknown as Request;
            await employeeControllers.createEmployeeData(
                mockReq,
                mockRes as Response,
                mockNext
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message:"Employee data created.",
                data: mockCreateEmployee
            })
        })
    })
    describe("updateEmployeeData", () => {
        it("It should update existing employee data", async () => {
            const mockUpdateEmployee = {
                    id: 1,
                    name: "Nathan Natoza",
                    position: "Commander",
                    department: "Head of staff",
                    email: "NathanNatoza@gmail.com",
                    phone: 124782999,
                    branchId: 2,
            };
            (employeeServices.updateEmployeeData as jest.Mock).mockReturnValue(mockUpdateEmployee);

            await employeeControllers.updateEmployeeData(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee data is updated successfully.",
                data: mockUpdateEmployee,
            })
        })
    })  
    describe("deleteEmployeeData", () => {
        it("It should delete employee data", async () => {
            const mockDeleteEmployee = {
                id: 1,
                name: "Nathan Natoza",
                position: "Commander",
                department: "Head of staff",
                email: "NathanNatoza@gmail.com",
                phone: 124782999,
                branchId: 2,
            };
            (employeeServices.deleteEmployeeData as jest.Mock).mockReturnValue(mockDeleteEmployee);
            await employeeControllers.deleteEmployeeData(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee information deleted successfully."
            })
        })
    })

    //Error handling
    describe("deleteEmployeeData", () => {
        it("It should handle invalid/missing ID", async () => {
            mockReq = { params: { id: "invalid" } };

            (employeeServices.deleteEmployeeData as jest.Mock).mockImplementation(() => {
                throw new Error("Invalid ID");
            });
            await employeeControllers.deleteEmployeeData(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Couldnt delete employee information."
            });
        });
    });

    describe("getEmployeeByBranch", () => {
        it("It should return all employees with a valid branch ID", async () => {
            mockReq = {params: { branchId: 1}} as unknown as Request;  
            (employeeServices.getEmployeeByBranch as jest.Mock).mockReturnValue(mockReq)
            await employeeControllers.getEmployeeByBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            expect(employeeServices.getEmployeeByBranch).toHaveBeenCalledWith(1);
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee branch retrieved array.",
                data: mockReq
            });
        })
    })
});