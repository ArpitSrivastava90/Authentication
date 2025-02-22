import {
  sendVerificationEmail,
  welcomeEmail,
  SendResetEmail,
  SendSuccessEmail,
} from "../mailtrap/emails.js";
import { User } from "../Models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookies.js";
import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt"; //! maybe need to add js
import crypto from "crypto";

export const checkAuth = async (req, res) => {
  try {
    // Find user by ID and exclude password
    const user = await User.findById(req.userId).select("-password");

    // If user not found, return error response
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Return user data (password already excluded)
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error in checkAuth:", error.message);

    // Return error response instead of throwing
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      return res.status(400).send("All feilds are  Required");
    }
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // Creating 6 digit code

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = await User.create({
      email,
      password: hashPassword,
      name,
      verificationToken,
      verificationTokenexpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    // JWT Token Via a Function that also sets a Cookie

    generateTokenAndSetCookie(res, user._id);

    // SendVerification Email

    await sendVerificationEmail(user.email, verificationToken); // Sending Email

    // Sending Response of creating a user

    res.status(200).json({
      success: true,
      message: "user Created Succesfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const VerifyEmail = async (req, res) => {
  const { code } = req.body; // Extracting Code  From user
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenexpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Token or ExpiredToken  " });
    }

    user.isVerified = true; // updating Verified to true
    user.verificationToken = undefined; // Removing Verification Token From Database
    user.verificationTokenexpiresAt = undefined; // Removing ExpiredToken
    user.save(); // Saving the changes

    //* Sending a New Welcome email
    await welcomeEmail(user.email, user.name);
    res.status(200).json({
      success: true,
      message: "Email Verifies SuccessFully",
    });
  } catch (error) {
    console.log(`error in Verification Emial ${error}`);
    res.status(500).json({
      success: false,
      message: "Server error  ",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ Find user in database
    const user = await User.findOne({ email });

    // ❌ Typo fixed: `flase` -> `false`
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // ✅ Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ✅ Generate token and set cookie (await if it's an async function)
    generateTokenAndSetCookie(res, user._id);

    // ✅ Update last login time and save user
    user.lastLogin = new Date();
    await user.save();

    // ✅ Send response
    res.status(200).json({
      success: true,
      message: "You are logged in",
      user: {
        ...user._doc, // ✅ Correct property name
        password: undefined, // ✅ Remove password for security
      },
    });
  } catch (error) {
    console.log("Error in login:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const ForgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        succcess: false,
        message: "SomeThing is wrong please check recheck",
      });
    }

    // Create a reset Token

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpirestAt = Date.now() + 1 * 60 * 60 * 1000;

    // updates user information with resetToken and resetTokenExpiresAt
    user.resetpasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpirestAt;
    await user.save();

    //  Send a reset email

    await SendResetEmail(
      email,
      `${process.env.RESET_URl}/reset-password/${resetToken}`
    );
    res
      .status(200)
      .json({ succcess: true, message: "Reset Message sent successFully " });
  } catch (error) {
    console.log("error in reset password " + error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // ✅ Find user with valid token and unexpired time
    const user = await User.findOne({
      resetpasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    // ❌ Typo fixed: `succcess` -> `success`
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid token or token expired" });
    }

    // ✅ Hashing the new password (added `await`)
    user.password = await bcrypt.hash(password, 10);

    // ✅ Clearing reset token and expiry time
    user.resetpasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    // ✅ Save updated user
    await user.save();

    // ✅ Send success email (await if it's async)
    await SendSuccessEmail(user.email);

    // ✅ Response to client
    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log("Error in reset password: " + error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("token") // ❌ `clearCookies` is incorrect. ✅ Use `clearCookie()`
    .json({ success: true, message: "You have been logged out" }); // ✅ Fixed message grammar
};
