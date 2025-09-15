"use client";

import Link from "next/link";
import appwriteService from "@/appwrite/config";
import Image from "next/image";
import {  User2Icon } from "lucide-react";

const PostCard = ({ $id, title, featuredImage, authorName, $createdAt }) => {
  const imageSrc = featuredImage
    ? appwriteService.getFilePreview(featuredImage)
    : undefined;

  // Date formatting
  const formattedDate = $createdAt
    ? new Date($createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <Link href={`/posts/${$id}`}>
      <div className="bg-gray-100 rounded-xl p-4 hover:shadow-lg transition flex flex-col h-full">
        {/* Image */}
        {imageSrc && (
          <div className="w-full mb-4">
            <Image
              width={800}
              height={400}
              src={imageSrc}
              alt={title}
              className="rounded-xl h-48 w-full object-cover"
            />
          </div>
        )}

        {/* Title */}
        <h2 className="text-lg font-bold mb-2">{title}</h2>

        {/* Author aur Date */}
        <div className="flex items-center justify-between text-sm text-gray-600 mt-auto">
         <div className="flex justify-center items-center "> <User2Icon className="text-black"/> <span className="text-center capitalize"> {authorName || "Unknown"}</span> </div>
          <span>📅 {formattedDate}</span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
