import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SecondaryButton } from "src/components/buttons/secondary.button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_API_URL } from "src/utils/helper";

export const StaffLogIn = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${BACKEND_API_URL}/staff/login`, data);
      const { message, token, user } = response.data;

      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
      });

      reset();

      //Save token + user for universal access
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate based on role
      if (user.role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/staff/dashboard");
      }
    } catch (error) {
      toast.error("Login failed. Please check credentials.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Staff login failed:", error);
    }
  };

  return (
    <div className="mt-10 lg:mt-20 flex w-full justify-center">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-lg p-6 lg:p-10 lg:py-20">
        <h2 className="text-2xl lg:text-3xl font-bold text-pink text-center mb-6 italic">
          Staff Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                },
              })}
              type="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-pink"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-pink"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="text-center">
            <SecondaryButton
              type="submit"
              disabled={isSubmitting}
              className="!w-full"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </SecondaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};
