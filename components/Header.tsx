"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export default function Header() {
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].blog;

  return (
    <header className="w-full py-8 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Language Toggle, Search, About 링크 - 오른쪽 위 */}
        <div className="flex justify-end items-center gap-4 mb-4">
          {/* Language Toggle - EN, KR 두 버튼 */}
          <div className="flex items-center gap-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg p-1">
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
          
          <Link
            href="/search"
            className={`text-sm font-medium transition-colors ${
              pathname === "/search"
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            {t.search}
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors ${
              isAboutPage
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            {t.about}
          </Link>
        </div>
        
        <Link href="/" className="block cursor-pointer group">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {t.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {t.subtitle}
          </p>
        </Link>
      </div>
    </header>
  );
}

