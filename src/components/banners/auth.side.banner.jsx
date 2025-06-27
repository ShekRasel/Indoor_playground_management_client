import React from "react";
import { Assets } from "src/utils/assets";

export const AuthSideBanner = ({ children }) => {
  return (
    <div
      className="hidden lg:flex flex-col justify-end p-10 bg-cover bg-center items-center text-purple-700"
      style={{
        backgroundImage: `url(${Assets.login})`,
      }}
    >
      {children}
    </div>
  );
};
