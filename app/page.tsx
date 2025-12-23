"use client";

import { samplePosts, BlogPost } from "@/types/blog";
import BlogGrid from "@/components/BlogGrid";
import Header from "@/components/Header";
import SortDropdown from "@/components/SortDropdown";
import CategoryFilter from "@/components/CategoryFilter";
import { useMemo, useState } from "react";

type SortOption = "latest" | "popular";
type Category = "all" | "기술" | "튜토리얼" | "디자인" | "생각";

export default function Home() {
  const [sortOption, setSortOption] = useState<SortOption>("latest");
  const [categoryFilter, setCategoryFilter] = useState<Category>("all");

  // 필터링 및 정렬된 포스트
  const filteredAndSortedPosts = useMemo(() => {
    let posts = [...samplePosts];
    
    // 카테고리 필터링
    if (categoryFilter !== "all") {
      posts = posts.filter((post) => post.category === categoryFilter);
    }
    
    // 정렬
    if (sortOption === "latest") {
      // 최신순: 날짜 내림차순
      return posts.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });
    } else {
      // 인기순: 시청시간(readTime) 내림차순
      return posts.sort((a, b) => b.readTime - a.readTime);
    }
  }, [sortOption, categoryFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto py-8">
        <Header />
        <main className="mt-8">
          {/* 필터 및 정렬 드롭다운 - 오른쪽 상단 */}
          <div className="flex justify-end gap-3 mb-6 px-4 sm:px-6 lg:px-8">
            <CategoryFilter value={categoryFilter} onChange={setCategoryFilter} />
            <SortDropdown value={sortOption} onChange={setSortOption} />
          </div>
          <BlogGrid posts={filteredAndSortedPosts} />
        </main>
      </div>
    </div>
  );
}
