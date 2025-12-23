"use client";

import { BlogPost } from "@/types/blog";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLocalizedPost, getLocalizedCategory } from "@/lib/postUtils";
import { translations, postTranslations } from "@/lib/translations";

interface PostDetailProps {
  post: BlogPost;
}

export default function PostDetail({ post }: PostDetailProps) {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].blog;
  const localizedPost = getLocalizedPost(post, language);
  const localizedCategory = getLocalizedCategory(localizedPost.category, language);
  
  // 영어 내용이 있으면 사용, 없으면 한국어 내용 사용
  const postContent = language === "en" && postTranslations[post.id]?.content 
    ? postTranslations[post.id].content! 
    : post.content;

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

  // HTML 이스케이프 함수
  const escapeHtml = (text: string) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  };

  // Markdown을 간단하게 HTML로 변환
  const formatContent = (content: string) => {
    const lines = content.split("\n");
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let inList = false;
    const result: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // 코드 블록 처리
      if (trimmed.startsWith("```")) {
        if (inCodeBlock) {
          // 코드 블록 종료
          const escapedContent = escapeHtml(codeBlockContent.join("\n"));
          result.push(
            `<pre class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto my-4"><code class="text-sm font-mono text-gray-800 dark:text-gray-200">${escapedContent}</code></pre>`
          );
          codeBlockContent = [];
          inCodeBlock = false;
        } else {
          // 코드 블록 시작
          inCodeBlock = true;
          if (inList) {
            result.push("</ul>");
            inList = false;
          }
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      // 헤딩 처리
      if (trimmed.startsWith("# ")) {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        result.push(`<h1 class="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">${trimmed.slice(2)}</h1>`);
        continue;
      }
      if (trimmed.startsWith("## ")) {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        result.push(`<h2 class="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">${trimmed.slice(3)}</h2>`);
        continue;
      }
      if (trimmed.startsWith("### ")) {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        result.push(`<h3 class="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white">${trimmed.slice(4)}</h3>`);
        continue;
      }

      // 번호 리스트 처리 (1. 2. 3. 형식)
      const numberedListMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
      if (numberedListMatch) {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        const number = numberedListMatch[1];
        let listContent = numberedListMatch[2];
        // 인라인 코드 처리
        listContent = listContent.replace(
          /`([^`]+)`/g,
          '<code class="bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded text-sm font-mono text-red-700 dark:text-red-300">$1</code>'
        );
        result.push(`<div class="mb-3">
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">${number}. ${listContent}</h4>
        </div>`);
        continue;
      }

      // 리스트 처리 (하위 리스트)
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        if (!inList) {
          result.push('<ul class="list-disc list-inside mb-4 ml-6 space-y-1.5 text-gray-700 dark:text-gray-300">');
          inList = true;
        }
        let listContent = trimmed.slice(2);
        // 인라인 코드 처리
        listContent = listContent.replace(
          /`([^`]+)`/g,
          '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-blue-600 dark:text-blue-400">$1</code>'
        );
        result.push(`<li class="leading-relaxed">${listContent}</li>`);
        continue;
      }

      // 리스트 종료
      if (inList && trimmed === "") {
        result.push("</ul>");
        inList = false;
        continue;
      }

      // 이미지 처리 (마크다운 문법: ![alt](src))
      const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        const alt = imageMatch[1];
        const src = imageMatch[2];
        
        // 다음 줄이 캡션인지 확인 (괄호로 시작하는 경우, 빈 줄 건너뛰기)
        let caption = "";
        let captionIndex = -1;
        // 최대 3줄까지 확인 (빈 줄 포함)
        for (let j = i + 1; j < Math.min(i + 4, lines.length); j++) {
          const nextLine = lines[j].trim();
          if (nextLine.startsWith("(") && nextLine.endsWith(")")) {
            caption = nextLine.slice(1, -1); // 괄호 제거
            captionIndex = j;
            break;
          }
          if (nextLine !== "" && !nextLine.startsWith("(")) {
            // 빈 줄이 아니고 캡션이 아닌 다른 내용이면 중단
            break;
          }
        }
        
        if (caption && captionIndex > 0) {
          // 캡션이 있는 경우
          result.push(`<div class="my-6">
            <div class="rounded-lg overflow-hidden">
              <img 
                src="${src}" 
                alt="${alt}" 
                class="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <p class="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">${caption}</p>
          </div>`);
          // 캡션까지의 줄 건너뛰기
          i = captionIndex;
        } else {
          result.push(`<div class="my-6 rounded-lg overflow-hidden">
            <img 
              src="${src}" 
              alt="${alt}" 
              class="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>`);
        }
        continue;
      }

      // 빈 줄
      if (trimmed === "") {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        result.push("<br />");
        continue;
      }

      // 일반 텍스트
      if (inList) {
        result.push("</ul>");
        inList = false;
      }
      let textContent = line;
      // 인라인 코드 처리
      textContent = textContent.replace(
        /`([^`]+)`/g,
        '<code class="bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded text-sm font-mono text-red-700 dark:text-red-300">$1</code>'
      );
      result.push(`<p class="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">${textContent}</p>`);
    }

    // 마지막 리스트 닫기
    if (inList) {
      result.push("</ul>");
    }

    return result.join("");
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Weather Card Style Container */}
      <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-xl">
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-10`} />

        {/* Content */}
        <div className="relative p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getCategoryColor(localizedCategory)}`}>
                {localizedCategory}
              </span>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{localizedPost.readTime} {t.minutes}</span>
                </div>
                <span>•</span>
                <span>{formatDate(localizedPost.date)}</span>
              </div>
            </div>

            {/* Language Toggle - EN, KR 두 버튼 */}
            <div className="flex items-center gap-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg p-1 mb-4 w-fit">
              <button
                onClick={() => language !== "en" && toggleLanguage()}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  language === "en"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                aria-label="English"
              >
                EN
              </button>
              <button
                onClick={() => language !== "ko" && toggleLanguage()}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  language === "ko"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                aria-label="Korean"
              >
                KR
              </button>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {localizedPost.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {localizedPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-8" />

          {/* Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: formatContent(postContent) }}
          />
        </div>
      </div>
    </motion.article>
  );
}

