import React from "react";
import { Assets } from "src/utils/assets";

export const NotFound = () => {
  console.log("not found");
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: "60vh" }}
    >
      <img
        src={Assets.notfound}
        alt="not_found"
        className="lg:h-1/2 lg:w-1/2 rounded-md"
      />
    </div>
  );
};
