import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken, removeUser } from "src/utils/helper";

export const AdminDashboardNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    removeUser();
    navigate('/')
  };

  return (
    <div className="text-gray w-full place-items-end">
      <div className="flex gap-4 items-center">
        <Link to="/admin/dashboard/profile" className="">Profile</Link>
        <button onClick={logout} className="border px-3 py-0.5 rounded-sm cursor-pointer">Logout</button>
      </div>
    </div>
  );
};
