"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export default function AboutPage() {
  const { language } = useLanguage();
  const t = translations[language];
  
  const formatContent = (content: string) => {
    return content
      .split("\n")
      .map((line, index) => {
        const trimmed = line.trim();

        // 헤딩 처리
        if (trimmed.startsWith("# ")) {
          return `<h1 class="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">${trimmed.slice(2)}</h1>`;
        }
        if (trimmed.startsWith("## ")) {
          return `<h2 class="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">${trimmed.slice(3)}</h2>`;
        }
        if (trimmed.startsWith("### ")) {
          const headingText = trimmed.slice(4);
          // KRAFTON Inc. 또는 Bluehole 섹션에 로고 추가
          if (headingText.includes("KRAFTON Inc.") || headingText.includes("KRAFTON")) {
            return `<div class="flex items-center justify-between mt-4 mb-2">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">${headingText}</h3>
              <div class="flex-shrink-0 ml-4">
                <img 
                  src="/krafton-logo.png" 
                  alt="KRAFTON Inc. Logo" 
                  class="h-16 w-auto md:h-20 object-contain"
                  loading="lazy"
                />
              </div>
            </div>`;
          }
          if (headingText.includes("Bluehole")) {
            return `<div class="mt-4 mb-2">
              <div class="mb-4 rounded-lg overflow-hidden">
                <img 
                  src="/games-collage.jpg" 
                  alt="Games Collage" 
                  class="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">${headingText}</h3>
                <div class="flex-shrink-0 ml-4">
                  <img 
                    src="/bluehole-logo.png" 
                    alt="Bluehole Logo" 
                    class="h-16 w-auto md:h-20 object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>`;
          }
          return `<h3 class="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white">${headingText}</h3>`;
        }

        // 구분선 처리
        if (trimmed === "---" || trimmed === "***" || trimmed.match(/^[-*]{3,}$/)) {
          return `<hr class="my-8 border-t border-gray-300 dark:border-gray-600" />`;
        }

        // 이미지 처리 (마크다운 문법: ![alt](src))
        const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (imageMatch) {
          const alt = imageMatch[1];
          const src = imageMatch[2];
          return `<div class="my-6 rounded-lg overflow-hidden">
            <img 
              src="${src}" 
              alt="${alt}" 
              class="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>`;
        }

        // 리스트 처리
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          let listContent = trimmed.slice(2);
          // 볼드 처리
          listContent = listContent.replace(
            /\*\*([^*]+)\*\*/g,
            '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>'
          );
          // 코드 처리
          listContent = listContent.replace(
            /`([^`]+)`/g,
            '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-blue-600 dark:text-blue-400">$1</code>'
          );
          return `<li class="ml-4 mb-2 text-gray-700 dark:text-gray-300">${listContent}</li>`;
        }

        // 빈 줄
        if (trimmed === "") {
          return "<br />";
        }

        // 일반 텍스트
        let textContent = line;
        // 볼드 처리
        textContent = textContent.replace(
          /\*\*([^*]+)\*\*/g,
          '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>'
        );
        // 코드 처리
        textContent = textContent.replace(
          /`([^`]+)`/g,
          '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-blue-600 dark:text-blue-400">$1</code>'
        );
        return `<p class="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">${textContent}</p>`;
      })
      .join("");
  };

  const aboutContentKo = `## 소개

게임 산업에서 데이터 검증, 설계, 분석, ETL 파이프라인 개발 경험이 있습니다. 게임 특성에 최적화된 데이터 아키텍처 설계에 능숙하며, 국내외 게임 스튜디오와의 협업 및 커뮤니케이션 능력이 뛰어납니다. 학사 학위를 보유한 데이터 엔지니어 및 아키텍트입니다.

---

## 경력 사항

### KRAFTON Inc.
**Data Architect & Engineer** · 정규직  
2018년 9월 - 현재 · 7년 4개월  
대한민국 서울 · 대면근무

**■ Data Architect**

- 여러 게임 타이틀에 걸쳐 ETL 효율성과 분석 쿼리 성능 향상을 위한 데이터 아키텍처 설계 및 최적화
- Medallion Architecture, Delta Live Tables, Liquid Clustering을 포함한 Databricks 기능을 활용한 데이터 구조 관리
- Governance 팀의 통합 아키텍처 분석, 코드 리뷰 수행, 일관성 확보를 위한 신규 타이틀 ETL 구조 설계
- 팀 협업을 통한 다양한 게임 타이틀 관리를 위한 통합 패키지 개발
- C# 및 LINQPad를 사용한 내부 데이터 관리 도구 구축, 작업 자동화 및 효율성 향상
- MSSQL 서버 관리 및 데이터 추출 및 ETL 프로세스 구현
- 국제 스튜디오에 통합 리포팅 메트릭 제공

**■ Data Engineer**

- Azure, AWS, Apache Ambari Hadoop, Hive, Spark, Presto를 아우르는 대규모 빅데이터 플랫폼 지원
- S3, MySQL, Databricks DLT를 포함한 DW 시스템 개발 기여
- Apache Airflow, Hadoop Workflow, Oozie, Docker를 사용한 ETL 워크플로우 오케스트레이션 개발
- 개발 스튜디오와의 로그 QA 및 검증을 통한 데이터 무결성 보장
- 외부 파트너에게 신속한 데이터 전달을 위한 Django 기반 LogQA 도구 개발 및 유지보수
- Tableau를 사용한 대화형 대시보드 생성, 비즈니스 팀에 실시간 인사이트 제공
- 이탈 분석, 진단 및 FQ 분석 수행
- AWS Lambda 및 SDK를 사용한 로그 생성 모듈 개발
- 런칭 후 신속한 의사결정을 위한 Python 및 PySpark를 사용한 데이터 분석 및 쿼리 최적화 지원

**■ Skills & Technologies**

- Big Data & DW: Databricks, Cloudera Hadoop, Apache Ambari Hadoop, MSSQL, MySQL, S3, Presto, DLT
- ETL Tools: Airflow, Hadoop Workflow, Presto, Hue
- Visualization: Tableau
- Coding: Python, PySpark, C#
- Use Cases: KPI Reporting, Post-Launch Monitoring, Funnel & Churn Analysis, LTV, FQ, Conversion Metrics
- Collaboration: 국내외 스튜디오 이해관계자와의 광범위한 협업 경험

**보유 기술**: Databricks · Python · 아마존 웹 서비스(AWS) · 아마존 S3 · Spark · Hadoop · Hive · Presto · MS SQL 서버 · Airflow · C# · Docker · DLT · MySQL


**■ 담당 게임들**
![Games Collage](/games-collage.jpg)

---

## 포트폴리오 소개

이 페이지는 제가 작업한 프로젝트와 기술 스택을 소개하는 포트폴리오 공간입니다. 다양한 웹 개발 프로젝트와 경험을 공유합니다.

## 주요 프로젝트

- **웹 애플리케이션**: 반응형 웹 앱 개발
- **풀스택 프로젝트**: 프론트엔드와 백엔드 통합 개발
- **모바일 웹**: 모바일 최적화 웹사이트
- **오픈소스**: 커뮤니티 기여 프로젝트

## 기술 스택

주로 사용하는 기술 스택입니다:

- **Next.js 14**: React 기반의 풀스택 프레임워크
- **TypeScript**: 타입 안정성을 위한 언어
- **Tailwind CSS**: 유틸리티 퍼스트 CSS 프레임워크
- **Framer Motion**: 부드러운 애니메이션 라이브러리
- **React**: 사용자 인터페이스 구축
- **Node.js**: 서버 사이드 개발

## 경력 및 경험

다양한 프로젝트를 통해 쌓은 실무 경험과 기술 역량을 보여드립니다.

## 연락처

프로젝트 협업이나 문의사항이 있으시면 언제든지 연락주세요.

포트폴리오를 방문해주셔서 감사합니다!`;

  const aboutContent = useMemo(
    () => language === "ko" ? aboutContentKo : t.about.content,
    [language, t.about.content]
  );

  const formattedContent = useMemo(
    () => formatContent(aboutContent),
    [aboutContent]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto py-8">
        <Header />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <span>{t.blog.backToList}</span>
        </Link>

        {/* About Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Weather Card Style Container */}
          <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-xl">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 opacity-10" />

            {/* Content */}
            <div className="relative p-8 md:p-12">
              {/* Profile Image - Top Right */}
              <div className="absolute top-8 right-8 hidden md:block">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg ring-4 ring-white/50 dark:ring-gray-700/50"
                >
                  <Image
                    src="/profile.jpg"
                    alt="Profile"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 128px, 160px"
                  />
                </motion.div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 pr-0 md:pr-48">
                {t.about.title}
              </h1>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-8" />

              {/* Content */}
              <div
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: formattedContent }}
              />
            </div>
          </div>
        </motion.article>
      </div>

      {/* LinkedIn Floating Button - Bottom Right */}
      <motion.a
        href="https://www.linkedin.com/in/hyo-youl-park-a72749222/"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 bg-[#0077B5] hover:bg-[#005885] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="LinkedIn Profile"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </motion.a>
    </div>
  );
}

