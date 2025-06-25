import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "src/components/footer/footer";
import { Navbar } from "src/components/navbar/public.navbar";

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen container">
      <Navbar />
      <main className="flex-grow py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
