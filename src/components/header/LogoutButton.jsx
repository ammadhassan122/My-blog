'use client'
import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";  // 🔥 ye import zaroori hai

const LogoutButton = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());   // 🔥 redux state clear
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };

  return (
    <button
      onClick={logoutHandler}   // 🔥 click event bind
      className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 text-white cursor-pointer"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
