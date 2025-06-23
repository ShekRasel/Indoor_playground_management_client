import React, { Fragment } from "react";
import { Navbar } from "../components/navbar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
};
