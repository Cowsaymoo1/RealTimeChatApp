import express from "express";
import {
  signUp,
  signIn,
  signOut,
  refreshToken,
} from "../controllers/authController.js";

const router = express.Router();

//signUp route
router.post("/signup", signUp);
//signIn route
router.post("/signin", signIn);
//singout route
router.post("/signout", signOut);

router.post("/refresh", refreshToken);

export default router;
