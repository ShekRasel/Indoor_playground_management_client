import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthSideBanner } from "src/components/auth.side.banner";
import { SecondaryButton } from "src/components/buttons/secondary.button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_API_URL } from "src/utils/helper";

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/customers/login`,
        data
      );
      const { message, token, user } = response.data;
      toast.success(`${message}`, {
        position: "top-right",
        autoClose: 3000,
      });
      reset();
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="mt-10 lg:mt-20 flex w-full justify-center">
      <div className="bg-white rounded-xl grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl shadow-lg overflow-hidden">
        <AuthSideBanner>
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="mt-2 text-lg">Log in to manage your account</p>
        </AuthSideBanner>

        <div className="p-6 lg:p-10 bg-white space-y-4 lg:py-44">
          <h2 className="text-2xl lg:text-3xl font-bold text-pink text-center mb-6 italic">
            Login to Your Account
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
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
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

          <h1 className="text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Sign up
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};
