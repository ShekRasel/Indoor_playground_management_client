import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthSideBanner } from "src/components/banners/auth.side.banner";
import { SecondaryButton } from "src/components/buttons/secondary.button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_API_URL } from "src/utils/helper";

export const SignUp = () => {
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
        `${BACKEND_API_URL}/customers/signup`,
        data
      );
      const { message } = response.data;
      toast.success(`${message}`, {
        position: "top-right",
        autoClose: 3000,
      });
      reset();
      navigate("/login");
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
      <div className="bg-white rounded-xl grid grid-cols-1 lg:grid-cols-2 w-full max-w-5xl shadow-lg overflow-hidden">
        <AuthSideBanner>
          <h2 className="text-3xl font-bold">Join Us Today</h2>
          <p className="mt-2 text-lg">Create an account to get started</p>
        </AuthSideBanner>

        <div className="p-6 lg:p-10 bg-white space-y-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-pink text-center mb-6 italic">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name and Phone */}
            <div className="grid grid-cols-1  gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-pink"
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  {...register("phone", { required: "Phone is required" })}
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-pink"
                  placeholder="017XXXXXXXX"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Email and Address */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-pink"
                  placeholder="robin@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  {...register("address", {
                    required: "Address is required",
                  })}
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-pink"
                  placeholder="Dhaka"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>

            {/* Username and Password */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Username
                </label>
                <input
                  {...register("username", {
                    required: "Username is required",
                  })}
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-pink"
                  placeholder="robinsha"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters required",
                    },
                  })}
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-pink"
                  placeholder="******"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <SecondaryButton
                type="submit"
                disabled={isSubmitting}
                className="!w-full"
              >
                {isSubmitting ? "Creating..." : "Create Account"}
              </SecondaryButton>
            </div>
          </form>

          <h1 className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};
