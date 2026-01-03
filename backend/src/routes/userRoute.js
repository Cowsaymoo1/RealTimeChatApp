import { authMe } from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.get("/me", authMe);

export default router;
