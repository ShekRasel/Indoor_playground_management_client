import React from "react";

export const SecondaryButton = ({ className, children, onclick }) => {
  return (
    <button
      onClick={onclick}
      className={`${className} bg-gradient-to-b from-black to-pink cursor-pointer text-white rounded-sm font-semibold px-6 py-3 border border-white`}
    >
      {children}
    </button>
  );
};
