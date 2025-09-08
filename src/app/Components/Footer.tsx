"use client"

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-1 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <p className="text-xs opacity-90">
              Quality web solutions for modern businesses
            </p>
          </div>
          
          <div className="text-xs font-medium opacity-90">
            Developed by Ali Huzaifa Karimi 2025 - Next.js and TypeScript
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer