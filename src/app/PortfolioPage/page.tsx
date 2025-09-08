/* eslint-disable react/no-unescaped-entities */
"use client"

import Link from "next/link"

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Ali Huzaifa Karimi</h1>
          <p className="text-lg text-gray-600">Full Stack Developer</p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
              AH
            </div>
            <p className="text-gray-500 text-center">Passionate about creating digital solutions</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">About Me</h2>
            <p className="text-gray-600">
              I'm a Full Stack Developer with expertise in modern web technologies. I enjoy building 
              responsive, user-friendly applications that solve real-world problems.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">What I Do</h2>
            <p className="text-gray-600">
              I develop full-stack web applications using technologies like Next.js, React, Node.js, 
              and various databases. I focus on creating clean, efficient code and intuitive user experiences.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">My Approach</h2>
            <p className="text-gray-600">
              I believe in continuous learning and staying updated with the latest technologies. 
              Every project is an opportunity to grow and improve my skills.
            </p>
          </div>
        </div>

        {/* Simple Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2025 Ali Huzaifa Karimi. All rights reserved.</p>
        </div>

        {/* Back to Chat Link */}
        <div className="text-center mt-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Back to Chat
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AboutPage