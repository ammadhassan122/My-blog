import { Footer, Header } from "@/components";
import "./globals.css";
import Providers from "@/store/Providers"; // <-- client provider import

export const metadata = {
  title: "My Blog",
  description: "Next.js + Redux setup",
  icons: {
    icon: "/favicon.ico", // public folder se automatically load hoga
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black antialiased">
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative">
          
          {/* Global Grid Pattern Overlay */}
          <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>
          
          {/* Optional: Animated background elements for depth */}
          <div className="fixed inset-0 opacity-5 pointer-events-none z-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
          </div>
          
          {/* Content wrapper with relative positioning */}
          <div className="relative z-10"></div>
        <Providers>
          <Header/>
          {children}
          
          <Footer/>
          </Providers>
          </div>
          
      </body>
    </html>
  );
}
