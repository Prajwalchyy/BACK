import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Home = () => {
  const navigate = useNavigate();
  const ThrowToLogin = () => {
    const token = Cookies.get("AccessToken");
    console.log(token);
    if (!token) {
      navigate("/Login");
    }
  };

  useEffect(() => {
    ThrowToLogin();
  });
  return (
    <>
      <div>welcome User</div>
    </>
  );
};

export default Home;
