'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import WorkTimeline from '@/components/WorkTimeline'
import FeaturedProjects from '@/components/FeaturedProjects'
import RecentPosts from '@/components/RecentPosts'
import SwipeCard from '@/components/SwipeCard'

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [language, setLanguage] = useState<'kr' | 'en'>('kr')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem('language') as 'kr' | 'en' | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    const handleStorageChange = () => {
      const savedLanguage = localStorage.getItem('language') as 'kr' | 'en' | null
      if (savedLanguage) {
        setLanguage(savedLanguage)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('languageChange', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('languageChange', handleStorageChange)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  if (!mounted) {
    return null
  }

  const content = {
    kr: {
      hero: {
        greeting: 'hi hyo here. 👋',
        location: 'Software engineer from South Korea 🇰🇷',
        description: '게임 산업에서 데이터 검증, 설계, 분석 및 ETL 파이프라인 개발 경험을 보유하고 있습니다. 게임 특성에 최적화된 데이터 아키텍처 설계에 능숙하며, 국내외 게임 스튜디오와의 강력한 협업 능력을 갖추고 있습니다.'
      },
      sections: {
        featuredProjects: 'featured projects',
        viewMore: 'view more',
        recentPosts: 'recent posts'
      }
    },
    en: {
      hero: {
        greeting: 'hi hyo here. 👋',
        location: 'Software engineer from South Korea 🇰🇷',
        description: 'Experience in the gaming industry with data validation, design, analysis, and ETL pipeline development. Skilled in data architecture design optimized for game-specific characteristics, with strong collaboration capabilities with domestic and international game studios.'
      },
      sections: {
        featuredProjects: 'featured projects',
        viewMore: 'view more',
        recentPosts: 'recent posts'
      }
    }
  }

  const t = content[language]
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-6 text-gray-900 dark:text-white">
              {t.hero.greeting}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              {t.hero.location}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              {t.hero.description}
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Resume
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md shadow-lg z-10">
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Resume
                    </a>
                    <a
                      href="/portfolio.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Portfolio
                    </a>
                  </div>
                )}
              </div>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-1.004-.013-1.845-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="mailto:contact@example.com"
                className="p-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                aria-label="Email"
              >
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto md:ml-auto">
            <SwipeCard />
          </div>
        </div>
      </section>

      {/* Work & Education Timeline */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <WorkTimeline />
      </section>

      {/* Featured Projects */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.sections.featuredProjects}</h2>
          <Link href="/projects" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
            {t.sections.viewMore}
          </Link>
        </div>
        <FeaturedProjects />
      </section>

      {/* Recent Posts */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.sections.recentPosts}</h2>
          <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
            {t.sections.viewMore}
          </Link>
        </div>
        <RecentPosts />
      </section>
    </div>
  )
}

