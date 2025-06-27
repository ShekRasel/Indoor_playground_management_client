import React, { useRef, useState } from "react";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { NavLink, useNavigate } from "react-router-dom";
import { useClickOutSite } from "src/hooks/click.outside";
import { Assets } from "src/utils/assets";
import { removeToken, removeUser } from "src/utils/helper";

export const DashboardNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const divRef = useRef(null);
  const navigate = useNavigate();

  const handleMenuOpenClose = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // custom hook
  useClickOutSite(divRef, closeMenu);

  //routes
  const dashboardNavUrl = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/dashboard/about" },
    { name: "Contact", link: "/dashboard/contact" },
    { name: "Playarea", link: "/dashboard/playareas" },
  ];

  //logout
  const logout = () => {
    removeToken();
    removeUser();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center">
      {/* mobile view */}
      <div ref={divRef} className="lg:hidden">
        <button
          className="bg-white font-bold p-2 rounded-lg cursor-pointer lg:hidden"
          onClick={handleMenuOpenClose}
        >
          <HiOutlineBars3CenterLeft size={25} />
        </button>

        {isMobileMenuOpen && (
          <div className="absolute left-0 flex flex-col bg-darkBlue text-gray top-20 rounded-lg border p-4 w-56 gap-2 z-50">
            {dashboardNavUrl.map((nav) => (
              <NavLink
                to={nav.link}
                className={({ isActive }) =>
                  `cursor-pointer px-6 py-3 hover:rounded-lg hover:bg-pink hover:text-white ${
                    isActive ? "bg-violet text-white rounded-lg" : "text-gray"
                  }`
                }
                key={nav.name}
              >
                {nav.name}
              </NavLink>
            ))}

            {/* logout button */}
            <button onClick={logout} className="cursor-pointer">
              Logout
            </button>
          </div>
        )}
      </div>

      {/* logo */}
      <img
        src={Assets.logo}
        alt="logo"
        width={50}
        className="rounded-lg w-11"
      />

      {/* desktop view */}
      <div className="space-x-3 hidden lg:flex text-gray items-center">
        {dashboardNavUrl.map((nav) => (
          <NavLink
            to={nav.link}
            className={({ isActive }) =>
              `cursor-pointer px-6 py-3 hover:rounded-lg hover:bg-pink hover:text-white ${
                isActive ? "bg-violet text-white rounded-lg" : "text-gray"
              }`
            }
            key={nav.name}
          >
            {nav.name}
          </NavLink>
        ))}

        {/* logout button */}
        <button onClick={logout} className="cursor-pointer">
          Logout
        </button>
      </div>
    </div>
  );
};
