import React, { useState } from "react";
import svg from "../assets/reshot-icon-unicorn-XDCHJTKVNP.svg";
import FlotingInputLebal from "../components/FlotingInputLebal";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SocialLoginButton from "../components/SocialLoginButton";
const Signup = () => {
  const googlepath = "https://img.icons8.com/color/48/google-logo.png";
  const facebookpath = "https://img.icons8.com/fluency/48/facebook-new.png";
  const githubpath = "https://img.icons8.com/ios-glyphs/480/github.png";
  const [error, setError] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [passwordStrength, setpasswordStrength] = useState("");
  const navigate = useNavigate();

  const [userdata, setUserdata] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const evaluatePasswordStrength = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    ) {
      return "Strong";
    } else if (
      password.length >= minLength &&
      ((hasUppercase && hasLowercase) ||
        (hasUppercase && hasNumber) ||
        (hasLowercase && hasNumber) ||
        (hasUppercase && hasSpecialChar) ||
        (hasLowercase && hasSpecialChar) ||
        (hasNumber && hasSpecialChar))
    ) {
      return "Moderate";
    } else {
      return "Weak";
    }
  };
  const handalInputChange = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    if (e.target.name === "email") {
      if (!validateEmail(e.target.value)) {
        setIsValidEmail(false);
      } else {
        setIsValidEmail(true);
      }
    }
    if (e.target.name === "password") {
      setpasswordStrength(evaluatePasswordStrength(e.target.value));
    }
  };
  const handleSingnup = async (e) => {
    if (
      passwordStrength === "Weak" ||
      !isValidEmail ||
      userdata.password !== userdata.confirmPassword
    ) {
      // Display an error or handle the condition as needed
      setError(
        error + " " + "Please fix the highlighted issues before signing up."
      );
      return;
    }
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3030/api/auth/signup",
        userdata
      );
      console.log(res.data.message);
      const { accesstoken, refreshToken } = res.data;
      localStorage.setItem("accesstoken", accesstoken);
      localStorage.setItem("refreshToken", refreshToken);
      if (accesstoken && refreshToken) navigate("/home");
    } catch (err) {
      console.log(err);
      if (err.response.status === 409 || err.response.status === 500)
        setError(err.response.data.errMessage);
    }
  };
  return (
    <div className="h-full w-full ">
      <div
        className="flex items-center justify-center"
        style={{ flexDirection: "column" }}
      >
        <header className="w-full flex items-center justify-center p-5">
          <div>
            <img src={svg} alt="logo" className="h-16 w-16" />
          </div>
        </header>
        <main className=" mb-14 ">
          <div className="min-w-[400px] px-10 ">
            <div className="h-9 rounded mx-12 mb-14">
              <div className="text-center text-red-700 font-bold flex rounded justify-center items-center h-9 ">
                <p>{error}</p>
              </div>
            </div>
            <div className="text-center font-bold text-3xl mb-10">Welcome</div>
            <form method="post" onSubmit={handleSingnup} autoComplete="off">
              <div className="mb-8">
                <FlotingInputLebal
                  label={"Username"}
                  type={"text"}
                  onChange={handalInputChange}
                  value={userdata.username}
                  name={"username"}
                />
              </div>
              <div>
                <FlotingInputLebal
                  label={"Email"}
                  type={"Email"}
                  value={userdata.email}
                  name={"email"}
                  onChange={handalInputChange}
                />
              </div>
              <div className="h-6 pl-2 mb-2">
                <p className="text-red-700">
                  {isValidEmail ? "" : "Enter valide email"}
                </p>
              </div>
              <div>
                <FlotingInputLebal
                  label={"Password"}
                  type={"Password"}
                  value={userdata.password}
                  name={"password"}
                  onChange={handalInputChange}
                />
              </div>
              <div className="h-6 pl-2 mb-2">
                <span>
                  Password Strength:
                  <span className="text-red-700"> {passwordStrength}</span>
                </span>
              </div>
              <div>
                <FlotingInputLebal
                  label={"Confirm Password"}
                  type={"Password"}
                  value={userdata.confirmPassword}
                  name={"confirmPassword"}
                  onChange={handalInputChange}
                />
              </div>
              <div className="h-6 pl-2 mb-2 w-full overflow-hidden">
                <p className="text-red-700 w-full overflow-hidden">
                  {userdata.password !== userdata.confirmPassword
                    ? "Password and confirm password not match."
                    : ""}
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
            </form>
            <div className="text-center my-4">
              Already have an account?
              <Link to={"/login"}>
                <button
                  className="mx-1"
                  style={{
                    color: "rgb(16, 163, 127)",
                  }}
                >
                  Log in
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
        </main>
        <footer>
          <div className="text-center text-gray-500 m-8">
            <span>© 2023 All Rights Reserved.</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Signup;
