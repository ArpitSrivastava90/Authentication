import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const [isLogout, setisLogout] = useState(false);
  const HandleClick = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/auth/logout",
        {
          withCredentials: true,
        }
      );
      if (response.data.success) setisLogout(true);
      if (isLogout) navigate("/login");
    } catch (error) {
      console.log("Error happen in logout", error);
    }
  };

  return (
    <div
      className="w-full h-full bg-black text-white flex justify-center items-center rounded-xl border-2 border-white hover:bg-white hover:text-black  hover:border-black transition-all duration-500"
      onClick={HandleClick}
    >
      {" "}
      Logout
    </div>
  );
};

export default Logout;
