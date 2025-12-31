"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { samplePosts, BlogPost } from "@/types/blog";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // 검색어에서 자동완성 제안 추출
  const autocompleteSuggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];

    const query = searchQuery.toLowerCase();
    const suggestions = new Set<string>();

    // 제목에서 매칭
    samplePosts.forEach((post) => {
      const words = post.title.toLowerCase().split(/\s+/);
      words.forEach((word) => {
        if (word.startsWith(query) && word.length > query.length) {
          suggestions.add(word);
        }
      });
    });

    // 태그에서 매칭
    samplePosts.forEach((post) => {
      post.tags.forEach((tag) => {
        const tagLower = tag.toLowerCase();
        if (tagLower.includes(query) && tagLower !== query) {
          suggestions.add(tag);
        }
      });
    });

    // 카테고리에서 매칭
    samplePosts.forEach((post) => {
      const categoryLower = post.category.toLowerCase();
      if (categoryLower.includes(query) && categoryLower !== query) {
        suggestions.add(post.category);
      }
    });

    return Array.from(suggestions).slice(0, 5);
  }, [searchQuery]);

  // 검색 결과 필터링
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return samplePosts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(query);
      const excerptMatch = post.excerpt.toLowerCase().includes(query);
      const contentMatch = post.content.toLowerCase().includes(query);
      const tagMatch = post.tags.some((tag) =>
        tag.toLowerCase().includes(query)
      );
      const categoryMatch = post.category.toLowerCase().includes(query);

      return titleMatch || excerptMatch || contentMatch || tagMatch || categoryMatch;
    });
  }, [searchQuery]);

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < autocompleteSuggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        setSearchQuery(autocompleteSuggestions[selectedIndex]);
        setSelectedIndex(-1);
        setIsFocused(false);
        searchInputRef.current?.blur();
      } else if (e.key === "Escape") {
        setIsFocused(false);
        setSelectedIndex(-1);
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, autocompleteSuggestions, selectedIndex]);

  // 하이라이트 함수
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark
              key={index}
              className="bg-yellow-200 dark:bg-yellow-800 text-gray-900 dark:text-white px-1 rounded"
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setIsFocused(false);
    setSelectedIndex(-1);
    searchInputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto py-8">
        <Header />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>목록으로 돌아가기</span>
        </Link>

        {/* Search Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedIndex(-1);
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                // 클릭 이벤트가 처리된 후에 blur 처리
                setTimeout(() => setIsFocused(false), 200);
              }}
              placeholder="검색어를 입력하세요..."
              className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedIndex(-1);
                  searchInputRef.current?.focus();
                }}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <svg
                  className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Autocomplete Suggestions */}
          <AnimatePresence>
            {isFocused &&
              autocompleteSuggestions.length > 0 &&
              searchQuery.length >= 2 && (
                <motion.div
                  ref={suggestionsRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-50 w-full mt-2 rounded-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden"
                >
                  {autocompleteSuggestions.map((suggestion, index) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`w-full text-left px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors ${
                        index === selectedIndex
                          ? "bg-blue-100 dark:bg-gray-800"
                          : ""
                      } ${index !== autocompleteSuggestions.length - 1 ? "border-b border-gray-200 dark:border-gray-700" : ""}`}
                    >
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">
                          {highlightText(suggestion, searchQuery)}
                        </span>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
          </AnimatePresence>
        </motion.div>

        {/* Search Results */}
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              {searchResults.length > 0
                ? `${searchResults.length}개의 결과를 찾았습니다`
                : "검색 결과가 없습니다"}
            </div>

            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((post, index) => (
                  <SearchResultCard
                    key={post.id}
                    post={post}
                    query={searchQuery}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p className="text-lg">검색 결과가 없습니다</p>
                <p className="text-sm mt-2">다른 검색어를 시도해보세요</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Empty State */}
        {!searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-gray-600 dark:text-gray-400">
              검색어를 입력하여 포스트를 찾아보세요
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              제목, 내용, 태그, 카테고리로 검색할 수 있습니다
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Search Result Card Component
function SearchResultCard({
  post,
  query,
  index,
}: {
  post: BlogPost;
  query: string;
  index: number;
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      기술: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
      튜토리얼: "bg-purple-500/20 text-purple-700 dark:text-purple-300",
      디자인: "bg-pink-500/20 text-pink-700 dark:text-pink-300",
      생각: "bg-green-500/20 text-green-700 dark:text-green-300",
    };
    return colors[category] || "bg-gray-500/20 text-gray-700 dark:text-gray-300";
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark
              key={i}
              className="bg-yellow-200 dark:bg-yellow-800 text-gray-900 dark:text-white px-1 rounded"
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <Link href={`/posts/${post.id}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
        
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{post.readTime}분</span>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {highlightText(post.title, query)}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {highlightText(post.excerpt, query)}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              >
                #{highlightText(tag, query)}
              </span>
            ))}
          </div>

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






