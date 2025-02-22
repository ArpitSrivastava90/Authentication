import React, { useEffect, useState } from "react";
import image from "../Images/Picture4.jpg";
import FloatingShapes from "./FloatingShapes";
import { FiLoader } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import Input from "./Input";
import axios from "axios";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [isLoading, setisLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const HandleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Form Data:", formData);

    try {
      setisLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        formData,
        { headers: { "Content-Type": "application/json" } } // ✅ Fixed
      );

      setisLoading(false);
      console.log("Server Response:", response.data.success);

      //navigating user to login page if Account is Created

      if (response.data.success) {
        navigate("/verify-Email");
      }
    } catch (error) {
      console.log(
        "Axios Error:",
        error.response ? error.response.data : error.message
      );
    }

    // Clear the form after submission
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="w-full h-screen rounded-lg bg-white flex justify-center items-center overflow-hidden relative">
      {/* Floating Shapes */}
      <FloatingShapes
        color="#6CB4EE"
        size="w-40 h-40"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShapes
        color="#6CB4EE"
        size="w-60 h-60"
        top="40%"
        left="40%"
        delay={0}
      />
      <FloatingShapes
        color="#6CB4EE"
        size="w-80 h-80"
        top="70%"
        left="70%"
        delay={0}
      />
      <FloatingShapes
        color="#6CB4EE"
        size="w-20 h-40"
        top="10%"
        left="70%"
        delay={0}
      />
      <FloatingShapes
        color="#6CB4EE"
        size="w-80 h-80"
        top="60%"
        left="10%"
        delay={0}
      />

      {/* Signup Form */}
      <div className="loginPAge rounded-lg overflow-hidden w-[1000px] h-[600px] z-10 flex justify-center items-center shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
        <div className="loginform w-[50%] h-full bg-white text-3xl p-5">
          <h2>Create Your Account</h2>
          <form className="w-full h-[95%] pt-5" onSubmit={HandleSubmit}>
            <div className="inputbox w-full h-36 flex flex-col justify-between">
              {/* Name Input */}
              <Input
                name="name"
                icon={<FaRegUser size={25} />}
                type="text"
                placeholder="Enter Your Username"
                value={formData.name}
                onChange={HandleChange}
              />
              {/* Email Input */}
              <Input
                name="email"
                icon={<MdOutlineEmail size={25} />}
                type="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={HandleChange}
              />
              {/* Password Input */}
              <Input
                name="password"
                icon={<RiLockPasswordLine size={25} />}
                type="password"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={HandleChange}
              />
            </div>

            {/* Password Strength Meter */}
            <PasswordStrengthMeter password={formData.password} />

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-green-600 mt-8 w-[400px] text-2xl rounded-md text-cyan-50 p-1"
            >
              {isLoading ? (
                <FiLoader className="mx-auto animate-spin" />
              ) : (
                "Signup"
              )}
            </button>

            {/* Login Redirect */}
            <div className="logindiv w-80 flex text-xl m-5">
              <h1>Already have an Account? </h1>
              <h1>
                <NavLink to="/login" className="p-1 text-blue-500">
                  Login
                </NavLink>
              </h1>
            </div>
          </form>
        </div>

        {/* Background Image */}
        <div
          className="picture w-[50%] h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
    </div>
  );
};

export default Signup;
