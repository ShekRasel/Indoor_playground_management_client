import React from "react";

export const PrimaryButton = ({ className, children, onclick }) => {
  return (
    <button
      onClick={onclick}
      className={`${className} bg-gradient-to-b from-black to-pink cursor-pointer text-white rounded-lg font-semibold px-6 py-3`}
    >
      {children}
    </button>
  );
};
