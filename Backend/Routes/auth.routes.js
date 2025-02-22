// Import statement should not have parentheses

import express from "express";
import {
  login,
  logout,
  signup,
  VerifyEmail,
  ForgetPassword,
  resetPassword,
  checkAuth,
} from "../controllers/auth.controllers.js";
import { VerifyToken } from "../Middleware/VerifyToken.js";

const router = express.Router();

// Defining routes correctly

router.get("/check-auth", VerifyToken, checkAuth);

router.post("/signup", signup); // signup is importing from controller folder

router.post("/login", login);

router.get("/logout", logout);

router.post("/Verifyemail", VerifyEmail);

router.post("/forget-password", ForgetPassword);
router.post("/reset-password/:token", resetPassword);

// Exporting the router correctly

export default router;
