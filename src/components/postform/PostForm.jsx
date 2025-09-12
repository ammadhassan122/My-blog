"use client";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, Select, RTE } from ".."; // 🔹 Button ko hata diya test ke liye
import appwriteService from "../../appwrite/config";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const router = useRouter();
  const userData = useSelector((state) => state.auth.user);

  const submit = async (data) => {
    try {
      console.log("🚀 SUBMIT TRIGGERED");
      console.log("📩 Form Data:", data);

      let fileId = post?.featuredImage;

      // Upload new file if provided
      if (data.featuredImage && data.featuredImage[0]) {
        const file = await appwriteService.UploadFile(data.featuredImage[0]);
        if (file) {
          fileId = file.$id;
          if (post?.featuredImage) {
            await appwriteService.deleteFile(post.featuredImage);
          }
        }
      }

      let dbPost;

      if (post) {
        dbPost = await appwriteService.UpdatePost(post.$id, {
          ...data,
          userID: userData.$id,
          featuredImage: fileId,
        });
        console.log("✅ Update Response:", dbPost);
      } else {
        dbPost = await appwriteService.CreatePost({
          ...data,
          featuredImage: fileId,
          userID: userData?.$id,
        });
        console.log("✅ Create Response:", dbPost);
      }

      if (dbPost) {
        router.push(`/posts`); // 🔹 apne folder structure ke hisaab se adjust karna
      } else {
        console.error("❌ Post not created/updated.");
      }
    } catch (error) {
      console.error("🔥 Error in submit:", error);
    }
  };

  // Slug auto-generate from title
  const SlugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .toLowerCase()
        .trim()
        .replace(/[^\w-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
    return value;
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", SlugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, SlugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      {/* Title */}
      <div className="w-2/3 px-2">
        <Input
          label="Title"
          placeholder="Enter title"
          className="mb-4"
          {...register("title", { required: true })}
        />
      </div>

      {/* Slug */}
      <div className="w-1/3 px-2">
        <Input
          label="Slug"
          placeholder="post-slug"
          className="mb-4"
          {...register("slug", { required: true })}
        />
      </div>

      {/* Featured Image */}
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          {...register("featuredImage")}
        />
      </div>

      {/* Status */}
      <div className="w-1/3 px-2">
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
      </div>

      {/* Content */}
      <div className="w-full px-2">
        <RTE
          control={control}
          name="content"
          label="Content"
          defaultValue={getValues("content")}
          onChange={(value) => setValue("content", value)}
        />
      </div>

      {/* Submit */}
      <div className="w-full px-2 mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
        >
          {post ? "Update Post" : "Create Post"}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
