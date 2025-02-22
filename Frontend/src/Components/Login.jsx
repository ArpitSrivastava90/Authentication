import React from "react";
import FloatingShapes from "./FloatingShapes";
import img from "../Images/Picture4.jpg";
import Input from "./Input";
import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const HandleClick = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        navigate("/home");
      }
    } catch (error) {
      console.log("error in login", error);
    }
  };
  return (
    <div className="w-full h-screen rounded-lg bg-white flex justify-center items-center overflow-hidden relative">
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

      <div className="loginpage w-[1000px] h-[600px] bg-red-600 z-30 rounded-lg overflow-hidden flex justify-center items-center shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
        <div className=" loginForm bg-white h-full w-[50%] text-3xl p-5 ">
          <h1 className="m-5">WelCome Back</h1>
          <form action="" className=" w-full h-[70%] m-4">
            <div className="inputbox w-full h-[30%]  flex flex-col justify-evenly">
              <Input
                icon={<MdOutlineEmail size={25} />}
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <Input
                icon={<RiLockPasswordLine size={25} />}
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="bg-green-600 mt-8 w-[400px] text-2xl rounded-md text-cyan-50 p-1"
              onClick={HandleClick}
            >
              Login
            </button>

            <div className="additionals    w-80% h-36 text-xl flex flex-col justify-around pt-5">
              <h1>
                {" "}
                Forget Password ?
                <NavLink
                  to="/forgetpassword"
                  className={`p-1 text-blue-500 text-xl underline `}
                >
                  Reset Password{" "}
                </NavLink>
              </h1>
              <h2>
                {" "}
                Don't Have an Account ?{" "}
                <NavLink
                  to={"/"}
                  className={`p-1 text-blue-500 text-xl underline `}
                >
                  Create account
                </NavLink>
              </h2>
            </div>
          </form>
        </div>
        <div
          className="picture  bg-cyan-400 h-full w-[50%] bg-cover bg-center "
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
