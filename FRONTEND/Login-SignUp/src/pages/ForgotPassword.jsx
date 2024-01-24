import React, { useState } from "react";
import FlotingInputLebal from "../components/FlotingInputLebal";
import axios from "axios";
import ErrorIcon from "../components/ErrorIcon";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, seterror] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to send a reset password email (not included in this example)
    // You might want to call an API endpoint to handle the email sending process
    try {
      const res = await axios.post(
        "http://localhost:3030/api/auth/forgotPassword",
        {
          email,
        }
      );
      console.log(res);
      console.log(res.data.success);
      if (res.data.success === true) {
        setIsEmailSent(true);
      }
    } catch (error) {
      console.log(error.response.data.errMessage);
      seterror(error.response.data.errMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        {isEmailSent ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Email Sent!</h2>
            <p>
              An email with instructions to reset your password has been sent to
              <br />
              <span className="font-bold">{email}</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Forgot Password
            </h2>
            <div className="">
              <FlotingInputLebal
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="h-6 pl-2 mb-2">
              {error && (
                <div className="text-red-500 text-sm mb-4">
                  <ErrorIcon />
                  {error}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full rounded h-14 text-white"
              style={{ backgroundColor: "rgb(14, 146, 114)" }}
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
