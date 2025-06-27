import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AdminDashboardNavbar } from "src/components/navbar/admin.dashboard.navbar";
import { Assets } from "src/utils/assets";
import { FaUserCircle, FaUserFriends, FaUserShield } from "react-icons/fa";
import { MdDashboard, MdManageAccounts } from "react-icons/md";

export const AdminDashboardLayout = () => {
  return (
    <div className="h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-20 md:w-32 lg:w-56 bg-darkBlue z-40 py-4 text-white">
        <AdminSidebar />
      </div>

      {/* Main Content Area with margin-left equal to sidebar width */}
      <div className="ml-20 md:ml-32 lg:ml-56 h-screen flex flex-col overflow-hidden">
        {/* Sticky Navbar */}
        <div className="sticky top-0 z-50 bg-darkBlue p-2 lg:p-4">
          <AdminDashboardNavbar />
        </div>

        {/* Scrollable Outlet Area */}
        <div className="flex-1 overflow-y-auto lg:p-4 bg-admin">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AdminSidebar = () => {
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
          to="/admin/dashboard"
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
          to="/admin/dashboard/customers"
          className={({ isActive }) =>
            `flex gap-4 items-center ${
              isActive ? "text-green-500" : "text-white"
            }`
          }
        >
          <FaUserFriends size={20} />
          <span className="hidden lg:block">Customers</span>
        </NavLink>

        <NavLink
          to="/admin/dashboard/staff"
          className={({ isActive }) =>
            `flex gap-4 items-center ${
              isActive ? "text-green-500" : "text-white"
            }`
          }
        >
          <MdManageAccounts size={20} />
          <span className="hidden lg:block">Manage Staff</span>
        </NavLink>

        <NavLink
          to="/admin/dashboard/roles"
          className={({ isActive }) =>
            `flex gap-4 items-center ${
              isActive ? "text-green-500" : "text-white"
            }`
          }
        >
          <FaUserShield size={20} />
          <span className="hidden lg:block">Create Roles</span>
        </NavLink>

        <NavLink
          to="/admin/dashboard/profile"
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
