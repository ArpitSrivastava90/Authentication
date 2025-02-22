import React from "react";

const Input = ({ name, type, icon, placeholder, value, onChange }) => {
  return (
    <div className="w-[400px] h-10 flex items-center border-gray-200 border-2 pl-1 rounded-md">
      {icon}
      <input
        name={name}
        type={type}
        className="outline-none text-xl pl-2 w-full"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
