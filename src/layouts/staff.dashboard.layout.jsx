import React from "react";
import { FaTasks, FaUserCircle } from "react-icons/fa";
import { MdAssignment, MdDashboard } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { StaffDashboardNavbar } from "src/components/navbar/staff.dashboard.navbar";
import { Assets } from "src/utils/assets";

export const StaffDashboardLayout = () => {
  return (
    <div className="h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-20 md:w-32 lg:w-56 bg-darkBlue z-40 py-4 text-white">
        <StaffSidebar />
      </div>

      {/* Main Content Area with margin-left equal to sidebar width */}
      <div className="ml-20 md:ml-32 lg:ml-56 h-screen flex flex-col overflow-hidden">
        {/* Sticky Navbar */}
        <div className="sticky top-0 z-50 bg-darkBlue p-2 lg:p-4">
          <StaffDashboardNavbar />
        </div>

        {/* Scrollable Outlet Area */}
        <div className="flex-1 overflow-y-auto lg:p-4 bg-admin">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const StaffSidebar = () => {
  return (
    <div className="px-1 md:px-2 lg:px-7 place-items-center lg:place-items-start">
      {/* Logo */}
      <div className="flex gap-2 items-center">
        <img
          src={Assets.logo}
          alt="logo"
          width={20}
          className="rounded-lg w-8"
        />
        <span className="hidden lg:block text-xl">IndoorMate</span>
      </div>

      {/* Nav Links */}
      <div className="mt-24 space-y-8">
        <NavLink
          to="/staff/dashboard"
          end
          className={({ isActive }) =>
            `flex gap-4 items-center ${
              isActive ? "text-green-500" : "text-white"
            }`
          }
        >
          <MdDashboard size={20} />
          <span className="hidden lg:block">Dashboard</span>
        </NavLink>

        <NavLink
          to="/staff/dashboard/work"
          className={({ isActive }) =>
            `flex gap-4 items-center ${
              isActive ? "text-green-500" : "text-white"
            }`
          }
        >
          <MdAssignment size={20} />
          <span className="hidden lg:block">Assaign Work</span>
        </NavLink>

        <NavLink
          to="/staff/dashboard/task"
          className={({ isActive }) =>
            `flex gap-4 items-center ${
              isActive ? "text-green-500" : "text-white"
            }`
          }
        >
          <FaTasks size={20} />
          <span className="hidden lg:block">Task</span>
        </NavLink>

        <NavLink
          to="/staff/dashboard/profile"
          className={({ isActive }) =>
            `flex gap-4 items-center ${
              isActive ? "text-green-500" : "text-white"
            }`
          }
        >
          <FaUserCircle size={20} />
          <span className="hidden lg:block">Profile</span>
        </NavLink>
      </div>
    </div>
  );
};
