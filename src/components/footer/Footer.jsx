"use client";
import React from 'react';
import { Heart, Github, Twitter, Linkedin, Mail, ArrowUp } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Main footer content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                My Blog
              </h3>
              <p className="text-gray-300 mt-3 text-lg leading-relaxed">
                Where stories come alive. Share your thoughts, connect with readers, 
                and build your digital presence with our modern blogging platform.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Github, href: 'https://github.com/ammadhassan122', label: 'GitHub' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/ammad-hassan-7b424b375/', label: 'LinkedIn' },
                { icon: Mail, href: 'ammadhassan2o3@gmail.com', label: 'Email' }
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href} 
                  className="group p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon size={20} className="group-hover:text-blue-400 transition-colors duration-300" />
                </Link>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-cyan-300">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'All Posts', 'Categories', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-cyan-300">Resources</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Support', 'Documentation', 'API'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Newsletter Section */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-emerald-500/10 backdrop-blur-sm border border-white/5">
          <div className="max-w-2xl">
            <h4 className="text-2xl font-bold mb-3 text-cyan-300">Stay Updated</h4>
            <p className="text-gray-300 mb-6">Get the latest posts and updates delivered straight to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="relative border-t border-white/5 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Made with</span>
              <Heart size={16} className="text-red-400 animate-pulse" />
              <span>© 2024 BlogSpace. All rights reserved.</span>
            </div>
            
            <button
              onClick={scrollToTop}
              className="mt-4 md:mt-0 group p-3 rounded-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-110"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} className="group-hover:text-blue-400 transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom border */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500"></div>
    </footer>
  );
};

export default Footer;