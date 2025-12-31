'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface PostContent {
  title: string
  description: string
}

interface Post {
  slug: string
  tags: string[]
  date: string
  readTime: string
  views: number
  isDraft?: boolean
  kr: PostContent
  en: PostContent
}

export const allPosts: Post[] = [
  {
    slug: 'apache-ambari-hadoop-heap-memory-issue',
    tags: ['Hadoop', 'Spark', 'Hive'],
    date: 'January 15, 2024',
    readTime: '5 min read',
    views: 0,
    isDraft: false,
    kr: {
      title: 'Apache Ambari Hadoop서비스에서 겪었던 문제 & 해결 review - Heap 메모리 부족',
      description: 'Apache Ambari Hadoop 환경에서 1GB 이상의 쿼리를 처리할 때 발생한 Heap 메모리 부족 문제와 해결 방법에 대한 리뷰입니다.'
    },
    en: {
      title: 'Apache Ambari Hadoop Service Issues & Solutions Review - Heap Memory Insufficiency',
      description: 'A review of Heap memory insufficiency issues and solutions that occurred when processing queries over 1GB in an Apache Ambari Hadoop environment.'
    }
  }
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'views'>('newest')
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

  const filteredPosts = allPosts.filter(post => {
    if (post.isDraft) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const content = language === 'kr' ? post.kr : post.en
      return (
        content.title.toLowerCase().includes(query) ||
        content.description.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }
    return true
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortBy === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    } else {
      return b.views - a.views
    }
  })

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* Header */}
      <h1 className="text-5xl font-serif font-bold mb-8 text-gray-900 dark:text-white">my blog.</h1>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search something..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pr-24 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <button
          onClick={() => setSearchQuery('')}
          disabled={!searchQuery}
          className={`absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition ${
            searchQuery
              ? 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer'
              : 'text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-gray-900 cursor-not-allowed opacity-50'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear
        </button>
      </div>

      {/* Filters */}
      <div className="flex justify-end mb-8">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          <span className="text-sm text-gray-700 dark:text-gray-300">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'views')}
            className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="views">Most Views</option>
          </select>
        </div>
      </div>

      {/* Blog Posts List */}
      <div className="space-y-6">
        {sortedPosts.map((post, index) => {
          const content = language === 'kr' ? post.kr : post.en
          return (
            <Link
              key={index}
              href={`/blog/${post.slug}`}
              className="block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{content.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{content.description}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-md"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-md">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {post.date}
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readTime}
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {post.views} views
              </div>
            </div>
          </Link>
          )
        })}
      </div>

      {sortedPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No posts found.</p>
        </div>
      )}
    </div>
  )
}
