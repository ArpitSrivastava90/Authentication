import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";

const Home = () => {
  const [UserName, setUserName] = useState("");
  useEffect(() => {
    const Fetchdata = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/auth/check-auth"
        );
        setUserName(response.data.user.name);
        console.log(UserName);
      } catch (error) {
        console.log("error in finding name in home", error);
      }
    };
    Fetchdata();
  });
  useGSAP(() => {
    gsap.from("h1", {
      y: 30,
      stagger: 1,
      opacity: 0,
      duration: 1,
    });
  });
  return (
    <div className="w-full h-screen bg-black">
      <Navbar />

      <div className="main  w-full h-screen flex justify-center items-center">
        <div className="container  w-[50%] h-[60%] text-3xl text-white flex flex-col justify-center items-center ">
          <h1>Welcome {UserName}</h1>
          <h1 className="mt-5">
            This is Just For testing my Authentication Skills
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
