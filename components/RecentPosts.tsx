'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { allPosts } from '@/app/blog/page'

export default function RecentPosts() {
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

  if (!mounted) {
    return null
  }

  // 최신 포스트 3개만 표시
  const recentPosts = allPosts
    .filter(post => !post.isDraft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  return (
    <div className="space-y-6">
      {recentPosts.map((post, index) => {
        const content = language === 'kr' ? post.kr : post.en
        return (
        <Link
          key={index}
          href={`/blog/${post.slug}`}
          className="block border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition"
        >
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{content.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{content.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-500">
            {post.date} · {post.readTime} · {post.views} views
          </div>
        </Link>
        )
      })}
    </div>
  )
}

