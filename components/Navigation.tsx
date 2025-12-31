'use client'

import Link from 'next/link'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import ChatWidget from './ChatWidget'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="hidden md:flex space-x-8 items-center">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
                home
              </Link>
              <Link href="/projects" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
                projects
              </Link>
              <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
                blog
              </Link>
              <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
                contact
              </Link>
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
              <LanguageToggle />
              <ThemeToggle />
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <LanguageToggle />
              <ThemeToggle />
              <button
                className="text-gray-700 dark:text-gray-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <Link href="/" className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                home
              </Link>
              <Link href="/projects" className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                projects
              </Link>
              <Link href="/blog" className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                blog
              </Link>
              <Link href="/contact" className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                contact
              </Link>
            </div>
          )}
        </div>
      </nav>
      <ChatWidget />
    </>
  )
}

