"use client";

import { BlogPost } from "@/types/blog";
import BlogCard from "./BlogCard";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

interface BlogGridProps {
  posts: BlogPost[];
}

const CARDS_PER_PAGE = 6;

export default function BlogGrid({ posts }: BlogGridProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(posts.length / CARDS_PER_PAGE);
  const startIndex = currentPage * CARDS_PER_PAGE;
  const endIndex = startIndex + CARDS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      } else if (e.key === "ArrowRight" && currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentPage, totalPages]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const velocityThreshold = 500;
    
    // 속도 기반 스와이프 감지 (더 자연스러운 스와이프)
    if (Math.abs(info.velocity.x) > velocityThreshold) {
      if (info.velocity.x > 0 && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      } else if (info.velocity.x < 0 && currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1);
      }
    } 
    // 거리 기반 스와이프 감지
    else if (Math.abs(info.offset.x) > swipeThreshold) {
      if (info.offset.x > swipeThreshold && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      } else if (info.offset.x < -swipeThreshold && currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  if (posts.length === 0) {
    return <div className="text-center text-gray-500 py-12">포스트가 없습니다.</div>;
  }

  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      {/* 슬라이더 컨테이너 */}
      <div className="relative overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          className="cursor-grab active:cursor-grabbing select-none"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentPosts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 네비게이션 버튼 */}
      {totalPages > 1 && (
        <>
          {/* 이전 버튼 */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
            className={`absolute left-2 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-8 z-10 p-2 md:p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 ${
              currentPage === 0
                ? "opacity-30 cursor-not-allowed"
                : "opacity-100 hover:scale-110 cursor-pointer"
            }`}
            aria-label="이전 페이지"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300"
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
          </button>

          {/* 다음 버튼 */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className={`absolute right-2 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-8 z-10 p-2 md:p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 ${
              currentPage === totalPages - 1
                ? "opacity-30 cursor-not-allowed"
                : "opacity-100 hover:scale-110 cursor-pointer"
            }`}
            aria-label="다음 페이지"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* 페이지 인디케이터 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`transition-all duration-200 rounded-full ${
                index === currentPage
                  ? "w-8 h-2 bg-blue-600 dark:bg-blue-400"
                  : "w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
              aria-label={`페이지 ${index + 1}로 이동`}
            />
          ))}
        </div>
      )}

      {/* 페이지 정보 */}
      {totalPages > 1 && (
        <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
          {currentPage + 1} / {totalPages}
        </div>
      )}
    </div>
  );
}

