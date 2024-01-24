import React from "react";

function SocialLoginButton({ socialName, logo }) {
  return (
    <>
      <div className="hover:bg-blue-200 rounded hover:transition-all duration-300">
        <button className="relative w-full rounded border border-gray-300 h-14 flex items-center my-4">
          <span className="w-6 h-6 mx-4">
            <img src={logo} alt="google image" />
          </span>
          <span className="text-lg">Continue with {socialName}</span>
        </button>
      </div>
    </>
  );
}

export default SocialLoginButton;
