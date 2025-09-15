"use client";
import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "@/components";
import Link from "next/link";
import { Calendar, User, ArrowRight, Clock, Eye, TrendingUp, Sparkles } from "lucide-react";

function Home() {
  const [Posts, setPosts] = useState([]);
  const [latestPost, setLatestPost] = useState(null);
  const [otherPosts, setOtherPosts] = useState([]);

  useEffect(() => {
    appwriteService.GetPosts([]).then((posts) => {
      if (posts && posts.documents.length > 0) {
        const allPosts = posts.documents;
        // Sort posts by creation date (assuming $createdAt field exists)
        const sortedPosts = allPosts.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
        
        setLatestPost(sortedPosts[0]);
        setOtherPosts(sortedPosts.slice(1));
        setPosts(allPosts);
      }
    });
  }, []);

  if (Posts.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center relative ">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>

        <Container>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/20">
              <Sparkles className="text-white" size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-4">
              No Stories Yet
            </h1>
            <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
              Be the first to share your thoughts and inspire others. Your story could be the spark that ignites a community.
            </p>
            <Link 
              href="/posts/add"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
            >
              <span>Write Your First Post</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Hero Section */}
      {latestPost && (
        <div className="relative overflow-hidden">
          {/* Background Image/Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-blue-900/50 to-slate-900/90"></div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          <Container className="relative">
            <div className="py-20 lg:py-32">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                
                {/* Hero Content */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 text-blue-400">
                    <TrendingUp size={20} />
                    <span className="text-sm z-50 font-semibold uppercase tracking-wider">Latest Story</span>
                  </div>
                  
                  <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                    {latestPost.title}
                  </h1>
                  
                 <p className="text-xl text-gray-300 leading-relaxed line-clamp-3">
  {latestPost.content 
    ? latestPost.content.replace(/<[^>]+>/g, "").substring(0, 200) + "..."
    : "Discover this amazing story..."}
</p>


                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-6 text-gray-400">
                    <div className="flex items-center space-x-2">
                      <User size={16} />
                      <span>{latestPost.userId || "Anonymous"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>{new Date(latestPost.$createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} />
                      <span>5 min read</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col z-50 sm:flex-row gap-4 pt-4">
                    <a 
                      href={`/posts/${latestPost.$id}`}
                      className="group z-10 inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                    >
                      <span>Read Full Story</span>
                      <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
                    </a>
                    <Link 
                      href="/posts"
                      className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300"
                    >
                      <Eye size={20} />
                      <span>Browse All Posts</span>
                    </Link>
                  </div>
                </div>

                {/* Hero Visual */}
                <div className="relative">
                  <div className="relative bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
                    {/* Featured post preview card */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                          <User className="text-white" size={20} />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">Featured Article</h3>
                          <p className="text-gray-400 text-sm">Trending Now</p>
                        </div>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2 line-clamp-2">
                        {latestPost.title}
                      </h4>
                      <p className="text-gray-300 text-sm line-clamp-3">
                        {latestPost.content ? 
                          latestPost.content.replace(/<[^>]*>/g, '').substring(0, 150) + "..." : 
                          "An amazing story awaits..."
                        }
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">
                          Latest
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(latestPost.$createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-20 blur-xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full opacity-20 blur-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* Other Posts Section */}
      {otherPosts.length > 0 && (
        <div className="relative py-16">
          <Container>
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                More Stories
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Discover more amazing content from our community of writers and storytellers.
              </p>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <div key={post.$id} className="group">
                  {/* Enhanced PostCard Wrapper */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10">
                    <PostCard {...post} />
                  </div>
                </div>
              ))}
            </div>

            {/* View All Posts Button */}
            <div className="text-center mt-12">
              <Link 
                href="/posts"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-400/30 text-white font-semibold rounded-xl hover:from-blue-600/30 hover:to-cyan-600/30 hover:border-blue-400/50 transform hover:scale-105 transition-all duration-300"
              >
                <span>View All Posts</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </Container>
        </div>
      )}

      {/* Bottom decorative section */}
      <div className="relative py-16 border-t border-white/5">
        <Container>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Share Your Story?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community of writers and share your unique perspective with the world.
            </p>
            <Link 
              href="/posts/add"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
            >
              <Sparkles size={20} />
              <span>Create New Post</span>
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Home;