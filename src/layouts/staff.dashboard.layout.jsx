import React from "react";
import { Outlet } from "react-router-dom";
import { StaffDashboardNavbar } from "src/components/navbar/staff.dashboard.navbar";

export const StaffDashboardLayout = () => {
  return (
    <div>
      <StaffDashboardNavbar />
      <Outlet />
    </div>
  );
};
