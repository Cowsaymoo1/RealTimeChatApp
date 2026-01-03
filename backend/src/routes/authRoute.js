import express from 'express';
import { signUp, signIn, signOut } from '../controllers/authController.js';
const router = express.Router();

//signUp route
router.post("/signup", signUp);
//signIn route
router.post("/signin", signIn);
//singout route
router.post("/signout", signOut);


export default router;

