"use client";

import { useEffect, useState } from "react";
import authService from "@/appwrite/auth";
import Homepage from "@/components/Homepage";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      console.log("User from Appwrite:", userData);
      setUser(userData);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Agar user hai -> Homepage dikhao warna login message
  return (
    <div className="min-h-screen bg-white text-black">
      {user ? (
        <Homepage />
      ) : (
        <h1 className=" flex justify-center items-center h-screen text-center text-xl mt-10">Please login to see homepage</h1>
      )}
    </div>
  );
}
