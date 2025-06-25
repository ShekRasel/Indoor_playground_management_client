import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "src/components/footer/footer";
import { DashboardNavbar } from "src/components/navbar/customer.dashboard.navbar";

export const DashBoardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen container">
      <DashboardNavbar />
      <main className="flex-grow py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
