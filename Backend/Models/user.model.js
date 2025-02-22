import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true, // ✅ Correct!
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastLogin: {
      // when user logged out
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    resetpasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenexpiresAt: Date,
  },
  { timestamps: true } // To automatically add and manage CreateAt and UpdatedAt feilds
);

export const User = mongoose.model("user", userSchema);
