import React from "react";
import { FaFacebookF, FaInstagram, FaPhone, FaEnvelope } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-darkblue text-white py-10 mt-10 px-4 shadow-2xl">
      <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-8 text-md">
        {/* About Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">IndoorGame</h2>
          <p className="text-gray-300 leading-relaxed">
            Manage your indoor play zones, staff, bookings, and payments all in
            one place. Fast, intuitive, and built for admins.
          </p>
          <div className="flex gap-3 mt-4 text-lg">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-400"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="/" className="hover:text-white">
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-white">
                Staff
              </Link>
            </li>
            <li>
              <Link to="/playareas" className="hover:text-white">
                Play Areas
              </Link>
            </li>
            <li>
              <Link to="/About" className="hover:text-white">
                About us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center gap-2">
              <FaPhone /> +880 1234 567890
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> info@indoorgame.com
            </li>
            <li className="flex items-center gap-2">
              <MdLocationOn /> 123 Indoor Arena Rd, Dhaka
            </li>
          </ul>
        </div>

        {/* Legal / Copyright */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Legal</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-10 text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} IndoorGame Management System. All
        rights reserved.
      </div>
    </footer>
  );
};
