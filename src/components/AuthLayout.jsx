'use client'
import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
export default function Protected({children,authentication=true}) {
    const router = useRouter();
    const [loader,setLoader] = useState(true);
    const authStatus =useSelector(state=>state.auth.status);
    
    useEffect(() => {
  if (authentication && !authStatus) {
    router.push("/login");
  } else if (!authentication && authStatus) {
    router.push("/");
  } else {
    setLoader(false);
  }
}, [authStatus, authentication, router]);



  return loader ? <h1>Loading..</h1> :<>{children}</>
    
  
}

