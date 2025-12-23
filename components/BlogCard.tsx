"use client";

import { BlogPost } from "@/types/blog";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLocalizedPost, getLocalizedCategory } from "@/lib/postUtils";
import { translations } from "@/lib/translations";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const { language } = useLanguage();
  const t = translations[language].blog;
  const localizedPost = getLocalizedPost(post, language);
  const localizedCategory = getLocalizedCategory(localizedPost.category, language);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "ko" ? "ko-KR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      기술: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
      Technology: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
      튜토리얼: "bg-purple-500/20 text-purple-700 dark:text-purple-300",
      Tutorial: "bg-purple-500/20 text-purple-700 dark:text-purple-300",
      디자인: "bg-pink-500/20 text-pink-700 dark:text-pink-300",
      Design: "bg-pink-500/20 text-pink-700 dark:text-pink-300",
      생각: "bg-green-500/20 text-green-700 dark:text-green-300",
      Thoughts: "bg-green-500/20 text-green-700 dark:text-green-300",
    };
    return colors[category] || "bg-gray-500/20 text-gray-700 dark:text-gray-300";
  };

  return (
    <Link href={`/posts/${post.id}`} className="block">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className="group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-full"
      >
      {/* Gradient Background (Weather Card Style) */}
      <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
      
      {/* Content */}
      <div className="relative p-6 h-full flex flex-col">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(localizedCategory)}`}>
            {localizedCategory}
          </span>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{localizedPost.readTime} {t.minutes}</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          {localizedPost.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
          {localizedPost.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {localizedPost.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Date */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(post.date)}
          </span>
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.article>
    </Link>
  );
}

