import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import React from "react";
import Router from "./Routes/Router.jsx";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="h-screen w-full">
      <RouterProvider router={Router} />
    </div>
  </React.StrictMode>
);
