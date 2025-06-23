import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardNavbar } from "src/components/navbar/dashboard.navbar";

export const DashBoardLayout = () => {
  return (
    <div>
      <DashboardNavbar />
      <Outlet />
    </div>
  );
};
