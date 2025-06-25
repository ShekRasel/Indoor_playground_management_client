import React from "react";
import { getUser } from "src/utils/helper";

export const Profile = () => {
  const user = getUser();

  if (!user) return <p className="text-white p-4">No user found.</p>;

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="bg-darkblue flex items-center justify-center p-4">
      <div className="bg-[#1e293b] text-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Avatar with initials */}
          <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center text-3xl font-bold shadow-md">
            {getInitials(user.name)}
          </div>

          {/* Name and role */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-sm text-green-400 uppercase tracking-wide font-medium">
              {user.role}
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-600" />

        {/* Info Section */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">User ID:</span>
            <span className="font-medium">{user.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Email:</span>
            <span className="font-medium">{user.mail || user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Role ID:</span>
            <span className="font-medium">{user.roleId}</span>
          </div>
          {user.phone && (
            <div className="flex justify-between">
              <span className="text-gray-400">Phone:</span>
              <span className="font-medium">{user.phone}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
