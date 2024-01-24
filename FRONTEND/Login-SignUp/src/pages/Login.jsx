import svg from "../assets/reshot-icon-unicorn-XDCHJTKVNP.svg";
import FlotingInputLebal from "../components/FlotingInputLebal";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SocialLoginButton from "../components/SocialLoginButton";

function Login() {
  const googlepath = "https://img.icons8.com/color/48/google-logo.png";
  const facebookpath = "https://img.icons8.com/fluency/48/facebook-new.png";
  const githubpath = "https://img.icons8.com/ios-glyphs/480/github.png";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     localStorage.clear();
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const res = await axios.post("http://localhost:3030/api/auth/login", {
        email,
        password,
      });

      const { accesstoken, refreshToken } = res.data;

      console.log(res.data.message);
      localStorage.setItem("accesstoken", accesstoken);
      localStorage.setItem("refreshToken", refreshToken);
      if (accesstoken && refreshToken) {
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.errMessage);
      console.log(err.response.data.errMessage);
    }
  };

  return (
    <div
      className="flex items-center justify-center bg-white "
      style={{ flexDirection: "column" }}
    >
      <header className="pt-5 flex items-center justify-center w-full ">
        <div className="logo">
          <img src={svg} alt="" className="h-16 w-16" />
        </div>
      </header>
      <div className="my-18 flex items-center">
        <main className="mb-20 min-w-[400px]  ">
          <div className="h-9 rounded mx-12">
            <div className="text-center text-red-700 font-bold flex rounded justify-center items-center h-9 ">
              {error === "Invalid Email and Password" ||
              error === "Invalide Password"
                ? ""
                : error}
            </div>
          </div>
          <div className="mx-auto p-[40px]">
            <div className="text-center font-bold text-3xl mb-10">
              Welcome back
            </div>
            <form
              action="/login"
              method="post"
              autoComplete="off"
              onSubmit={handleLogin}
            >
              <div>
                <div>
                  <FlotingInputLebal
                    type={"Email"}
                    label={"Email address"}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="h-6 pl-2 mb-2">
                  <p className="text-red-700">
                    {error == "Invalid Email and Password" ? error : ""}
                  </p>
                </div>
                <div>
                  <FlotingInputLebal
                    type={"password"}
                    label={"Password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="h-6 pl-2 mb-2">
                  <p className="text-red-700">
                    {error == "Invalide Password" ? error : ""}
                  </p>
                </div>
                <div>
                  <button
                    className="w-full rounded h-14 text-white"
                    style={{ backgroundColor: "rgb(14, 146, 114)" }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600">
              <Link to={"/ForgotPassword"} className="hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="mx-auto">
              <div className="text-center my-4">
                Don't have an account?
                <Link to={"/Signup"}>
                  <button
                    className="mx-1"
                    style={{
                      color: "rgb(16, 163, 127)",
                    }}
                  >
                    Sign up
                  </button>
                </Link>
              </div>
              <div className="w-full mb-2 flex items-center justify-center before:border before:border-gray-600 before:w-1/2 after:border after:border-gray-600 after:w-1/2">
                <span className="mx-2">OR</span>
              </div>
              <div>
                <form action="#">
                  <SocialLoginButton socialName={"Google"} logo={googlepath} />
                </form>
                <form action="#">
                  <SocialLoginButton
                    socialName={"Facebook"}
                    logo={facebookpath}
                  />
                </form>
                <form action="#">
                  <SocialLoginButton socialName={"Github"} logo={githubpath} />
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
      <footer>
        <div className="text-center text-gray-500 m-8">
          <span>© 2023 All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default Login;
