import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import apiRoutes from "./routes/api.routes.js";
import { connectToDatabase } from "./services/database.service.js";

dotenv.config();

const app = express();
connectToDatabase(process.env.DB_URL || "");

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

export default app;
