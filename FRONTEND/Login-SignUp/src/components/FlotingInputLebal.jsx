import React from "react";
import { useState } from "react";
function FlotingInputLebal({ type, label, value, onChange, name }) {
  const [isfocused, setIsfocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handlepassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleFocus = () => {
    setIsfocused(true);
  };

  const handleBlur = () => {
    setIsfocused(false);
  };

  return (
    <div className="relative flex items-center justify-center">
      <label
        htmlFor={label}
        className={`absolute bg-white ${
          isfocused || value
            ? "text-teal-600 top-[-11px] px-[3px]  text-sm left-3 "
            : "text-gray-400 top-1/4 text-base left-6"
        } transition-all duration-200 ease-in-out`}
      >
        {label}
      </label>
      {type.toLowerCase() === "password" ? (
        <div
          className="absolute right-0 rounded-r flex items-center justify-center pl-1  mx-3 bg-white hover:cursor-pointer"
          onClick={handlepassword}
        >
          {isPasswordVisible ? "👀" : "👓"}
        </div>
      ) : (
        <div></div>
      )}
      <input
        type={isPasswordVisible ? "text" : type}
        className="border-gray-400 rounded w-full h-12 px-6 text-lg border-[1px]  focus:outline-none focus:border-green-600"
        id={label}
        value={value}
        name={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        autoComplete={
          type.toLowerCase() === "password" ? "current-password" : "off"
        }
        required={true}
        inputMode="text"
      />
    </div>
  );
}

export default FlotingInputLebal;
