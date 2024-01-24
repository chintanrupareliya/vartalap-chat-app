import React, { useEffect, useState } from "react";
import axios from "axios";
const Homepage = () => {
  const [userdata, setUserdata] = useState();
  const fetchUserData = async (accesstoken) => {
    try {
      const res = await axios.get("http://localhost:3030/api/auth/userData", {
        headers: { Authorization: accesstoken },
      });
      setUserdata(res.data);
      console.log(userdata.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const accesstoken = localStorage.getItem("accesstoken");

    if (accesstoken) {
      fetchUserData(accesstoken);
    }
  }, []);
  return (
    <>
      <h1>UserName:{userdata.data.username}</h1>
      <h1>Email:{userdata.data.email}</h1>
    </>
  );
};
export default Homepage;
