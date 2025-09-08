"use client"
import { createContext, useContext, useState, ReactNode } from "react"


export const translations = {
  English: {
    title: "ChatterBox_",
    welcome: "Welcome to ChatterBox 👋",
    selectLanguage: "Select Language",
    version: "v-1.123"
  },
  Urdu: {
    title: "چیٹر باکس_",
    welcome: "چیٹر باکس میں خوش آمدید 👋",
    selectLanguage: "زبان منتخب کریں",
    version: "ورژن-1.123"
  }
}


export type Language = keyof typeof translations

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations[Language]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("English")
  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}