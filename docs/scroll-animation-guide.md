# 스크롤 기반 반응형 애니메이션 구현 가이드

Krafton 배틀그라운드 같은 스크롤 기반 인터랙티브 웹사이트 구현 방법

## 주요 사용 기술

### 1. **GSAP ScrollTrigger** (가장 인기)
- 스크롤 위치에 따라 정확한 애니메이션 제어
- 성능 최적화가 잘 되어 있음
- 복잡한 스크롤 시퀀스 구현 가능

### 2. **Intersection Observer API** (네이티브)
- 요소가 뷰포트에 들어올 때 감지
- 성능이 좋고 라이브러리 없이 사용 가능
- React에서는 `react-intersection-observer` 사용

### 3. **Framer Motion** (React)
- React 컴포넌트와 잘 통합
- `useScroll`, `useViewportScroll` 훅 제공
- 스크롤 기반 애니메이션 쉽게 구현

### 4. **CSS Scroll-driven Animations** (최신)
- CSS만으로 스크롤 애니메이션 구현
- 브라우저 지원이 아직 제한적

### 5. **Lenis** (부드러운 스크롤)
- 부드러운 스크롤 효과
- GSAP와 잘 통합됨

## 일반적인 구조

```
1. 스크롤 이벤트 감지
   ↓
2. 요소의 뷰포트 진입 감지 (Intersection Observer)
   ↓
3. 스크롤 진행도 계산 (0~1)
   ↓
4. 애니메이션 값 계산 및 적용
   ↓
5. 요소에 스타일/트랜스폼 적용
```

## 주요 패턴

### 패턴 1: Fade In on Scroll
- 요소가 뷰포트에 들어올 때 페이드인

### 패턴 2: Parallax Scrolling
- 배경과 전경이 다른 속도로 움직임

### 패턴 3: Scroll Progress
- 스크롤 진행도에 따라 애니메이션 진행

### 패턴 4: Pin/Sticky
- 특정 섹션을 고정하고 스크롤에 따라 콘텐츠 변경

### 패턴 5: Reveal Animations
- 스크롤에 따라 텍스트/이미지가 나타남






