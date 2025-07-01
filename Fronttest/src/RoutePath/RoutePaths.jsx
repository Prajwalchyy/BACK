import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Components/HomePage/Home";
import Login from "../Components/Form/Login";

const RoutePaths = () => {
  const path = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/Login",
      element: <Login />,
    },
  ]);
  return (
    <>
      <RouterProvider router={path} />
    </>
  );
};

export default RoutePaths;
