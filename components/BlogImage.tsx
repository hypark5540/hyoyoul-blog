'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface BlogImageProps {
  src: string
  alt: string
}

export default function BlogImage({ src, alt }: BlogImageProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative mb-8 group overflow-hidden rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={src} target="_blank" rel="noopener noreferrer">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="w-full h-auto cursor-pointer transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      
      {/* Hover overlay with actions */}
      <div 
        className={`absolute inset-0 bg-black/0 transition-all duration-200 flex items-center justify-center ${
          isHovered ? 'bg-black/40 opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex gap-4">
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white rounded-md text-sm font-medium hover:bg-white dark:hover:bg-gray-900 transition shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            View full size
          </a>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white rounded-md text-sm font-medium hover:bg-white dark:hover:bg-gray-900 transition shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            Open in new tab
          </a>
        </div>
      </div>
    </div>
  )
}

