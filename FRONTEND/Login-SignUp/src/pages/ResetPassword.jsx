// ResetPassword.js

import React, { useState } from "react";
import FlotingInputLebal from "../components/FlotingInputLebal";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ErrorIcon from "../components/ErrorIcon";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, seterror] = useState("");
  const [passwordReseted, setPasswordReseted] = useState(false);
  const [passwordStrength, setpasswordStrength] = useState("");
  const { token } = useParams();
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      if (passwordStrength !== "Weak") {
        const res = await axios.post(
          "http://localhost:3030/api/auth/resetPassword",
          {
            email,
            password,
            confirmPassword,
            token,
          }
        );
        console.log(res);
        if (res.status === 201) {
          setPasswordReseted(true);
        }
        console.log(token);
      }
    } catch (error) {
      console.log(error.response);

      seterror(error.response.data.errMessage);
    }
  };
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
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setpasswordStrength(evaluatePasswordStrength(e.target.value));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {passwordReseted ? (
        <div className="max-w-md w-full p-8 bg-white rounded-md shadow-md text-center text-lg font-bold">
          Password is reseted Please
          <Link to={"/login"} className="hover:underline text-blue-500">
            {" "}
            Log in
          </Link>
        </div>
      ) : (
        <div className="max-w-md w-full p-8 bg-white rounded-md shadow-md text-center">
          <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <FlotingInputLebal
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <FlotingInputLebal
                type="password"
                label="New Password"
                value={password}
                onChange={handlePassword}
              />
              <div className="h-6 pl-2 mb-2 text-left">
                <span>
                  Password Strength:
                  <span className="text-red-700"> {passwordStrength}</span>
                </span>
              </div>
            </div>
            <div className="mb-6">
              <FlotingInputLebal
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded h-14 text-white"
              style={{ backgroundColor: "rgb(14, 146, 114)" }}
            >
              Continue
            </button>
          </form>
          <div>
            {error && (
              <div className="text-red-500 text-sm mt-4">
                <ErrorIcon />
                {error}
                {error === "Token Expired" ? (
                  <Link
                    to={"/forgotPassword"}
                    className="text-blue-600 hover:underline"
                  >
                    {" "}
                    try again
                  </Link>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
