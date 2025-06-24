import React from "react";
import { Assets } from "src/utils/assets";

export const Contact = () => {
  return (
    <div className="px-4 py-10  mx-auto space-y-16 text-gray">
      {/* Top: 3 Pictures */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <img
          src={Assets.contact1}
          alt="Indoor Play 1"
          className="w-full h-64 object-cover rounded-lg"
        />
        <img
          src={Assets.contact2}
          alt="Indoor Play 2"
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      {/* Middle: Contact Text */}
      <div className="space-y-4 text-center">
        <h1 className="text-2xl lg:text-4xl font-bold text-pink">
          Get in Touch With Us
        </h1>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed">
          Have questions about our indoor playground, events, or bookings? We're
          here to help! Fill out the form below and our team will get back to
          you as soon as possible.
        </p>
      </div>

      {/* Bottom: Contact Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 lg:p-10">
        <form className="space-y-6 mx-auto lg:max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-pink"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-pink"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              className="w-full border border-gray-300 rounded-md px-4 py-2 min-h-[120px] focus:outline-pink"
              placeholder="Write your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-pink text-white px-6 py-2 rounded-md hover:bg-pink-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};
