"use client"

import Link from "next/link"
import appwriteService from "@/appwrite/config"

const PostCard = ({ $id, title, featuredImage, author, createdAt }) => {
  const imageSrc = featuredImage ? appwriteService.getFilePreview(featuredImage) : undefined;

  // date ko readable format me convert karte hain
  const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString() : "";

  return (
    <Link href={`/posts/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 hover:shadow-lg transition">
        <div className="w-full justify-center mb-4">
          {imageSrc && (
            <img
              src={imageSrc}
              alt={title}
              className="rounded-xl max-h-60 w-full object-cover"
            />
          )}
        </div>
        <h2 className="text-lg font-bold">{title}</h2>

        {/* Author aur Date */}
        <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
          <span>✍️ {author}</span>
          <span>📅 {formattedDate}</span>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
