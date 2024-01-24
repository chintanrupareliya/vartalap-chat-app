// ErrorIcon.jsx

import React from "react";

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="h-6 w-6 text-red-500 inline-block mr-2"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="#EF4444"
      strokeWidth="2"
      fill="none"
    />
    <text x="12" y="16" fill="#EF4444" fontSize="12" textAnchor="middle">
      !
    </text>
  </svg>
);

export default ErrorIcon;
