import express, { Express } from "express";
import router from "./api/v1/routes/routes";

const app: Express = express();


app.get("/", (req, res) => {
    res.send("Hello World");
});

interface healthCheck {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

app.get("/api/v1/health", (req, res) => {
    const healthData: healthCheck = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",

    };
    res.json(healthData);
});
app.use("/api/v1/stories", router)

export default app;