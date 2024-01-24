import React from "react";
function Navbar() {
  return (
    <div style={{ color: "rgb(210, 146, 255)" }}>
      <nav className="flex w-full justify-start pl-4">
        <h1 className="m-0 leading-tight">
          <div className="flex items-center text-[20px] font-bold leading-none lg:text-[22px] p-0 ">
            ChatGPT
            <span className="font-mono text-4xl">●</span>
          </div>
        </h1>
      </nav>
    </div>
  );
}

export default Navbar;
