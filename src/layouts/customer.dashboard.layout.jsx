import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardNavbar } from "src/components/navbar/customer.dashboard.navbar";

export const DashBoardLayout = () => {
  return (
    <div className="container">
      <DashboardNavbar />
      <Outlet />
    </div>
  );
};
