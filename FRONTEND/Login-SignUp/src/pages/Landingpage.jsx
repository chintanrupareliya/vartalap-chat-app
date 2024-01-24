import React from "react";
import Navbar from "../components/Navbar";
import Textanimation from "../components/Textanimation";
import Button from "../components/Button";
import svg from "../assets/reshot-icon-unicorn-XDCHJTKVNP.svg";
function Landingpage() {
  return (
    <>
      <div className="flex min-h-full w-full md:grid md:grid-cols-2 lg:grid-cols-[60%_40%] sm:supports-[min-height:100dvh]:min-h-[100dvh] overflow-hidden">
        {/* div for left side of the page */}

        <div
          className="relative w-full h-full float-left p-5 hidden md:block flex-1"
          style={{ backgroundColor: "rgb(0, 0, 46)" }}
        >
          <div
            className=" m-6 font-bold "
            style={{ fontFamily: "Roboto Mono" }}
          >
            <Navbar />
          </div>
          <div className="w-full flex items-center h-2/3">
            <div className="  ">
              <Textanimation />
            </div>
          </div>
        </div>

        {/* div for right side of the page */}

        <div className="relative flex grow items-center justify-between flex-col bg-black float-right text-white p-5">
          <div className=" relative mb-10 flex w-full grow items-center justify-center flex-col">
            <div className="text-center text-5xl font-bold mb-5 mt-8">
              <h1>Get started</h1>
            </div>
            <div className="mt-5 w-full max-w-[440px]">
              <div className=" grid gap-x-3 gap-y-2 sm:grid-cols-2 sm:gap-y-0">
                <Button content={"Log in"} to={"/login"} />
                <Button content={"Sign up"} to={"/signup"} />
              </div>
            </div>
          </div>
          <div className="bottom-5">
            <div className="flex items-center justify-center">
              <img src={svg} alt="logo svg" className="h-16 w-16" />
            </div>
            <div className="text-center mt-5 text-slate-400 text-sm">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
              >
                Term of use
              </a>
              <span className="mx-3">|</span>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
              >
                Privacy policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landingpage;
