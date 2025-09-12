'use client'
import React, { useEffect, useState } from 'react'
import { Container, LogoutButton, Logo } from '..'
import Link from 'next/link'
import { login, logout } from "@/store/authSlice";
import authService from "@/appwrite/auth";
import { useSelector, useDispatch } from 'react-redux'
import { Menu, X, User, Home, PlusCircle, FileText, LogIn, UserPlus } from 'lucide-react'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    authService.getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login(user));
        } else {
          dispatch(logout());
        }
      })
      .catch(() => dispatch(logout()));
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      name: "Home",
      link: "/",
      active: true,
      icon: Home
    },
    {
      name: "Login",
      link: "/login",
      active: !authStatus,
      icon: LogIn
    },
    {
      name: "Signup",
      link: "/signup",
      active: !authStatus,
      icon: UserPlus
    },
    {
      name: "All posts",
      link: "/posts",
      active: authStatus,
      icon: FileText
    },
    {
      name: "Add posts",
      link: "/posts/add",
      active: authStatus,
      icon: PlusCircle
    }
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-lg border-b border-blue-500/20 shadow-lg shadow-blue-500/5' 
        : 'bg-gradient-to-r from-slate-900/80 via-gray-900/80 to-black/80 backdrop-blur-md'
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-cyan-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      <Container className="relative">
        <nav className='flex justify-between items-center py-4'>
          {/* Logo Section */}
          <div className='flex items-center'>
            <div className='mr-4'>
              <Link href="/" className="flex items-center space-x-2">
               
                <span className="sm:block text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent ">
                  My Blog
                </span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <ul className='hidden md:flex items-center gap-2'>
            {navItems.map((item) => 
              item.active && (
                <li key={item.name}>
                  <Link 
                    href={item.link} 
                    className="group flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 backdrop-blur-sm border border-transparent hover:border-blue-400/30 transition-all duration-300 hover:scale-105"
                  >
                    <item.icon size={18} className="group-hover:text-blue-400 transition-colors duration-300" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              )
            )}
            {authStatus && (
              <li>
                
                  <LogoutButton />
                
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2  rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/80 backdrop-blur-lg border-b border-blue-500/20 shadow-lg">
            <ul className='flex flex-col p-4 space-y-2'>
              {navItems.map((item) => 
                item.active && (
                  <li key={item.name}>
                    <Link 
                      href={item.link} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group z-50 flex items-center space-x-3 p-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 backdrop-blur-sm border border-transparent hover:border-blue-400/30 transition-all duration-300"
                    >
                      <item.icon size={18} className="group-hover:text-blue-400 transition-colors duration-300" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                )
              )}
              {authStatus && (
                <li className="pt-2 border-t border-white/5">
                  <div className="p-1 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-400/20">
                    <LogoutButton />
                  </div>
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>

      {/* Bottom gradient border */}
      <div className="h-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 opacity-50"></div>
    </header>
  )
}

export default Header