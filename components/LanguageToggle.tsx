'use client'

import { useEffect, useState } from 'react'

export default function LanguageToggle() {
  const [language, setLanguage] = useState<'kr' | 'en'>('kr')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('language') as 'kr' | 'en' | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === 'kr' ? 'en' : 'kr'
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('languageChange'))
  }

  if (!mounted) {
    return (
      <button className="p-2 rounded-md text-gray-700 dark:text-gray-300">
        <span className="text-sm font-medium">KR</span>
      </button>
    )
  }

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      aria-label="Toggle language"
    >
      <span className="text-sm font-medium">{language === 'kr' ? 'KR' : 'EN'}</span>
    </button>
  )
}

