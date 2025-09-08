"use client"

import { useState, useEffect, useRef } from "react"
import { SearchBar } from "../Components/SearchBar"
import { useLanguage, Language } from "../Components/LanguageContext"

interface Message {
  text: string;
  isUser: boolean;
}

const ChatPage = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { language, setLanguage, t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const languages: Language[] = ["English", "Urdu"]

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const handleSelect = (lang: Language): void => {
    setLanguage(lang)
    setOpen(false)
  }

  const handleSearch = async (searchTerm: string) => {
    setMessages(prev => [...prev, { text: searchTerm, isUser: true }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: searchTerm })
      });

      const data = await res.json();
      setMessages(prev => [...prev, { text: data.botMessage, isUser: false }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble responding right now. Please try again.", isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-4xl h-[85vh] rounded-2xl bg-white shadow-xl overflow-hidden flex flex-col">
        
        {/* Header with Language Selector */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 flex items-center justify-between relative">
          <div className="flex items-center">
            <div className="text-xl font-bold mr-4">AI Chat</div>
            
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-sm transition-colors"
              >
                <span>{t.selectLanguage}</span>
                <i className={`ri-arrow-down-s-fill transition-transform ${open ? 'rotate-180' : ''}`}></i>
              </button>

              {open && (
                <div className="absolute top-full left-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-200 z-50 overflow-hidden">
                  <ul className="py-1">
                    {languages
                      .filter((lang) => lang !== language)
                      .map((lang) => (
                        <li
                          key={lang}
                          onClick={() => handleSelect(lang)}
                          className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-gray-800 text-sm transition-colors"
                        >
                          {lang}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="text-sm bg-blue-800 px-3 py-1 rounded-full">
            {t.version}
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
            {/* Welcome Message */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <i className="ri-robot-line text-white text-sm"></i>
              </div>
              <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm max-w-[80%]">
                <p className="text-gray-800">{t.welcome}</p>
              </div>
            </div>

            {/* Messages */}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <i className="ri-robot-line text-white text-sm"></i>
                  </div>
                )}
                
                <div
                  className={`rounded-2xl p-4 max-w-[80%] ${
                    message.isUser 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-none' 
                      : 'bg-white shadow-sm rounded-tl-none'
                  }`}
                >
                  <p className="break-words">{message.text}</p>
                </div>
                
                {message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <i className="ri-user-line text-gray-700 text-sm"></i>
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                  <i className="ri-robot-line text-white text-sm"></i>
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="text-gray-600 text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Search Bar */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage;