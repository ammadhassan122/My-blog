"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login as authLogin } from "@/store/authSlice";
import { Input, Button } from "./index";

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const create = async (data) => {
    setError(null);
    try {
      // Appwrite service se account create
      const userAccount = await authService.createAccount(data);
      if (userAccount) {
        // account create hone ke baad user ko fetch karenge
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          router.push("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Create a new account
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </p>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <form
          onSubmit={handleSubmit(create)}
          className="flex flex-col gap-4 mt-6"
        >
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: true })}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) => {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  return emailRegex.test(value) || "Invalid email format";
                },
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true, minLength: 6 })}
          />

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
