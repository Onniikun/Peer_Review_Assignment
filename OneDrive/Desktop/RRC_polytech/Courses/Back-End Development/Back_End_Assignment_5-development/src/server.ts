import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { Server } from "http";

const PORT: string | number = process.env.PORT || 3000;
const server: Server = app.listen(PORT, ()=> {
    console.log(`server is running on port${PORT}`);
});
// http://localhost:3000
export default server;