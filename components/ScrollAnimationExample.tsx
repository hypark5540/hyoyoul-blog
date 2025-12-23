"use client";

import { ScrollReveal, ParallaxSection, ScrollProgress, StickySection } from "./ScrollReveal";

/**
 * Krafton 배틀그라운드 스타일의 스크롤 애니메이션 예시
 * 
 * 사용된 기술:
 * 1. Framer Motion - useScroll, useTransform, useInView
 * 2. Intersection Observer API (Framer Motion 내장)
 * 3. CSS Transform 최적화
 */
export default function ScrollAnimationExample() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 text-white">
      <ScrollProgress />
      
      {/* Hero Section with Parallax */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <ParallaxSection>
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">
              스크롤 애니메이션
            </h1>
            <p className="text-xl text-gray-300">
              스크롤해보세요
            </p>
          </div>
        </ParallaxSection>
      </section>

      {/* Sticky Section */}
      <StickySection className="h-screen flex items-center justify-center bg-red-900/20">
        <div className="text-center">
          <h2 className="text-4xl font-bold">고정 섹션</h2>
          <p className="mt-4 text-gray-300">이 섹션은 스크롤에 따라 고정됩니다</p>
        </div>
      </StickySection>

      {/* Scroll Reveal Sections */}
      <section className="py-20 px-4 space-y-40">
        <ScrollReveal direction="up" delay={0}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">페이드인 효과</h2>
            <p className="text-gray-300 text-lg">
              이 섹션은 스크롤하면 위에서 아래로 나타납니다.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="left" delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">왼쪽에서 슬라이드</h2>
            <p className="text-gray-300 text-lg">
              왼쪽에서 오른쪽으로 슬라이드되며 나타납니다.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">오른쪽에서 슬라이드</h2>
            <p className="text-gray-300 text-lg">
              오른쪽에서 왼쪽으로 슬라이드되며 나타납니다.
            </p>
          </div>
        </ScrollReveal>

        <ParallaxSection>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">패럴랙스 효과</h2>
            <p className="text-gray-300 text-lg">
              스크롤에 따라 다른 속도로 움직입니다.
            </p>
          </div>
        </ParallaxSection>
      </section>

      {/* Final Section */}
      <section className="h-screen flex items-center justify-center">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="text-6xl font-bold mb-4">끝</h2>
            <p className="text-xl text-gray-300">스크롤 애니메이션 예시입니다</p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}






