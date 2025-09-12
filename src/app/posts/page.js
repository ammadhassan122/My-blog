'use client'
import React,{useState,useEffect} from 'react'
import { Container,PostCard } from '@/components'
import appwriteService from '../../appwrite/config'
function AllPosts() {

    const[posts,setPosts] = useState([]);
    useEffect (() => {
        appwriteService.GetPosts([]).then((posts) => {
            if(posts){
                setPosts(posts.documents);
            }
        })
    },[])
  return (
    <div className='w-full h-screen z-30 pt-30 py-8'>
        <Container>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
                {posts.map((post) => (
                    <PostCard className='w-full text-black' key={post.$id} {...post}/>
                ))}
            </div>
        </Container>

    </div>
  )
}

export default AllPosts