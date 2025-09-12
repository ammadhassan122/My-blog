"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import appwriteService from "@/appwrite/config"
import { PostForm } from "@/components"
//15:38 building pages
export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params // URL se post ka id milega
  const [post, setPost] = useState(null)

  useEffect(() => {
    if (id) {
      appwriteService.GetPost(id).then((res) => {
        if (res) {
          setPost(res)
        } else {
          // agar post na mile to home bhej do
          router.push("/")
        }
      })
    }
  }, [id, router])

  return (
    <div className="w-full py-8 z-50 pt-30 pb-10">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
        {post ? (
          <PostForm post={post} />
        ) : (
          <p className="text-gray-500">Loading post...</p>
        )}
      </div>
    </div>
  )
}
