import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { useClickOutSite } from "src/hooks/click.outside";
import { Assets } from "src/utils/assets";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const divRef = useRef(null);

  const handleMenuOpenClose = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navUrl = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Customer LogIn", link: "/login" },
    { name: "Staff Login", link: "/staff_login" },
  ];

  // custom hook
  useClickOutSite(divRef, closeMenu);

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
          <div className="absolute left-0 flex flex-col bg-darkBlue text-gray top-20 rounded-lg border p-4 w-56 gap-0.5 z-50">
            {navUrl.map((url) => (
              <NavLink
                to={url.link}
                className={({ isActive }) =>
                  `cursor-pointer px-6 py-2 hover:rounded-lg hover:bg-pink hover:text-white ${
                    isActive ? "bg-violet text-white rounded-lg" : "text-gray"
                  }`
                }
                key={url.name}
                onClick={handleMenuOpenClose}
              >
                {url.name}
              </NavLink>
            ))}
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
      <div className="gap-2 hidden lg:flex">
        {navUrl.map((url) => (
          <NavLink
            to={url.link}
            className={({ isActive }) =>
              `cursor-pointer px-6 py-3 hover:rounded-lg hover:bg-pink hover:text-white ${
                isActive ? "bg-violet text-white rounded-lg" : "text-gray"
              }`
            }
            key={url.name}
          >
            {url.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
