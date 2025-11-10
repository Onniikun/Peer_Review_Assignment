import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeServices";
import { Employee, employees } from "../../../data/employees";
import { HTTP_STATUS } from "../constant/httpConstant";
import { successResponse } from "../response/models";
import { errorResponse } from "../response/models";


/**
 * Manages requests and reponses to retrieve all employee data.
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllEmployeeData = async (req: Request, res: Response, next: NextFunction): 
Promise<void> => {
    try {
        const employee: Employee[] = await employeeService.getAllEmployeeData();
        // Status is 200/OK
        res.status(HTTP_STATUS.OK).json(
            successResponse(employee, "Employee Data retrieved.")
        )
    } catch(error: any) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponse("Couldn't retrieved employee data.")
        )
    }
};
/**
 * Manages requests and responses to only retrieve employee ID.
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getEmployeeId = async (req: Request, res: Response, next: NextFunction):
Promise<void> => {
    try {
        const id: number = parseInt(req.params.id, 10);
        const employee = await employeeService.getEmployeeId(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(employee, `Employee Id ${id}`)
        )
    } catch (error: any) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponse("Couldnt find Employee Id.")
        )
    }
};
/**
 * Manages requests and responses to create new Employee Information.
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const createEmployeeData = async(req: Request, res: Response, next: NextFunction):
Promise<void> => {
    try {
        const { name, position, department, email, phone, branchId } = req.body;
        const newEmployee: Employee = {
            id: employees.length > 0 ? employees[employees.length - 1].id + 1:1,
            name, position, department, email, phone, branchId,
        };
        employees.push(newEmployee);
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newEmployee, "Employee data created.")
        )
    } catch (error: any) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponse("Couldnt create employee data.")
        )
    }
};
/**
 * Manages requests and responses to update Employee data.
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const updateEmployeeData = async(req: Request, res: Response, next: NextFunction):
Promise<void> => {
    try{
        const id: number = parseInt(req.params.id, 10);
        const updateData: Pick<Employee, "name" | "position" | "department" | "email" | "phone" | "branchId"> = req.body;
        const updateEmployeeData = await employeeService.updateEmployeeData(id, updateData)

        res.status(HTTP_STATUS.OK).json(
            successResponse(updateEmployeeData, "Employee data is updated successfully.")
        )
        } catch (error: any) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponse("Couldnt Update Employee Information.")
        ) 
    }
};
/**
 * Manages requests responses to delete Employee data.
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const deleteEmployeeData = async(req: Request, res: Response, next: NextFunction):
Promise<void> => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await employeeService.deleteEmployeeData(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(employeeService.deleteEmployeeData(id), "Employee information deleted successfully.")
        );
    } catch (error: any){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponse("Couldnt delete employee information.")
        )
    }
};
/**
 * Manages request response of retrieving Employee data by branch
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getEmployeeByBranch = async (req: Request, res: Response, next: NextFunction): 
Promise<void> => {
    try {
        const employeeBranchId: number = parseInt(req.params.branchId, 10)
        const employee: Employee[] = await employeeService.getEmployeeByBranch(employeeBranchId);
        res.status(HTTP_STATUS.OK).json(
            successResponse(employee, "Employee branch retrieved array.")
        )
    } catch(error: any) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponse("Couldn't retrieved employee branch array.")
        )
    }
};