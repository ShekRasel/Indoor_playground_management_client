import React from "react";
import { Outlet } from "react-router-dom";
import { AdminDashboardNavbar } from "src/components/navbar/admin.dashboard.navbar";

export const AdminDashboardLayout = () => {
  return (
    <div>
      <AdminDashboardNavbar />
      <Outlet />
    </div>
  );
};
