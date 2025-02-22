import React from "react";

import Logout from "./Logout";

const Navbar = () => {
  return (
    <div className="w-full h-20  flex justify-between items-center p-10 pr-16 text-white">
      <div className="logo">Logo</div>
      <div className="navbar w-28 h-12   flex justify-around  rounded-lg">
        <Logout />
      </div>
    </div>
  );
};

export default Navbar;
