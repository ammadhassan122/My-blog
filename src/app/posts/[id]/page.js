"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { useSelector } from "react-redux"
import parse from "html-react-parser"
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
  : undefined;



  return post ? (
    <div className="py-8 pt-25 pb-10 text-white">
      <Container>
        <div className="w-full max-h-150 object-cover p-0 m-0 flex justify-center mb-4 relative border rounded-xl ">
          {imageSrc && (
  <img
    src={imageSrc}
    alt={post.title}
    className="rounded-xl h-auto w-full block object-cover "
  />
)}

          {isAuthor && (
            <div className="absolute  right-6 top-6">
              <Link href={`/posts/${post.$id}/edit`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
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
