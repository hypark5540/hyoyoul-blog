# GSAP ScrollTrigger 사용 예시

Krafton 같은 사이트에서 가장 많이 사용하는 GSAP ScrollTrigger 예시

## 설치

```bash
npm install gsap
```

## 기본 사용법

```javascript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 요소가 뷰포트에 들어올 때 애니메이션
gsap.from(".element", {
  scrollTrigger: {
    trigger: ".element",
    start: "top 80%",
    end: "top 20%",
    toggleActions: "play none none reverse"
  },
  opacity: 0,
  y: 50,
  duration: 1
});
```

## 패럴랙스 효과

```javascript
gsap.to(".parallax-bg", {
  scrollTrigger: {
    trigger: ".section",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  },
  y: -200,
  ease: "none"
});
```

## Pin (고정) 효과

```javascript
gsap.to(".content", {
  scrollTrigger: {
    trigger: ".section",
    pin: true,
    start: "top top",
    end: "+=2000"
  }
});
```

## 스크롤 진행도에 따른 애니메이션

```javascript
gsap.to(".progress-bar", {
  scrollTrigger: {
    trigger: ".section",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  },
  width: "100%"
});
```

## React에서 사용

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollSection() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
      },
      opacity: 0,
      y: 50,
      duration: 1,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return <div ref={ref}>내용</div>;
}
```






