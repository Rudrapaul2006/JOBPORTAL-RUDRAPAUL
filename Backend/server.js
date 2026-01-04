// Backend/server.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import chalk from "chalk";
import path from "path";

// Routes
import userRoute from "./routes/User.route.js";
import companyRoute from "./routes/Company.route.js";
import jobRoute from "./routes/Job.route.js";
import applicationRoute from "./routes/Application.route.js";
import { DBConnect } from "./DBconnection.js";

dotenv.config();

let server = express();
let PORT = process.env.PORT || 8000;
let _dirname = path.resolve();

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// API Routes
server.use("/api/user", userRoute);
server.use("/api/company", companyRoute);
server.use("/api/job", jobRoute);
server.use("/api/application", applicationRoute);

// MongoDB connect
DBConnect();

// Serve Frontend build
server.use(express.static(path.join(_dirname, "Frontend/dist")));
server.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
});


// Root test route
server.get("/", (req, res) => {
  res.send("HTTP Job Portal Backend running 🚀");
});

// Start HTTP server
server.listen(PORT, () => {
  console.log(chalk.green.bold(`🚀 HTTP Server running at http://localhost:${PORT}`));
});