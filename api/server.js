import express from "express";
import sqlite3 from "sqlite3";
import { cors } from "./middlewares/cors.js";
import tasksRouter from "./tasks.js";

const API_PORT = 8080;

const sql3 = sqlite3.verbose();
const db = new sql3.Database("./tasks.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        author TEXT NOT NULL,
        status TEXT NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error("Error creating tasks table:", err.message);
        } else {
          console.log("Tasks table is ready.");
        }
      }
    );
  }
});

const app = express();

app.use(express.json());
app.use(cors);

app.use("/tasks", tasksRouter);

app.listen(API_PORT, () => {
  console.log(`Server is running on http://localhost:${API_PORT}`);
});
