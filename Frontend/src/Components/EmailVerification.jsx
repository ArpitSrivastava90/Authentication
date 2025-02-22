import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ Added missing import

const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false); // ✅ Fixed isLoading state
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the next empty input
      const lastFilledIndex = newCode.findIndex((digit) => digit === "");
      const focusIndex = lastFilledIndex !== -1 ? lastFilledIndex : 5;
      inputRefs.current[focusIndex]?.focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input if a value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join(""); // ✅ Renamed to avoid conflict

    if (verificationCode.length !== 6) {
      toast.error("Please enter a 6-digit code.");
      return;
    }

    setIsLoading(true); // ✅ Prevent multiple submissions

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/Verifyemail",
        {
          code: verificationCode, // ✅ Corrected request body
        }
      );

      if (response.data.success) {
        toast.success("Email verified successfully");
        navigate("/home");
      } else {
        toast.error("Invalid code. Please try again.");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // ✅ Re-enable button after request
    }
  };

  // Auto-submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="w-full h-screen bg-sky-200 flex justify-center items-center">
      <div className="container w-[600px] h-[300px] bg-slate-700 flex flex-col items-center text-white p-5 rounded-lg shadow-lg">
        <div className="header text-3xl">Verify your Email</div>
        <div className="message mt-5">
          Enter the 6-digit Code sent to your Email address
        </div>
        <form onSubmit={handleSubmit} className="w-full mt-5">
          <div className="inputBoxes w-[100%] h-20 flex flex-col justify-between items-center pl-10 pr-10">
            <div className="mt-5">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-white rounded-lg focus:border-green-500 focus:outline-none"
                />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading || code.some((digit) => !digit)}
              className="w-full mt-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
