import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "src/components/navbar/public.navbar";

export const MainLayout = () => {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
};
