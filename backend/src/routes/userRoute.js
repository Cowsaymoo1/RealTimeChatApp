import { authMe, test } from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.get("/me", authMe);

router.get("/test", test);

export default router;
