import express from "express";
import tasksRouter from "./tasks.js";
import { cors } from "./middlewares/cors.js";

const API_PORT = 8080;

const app = express();

app.use(express.json());
app.use(cors);

app.use("/tasks", tasksRouter);

app.listen(API_PORT, () => {
  console.log(`Server is running on http://localhost:${API_PORT}`);
});
