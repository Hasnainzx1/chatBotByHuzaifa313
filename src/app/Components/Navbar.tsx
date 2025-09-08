"use client"
import { useState } from "react"
import { useLanguage } from "./LanguageContext"
import Link from "next/link"

const Navbar = () => {
  const [likeClicked, setLikeClicked] = useState<boolean | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { t } = useLanguage()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <>
      <nav className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0 flex items-center">
              <div className="text-2xl font-bold text-white tracking-tight">
                {t.title}
              </div>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <Link 
                  href="/" 
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  Home
                </Link>
                <Link 
                  href="/PortfolioPage" 
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  More
                </Link>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Feedback Buttons */}
              <div className="flex bg-blue-800 p-1 rounded-lg">
                <button
                  onClick={() => setLikeClicked(true)}
                  className={`p-2 rounded-md transition-all duration-200 ${likeClicked === true 
                    ? "bg-green-500 text-white shadow-md" 
                    : "text-blue-200 hover:bg-blue-700 hover:text-white"}`}
                  aria-label="Like"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                </button>
                
                <div className="mx-1 border-r border-blue-600"></div>
                
                <button
                  onClick={() => setLikeClicked(false)}
                  className={`p-2 rounded-md transition-all duration-200 ${likeClicked === false 
                    ? "bg-red-500 text-white shadow-md" 
                    : "text-blue-200 hover:bg-blue-700 hover:text-white"}`}
                  aria-label="Dislike"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                  </svg>
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button 
                  onClick={toggleSidebar}
                  className="text-blue-200 hover:text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
                  aria-label="Open menu"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={closeSidebar}
        ></div>
        
        {/* Sidebar Panel */}
        <div className={`absolute right-0 top-0 h-full w-64 bg-gradient-to-b from-blue-700 to-indigo-800 shadow-xl transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button
                onClick={closeSidebar}
                className="text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              <Link 
                href="/" 
                className="block text-white hover:bg-blue-600 px-4 py-3 rounded-md text-base font-medium transition-colors"
                onClick={closeSidebar}
              >
                Home
              </Link>
              <Link 
                href="/PortfolioPage" 
                className="block text-white hover:bg-blue-600 px-4 py-3 rounded-md text-base font-medium transition-colors"
                onClick={closeSidebar}
              >
                More
              </Link>
           
            </nav>

            {/* Footer in sidebar */}
            <div className="p-4 border-t border-blue-600">
              <div className="text-blue-200 text-sm text-center">
                Developed by Ali Huzaifa
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar