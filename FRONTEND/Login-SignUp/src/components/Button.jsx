import React from "react";
import { Link } from "react-router-dom";

function Button({ content, to }) {
  return (
    <>
      <button className="relative flex h-12 items-center justify-center rounded-md text-center text-base font-medium bg-[#3C46FF] text-[#fff] hover:bg-[#0000FF]">
        <Link
          to={to}
          className="w-full h-full flex items-center justify-center"
        >
          {content}
        </Link>
      </button>
    </>
  );
}

export default Button;
