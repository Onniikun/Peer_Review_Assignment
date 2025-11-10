import express, { Router } from "express";
import * as branchesControllers from "../controllers/branchesControllers";
import { validateRequest } from "../middleware/validate";
import { branchSchemas } from "../validation/branchValidation";

const router: Router = express.Router();

router.get("/", 
    validateRequest(branchSchemas.getBranchData), branchesControllers.getAllBranchData);
router.get("/:id", 
    validateRequest(branchSchemas.getBranchById), branchesControllers.getBranchById);
router.post("/", 
    validateRequest(branchSchemas.create), branchesControllers.createBranchData);
router.put("/:id", 
    validateRequest(branchSchemas.update), branchesControllers.updateBranchData);
router.delete("/:id", 
    validateRequest(branchSchemas.delete), branchesControllers.deleteBranchData);

export default router;