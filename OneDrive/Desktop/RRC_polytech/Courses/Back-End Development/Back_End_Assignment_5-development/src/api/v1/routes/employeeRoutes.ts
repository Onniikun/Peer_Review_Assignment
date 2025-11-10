import express, { Router } from "express";
import * as employeeControllers from "../controllers/employeeControllers";
import { validateRequest } from "../middleware/validate";
import { employeeSchemas } from "../validation/employeeValidation";

const router: Router = express.Router();

router.get("/",
    validateRequest(employeeSchemas.getEmployeeData), employeeControllers.getAllEmployeeData);
router.get("/:id",
    validateRequest(employeeSchemas.getById), employeeControllers.getEmployeeId);
router.post("/", 
    validateRequest(employeeSchemas.create), employeeControllers.createEmployeeData);
router.put("/:id", 
    validateRequest(employeeSchemas.update), employeeControllers.updateEmployeeData);
router.delete("/:id", 
    validateRequest(employeeSchemas.delete), employeeControllers.deleteEmployeeData);

export default router;