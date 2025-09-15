"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { useSelector } from "react-redux"
import parse from "html-react-parser"
import Image from "next/image"
import appwriteService from "@/appwrite/config"
import { Button, Container } from "@/components"

export default function PostPage() {
  const [post, setPost] = useState(null)
  const router = useRouter()
  const params = useParams()
  const { id } = params
  const userData = useSelector((state) => state.auth.user)
  const isAuthor = post && userData ? post.userID === userData.$id : false

  useEffect(() => {
    if (id) {
      appwriteService.GetPost(id).then((res) => {
        if (res) setPost(res)
        else router.push("/")
      })
    } else {
      router.push("/")
    }
  }, [id, router])

  const deletePost = () => {
    appwriteService.DeletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage)
        router.push("/")
      }
    })
  }

  const imageSrc = post?.featuredImage
    ? appwriteService.getFilePreview(post.featuredImage)
    : undefined

  return post ? (
    <div className="py-8 pt-25 pb-10 text-white">
      <Container>
     <div className="w-full mb-4 border rounded-xl overflow-hidden relative">
  {imageSrc && (
    <Image
      src={imageSrc}
      alt={post.title}
      width={800}
      height={400}
      unoptimized
      className="rounded-xl w-full h-auto object-cover"
      sizes="(max-width: 768px) 100vw, 
             (max-width: 1200px) 80vw, 
             1200px"
      priority
    />
  )}

  {isAuthor && (
    <div className="absolute right-2 top-2 sm:right-4 sm:top-4 flex gap-2">
  <Link href={`/posts/${post.$id}/edit`}>
    <Button
      bgColor="bg-transparent backdrop-blur-sm border border-white/50"
      className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2 rounded-lg"
    >
      Edit
    </Button>
  </Link>

  <Button
    bgColor="bg-slate-500"
    onClick={deletePost}
    className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2 rounded-lg"
  >
    Delete
  </Button>
</div>

  )}
</div>


        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>

        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null
}
