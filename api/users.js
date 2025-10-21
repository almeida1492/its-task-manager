import express from "express";
import { db } from "./server.js";

const router = express.Router();

router.post("/register", (req, res) => {
  res.send("User registration endpoint");
});

router.post("/login", (req, res) => {
  res.send("User login endpoint");
});

export default router;
