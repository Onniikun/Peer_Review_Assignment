import express, { Express} from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchesRoutes from  "./api/v1/routes/branchesRoutes"
import { getHelmetConfig } from "../config/helmetConfig";



const app: Express = express();
dotenv.config();

interface healthCheck {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}
app.use(morgan("combined"));

app.get("/api/v1/health", (req, res) => {
    const healthData: healthCheck = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    };
    res.json(healthData);
});
app.use(express.json());
app.use(getHelmetConfig());
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchesRoutes);

export default app