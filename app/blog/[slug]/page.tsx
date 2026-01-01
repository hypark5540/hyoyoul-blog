'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from 'react'
import BlogImage from '@/components/BlogImage'

interface PostContent {
  title: string
  description: string
  content: string
}

interface Post {
  slug: string
  tags: string[]
  date: string
  readTime: string
  views: number
  kr: PostContent
  en: PostContent
}

const posts: Post[] = [
  {
    slug: 'max-points-on-a-line',
    tags: ['Algorithm', 'Geometry', 'Interview', 'LeetCode'],
    date: 'January 3, 2026',
    readTime: '12 min read',
    views: 0,
    kr: {
      title: 'Max Points on a Line',
      description: 'LeetCode 149번 문제 - 2차원 평면 위의 점들 중 같은 직선 위에 있는 점의 최대 개수를 구하는 알고리즘 분석',
      content: `# Max Points on a Line

> LeetCode 링크: [149. Max Points on a Line](https://leetcode.com/problems/max-points-on-a-line/description/)

2차원 평면 위에 여러 개의 점이 주어졌을 때, 동일한 직선 위에 존재하는 점의 최대 개수를 구하는 알고리즘 문제입니다.

## 1. 핵심 개념: 기울기(Slope)

어떤 세 점이 같은 직선 위에 있다면, 두 점씩 짝지어 구한 기울기가 모두 같아야 합니다.

두 점 $(x_1, y_1)$과 $(x_2, y_2)$를 잇는 직선의 기울기는:

$$\\text{기울기} = \\frac{y_2 - y_1}{x_2 - x_1}$$

기울기가 같고 한 점을 공유한다면, 그 점들은 모두 같은 직선 위에 있게 됩니다.

## 2. 알고리즘 설계 (O(N²) 효율성)

가장 효율적인 접근 방식은 **해시맵(Hash Map)**을 사용하는 것입니다.

### 알고리즘 단계

1. **기준점 설정**: 평면 위의 모든 점을 한 번씩 기준점($P_1$)으로 잡습니다
2. **기울기 계산**: 기준점 $P_1$을 제외한 나머지 모든 점 $P_2$와의 기울기를 계산합니다
3. **카운팅**: 해시맵을 사용하여 각 기울기별로 몇 개의 점이 연결되는지 기록합니다
   - \`Map<Slope, Count>\` 구조를 사용합니다
4. **최댓값 갱신**: 특정 기울기에 대해 가장 많은 점이 연결된 경우를 찾아 전체 결과값을 업데이트합니다

## 3. 주요 고려 사항 (엣지 케이스)

### 수직선 (Vertical Lines)

두 점의 $x$ 좌표가 같으면 분모가 0이 되어 기울기가 정의되지 않습니다. 이 경우 기울기를 무한대(Infinity)로 처리하여 별도로 카운팅해야 합니다.

### 동일한 점 (Duplicate Points)

문제 조건에 따라 같은 위치에 점이 여러 개 있을 수 있습니다. 주로 기준점 카운트에 포함하거나 별도 변수로 처리합니다.

### 정밀도 문제

소수점 기울기를 키로 사용할 경우 오차가 발생할 수 있습니다. 가장 정확한 방법은 $y$ 변화량과 $x$ 변화량의 **최대공약수(GCD)**를 구해 기약분수 형태로 관리하는 것이지만, 파이썬 등 일부 환경에서는 높은 정밀도의 부동소수점으로도 통과가 가능합니다.

## 4. 복잡도 분석

- **시간 복잡도**: $O(N^2)$. 모든 점의 쌍을 검사해야 하므로 이중 반복문이 필요합니다
- **공간 복잡도**: $O(N)$. 한 기준점에서 발생할 수 있는 서로 다른 기울기의 개수만큼 해시맵에 저장됩니다

## 5. 초기 구현 및 문제점

### math.atan2를 사용한 구현

\`\`\`python
from collections import defaultdict
import math

class Solution:
    def maxPoints(self, points: list[list[int]]) -> int:
        n = len(points)
        if n <= 2:
            return n
        
        max_total = 0
        
        for i in range(n):
            slopes = defaultdict(int)
            p1 = points[i]
            
            for j in range(i + 1, n):
                p2 = points[j]
                dy = p2[1] - p1[1]
                dx = p2[0] - p1[0]
                
                # math.atan2는 y/x의 아크탄젠트 값을 반환
                slope = math.atan2(dy, dx)
                slopes[slope] += 1
            
            if slopes:
                current_max = max(slopes.values()) + 1
            else:
                current_max = 1
                
            max_total = max(max_total, current_max)
            
        return max_total
\`\`\`

### 문제점: 방향성(Directionality) 문제

테스트 케이스 \`[[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]\`에서 4가 반환되어야 하는데 3이 반환됩니다.

**원인**: \`math.atan2(dy, dx)\`는 단순히 기울기를 구하는 것이 아니라, $x$축으로부터의 **각도(-π ~ π)**를 반환합니다.

- 기울기(Slope): 직선의 방향과 상관없이 $(-1, -1)$과 $(1, 1)$은 같은 직선입니다
- atan2(각도): $(1, 1)$에서 $(3, 3)$을 바라볼 때의 각도: $45°$ (atan2(2, 2))
- atan2(각도): $(3, 3)$에서 $(1, 1)$을 바라볼 때의 각도: $-135°$ (atan2(-2, -2))

작성하신 코드에서 \`for j in range(i + 1, n)\`를 사용하면, 기준점 $i$보다 뒤에 있는 점들만 검사합니다. 이때 기준점보다 "앞에" 있는 점과 "뒤에" 있는 점이 일직선상에 있어도 각도가 $180°$ 차이가 나면 서로 다른 기울기로 인식될 수 있습니다.

## 6. 해결 방법: GCD를 사용한 기약분수 표현

가장 안전하고 정확한 방법은 \`math.gcd\`를 사용하여 $dy$와 $dx$를 최소 단위로 나누고, 그 **비율(tuple)**을 해시맵의 키로 사용하는 것입니다.

### 최종 해결 코드

\`\`\`python
from collections import defaultdict
import math

class Solution:
    def maxPoints(self, points: list[list[int]]) -> int:
        n = len(points)
        if n <= 2: 
            return n
        
        max_total = 0
        
        for i in range(n):
            slopes = defaultdict(int)
            p1 = points[i]
            
            for j in range(i + 1, n):
                p2 = points[j]
                dy = p2[1] - p1[1]
                dx = p2[0] - p1[0]
                
                # 1. 최대공약수로 나누어 기약분수화
                g = math.gcd(dy, dx)
                dy //= g
                dx //= g
                
                # 2. 방향 통일 (매우 중요!)
                # (1, -1)과 (-1, 1)을 같은 기울기로 인식하게 함
                if dx < 0:
                    dx, dy = -dx, -dy
                elif dx == 0:  # 수직선의 경우 (0, 1)로 통일
                    dy = abs(dy)
                
                slopes[(dy, dx)] += 1
            
            # 현재 기준점에서 연결된 가장 많은 점의 수 + 1(자기 자신)
            current_max = 0
            if slopes:
                current_max = max(slopes.values())
            
            max_total = max(max_total, current_max + 1)
            
        return max_total
\`\`\`

### 핵심 포인트

1. **GCD로 기약분수화**: $(2, 2)$와 $(4, 4)$를 모두 $(1, 1)$로 통일
2. **방향 통일**: $dx$가 음수면 둘 다 부호를 바꿔 $dx$를 항상 양수로 고정
3. **수직선 처리**: $dx = 0$인 경우 $dy$를 양수로 통일

## 7. 테스트 케이스 분석

입력: \`[[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]\`

이 점들 중 기울기가 $-1$인 그룹을 찾아보겠습니다:

- P4(4, 1) 와 P2(3, 2) 의 기울기: $\\frac{2 - 1}{3 - 4} = \\frac{1}{-1} = -1$
- P2(3, 2) 와 P5(2, 3) 의 기울기: $\\frac{3 - 2}{2 - 3} = \\frac{1}{-1} = -1$
- P5(2, 3) 와 P6(1, 4) 의 기울기: $\\frac{4 - 3}{1 - 2} = \\frac{1}{-1} = -1$

P4, P2, P5, P6 이 네 점은 모두 기울기가 $-1$인 하나의 직선 위에 나란히 놓여 있습니다. 따라서 최대 점의 개수는 **4**가 됩니다.

## 8. 학습 방향 및 요약

### 알고리즘 및 자료구조

#### ① 복합 자료구조 설계 (Composite Data Structures)

"All-O(1)" 문제처럼 여러 자료구조를 결합해 성능을 극대화하는 패턴입니다.

- **Hash Map + Doubly Linked List**: 정렬된 상태를 유지하면서 $O(1)$의 삽입/삭제를 보장할 때 사용합니다 (LFU 캐시, LRU 캐시의 핵심 원리)
- **공부할 것**: LFU/LRU Cache 구현법, 각 자료구조의 시간 복잡도 한계점 파악

#### ② 기하 알고리즘 기초 (Computational Geometry)

"Max Points on a Line" 문제에서 다룬 내용입니다.

- **기울기와 정밀도**: $dy/dx$ 나눗셈 대신 **GCD(최대공약수)**를 이용한 기약분수 표현이나 atan2를 활용한 각도 표현법을 익혀야 합니다
- **방향성 처리**: 직선(Line)은 방향이 없으므로, 벡터를 정규화(dx를 항상 양수로 고정 등)하는 테크닉이 중요합니다
- **공부할 것**: 유클리드 호제법(GCD), 부동 소수점 오차 처리 방식

### 학습 로드맵

| 단계 | 학습 주제 | 추천 연습 문제 (LeetCode) |
|------|----------|-------------------------|
| 기초 | 해시맵과 정밀도 제어 | 149. Max Points on a Line |
| 중급 | 복합 자료구조 활용 | 146. LRU Cache / 460. LFU Cache |
| 심화 | 동시성 및 실시간 정렬 | 432. All O\`one Data Structure |
| 설계 | 확장 가능한 시스템 아키텍처 | 시스템 설계 면접 (리트코드 설계, 실시간 랭킹) |

## 결론

이 문제는 기하 알고리즘의 기초를 다지는 중요한 문제입니다. 핵심은:

1. **기울기를 정확하게 표현**하는 방법 (GCD 사용)
2. **방향성을 통일**하여 같은 직선을 하나로 인식하는 방법
3. **엣지 케이스 처리** (수직선, 중복 점)

이러한 개념들은 실제 면접에서도 자주 등장하며, 시스템 설계 문제에서도 활용됩니다.`
    },
    en: {
      title: 'Max Points on a Line',
      description: 'Analysis of LeetCode 149 - Finding the maximum number of points that lie on the same straight line',
      content: `# Max Points on a Line

> LeetCode Link: [149. Max Points on a Line](https://leetcode.com/problems/max-points-on-a-line/description/)

Given multiple points on a 2D plane, find the maximum number of points that lie on the same straight line.

## 1. Core Concept: Slope

If three points lie on the same line, the slopes calculated between any two pairs must be equal.

The slope of a line connecting two points $(x_1, y_1)$ and $(x_2, y_2)$ is:

$$\\text{Slope} = \\frac{y_2 - y_1}{x_2 - x_1}$$

If slopes are equal and share a common point, all those points lie on the same line.

## 2. Algorithm Design (O(N²) Efficiency)

The most efficient approach uses a **Hash Map**.

### Algorithm Steps

1. **Reference Point Selection**: Use each point as a reference point ($P_1$) once
2. **Slope Calculation**: Calculate the slope between reference point $P_1$ and all other points $P_2$
3. **Counting**: Use a hash map to record how many points are connected for each slope
   - Use \`Map<Slope, Count>\` structure
4. **Maximum Update**: Find the slope with the most connected points and update the global result

## 3. Key Considerations (Edge Cases)

### Vertical Lines

When two points have the same $x$ coordinate, the denominator becomes 0 and the slope is undefined. Handle this case by treating the slope as infinity and counting separately.

### Duplicate Points

According to problem constraints, multiple points can exist at the same location. Usually include them in the reference point count or handle with a separate variable.

### Precision Issues

Using floating-point slopes as keys can cause errors. The most accurate method is to use the **GCD (Greatest Common Divisor)** of $y$ and $x$ differences to represent slopes as reduced fractions, though high-precision floating-point can also work in some environments like Python.

## 4. Complexity Analysis

- **Time Complexity**: $O(N^2)$. Need to check all pairs of points, requiring nested loops
- **Space Complexity**: $O(N)$. Hash map stores as many different slopes as possible for one reference point

## 5. Initial Implementation and Issues

### Implementation using math.atan2

\`\`\`python
from collections import defaultdict
import math

class Solution:
    def maxPoints(self, points: list[list[int]]) -> int:
        n = len(points)
        if n <= 2:
            return n
        
        max_total = 0
        
        for i in range(n):
            slopes = defaultdict(int)
            p1 = points[i]
            
            for j in range(i + 1, n):
                p2 = points[j]
                dy = p2[1] - p1[1]
                dx = p2[0] - p1[0]
                
                # math.atan2 returns arctangent of y/x
                slope = math.atan2(dy, dx)
                slopes[slope] += 1
            
            if slopes:
                current_max = max(slopes.values()) + 1
            else:
                current_max = 1
                
            max_total = max(max_total, current_max)
            
        return max_total
\`\`\`

### Problem: Directionality Issue

Test case \`[[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]\` should return 4 but returns 3.

**Cause**: \`math.atan2(dy, dx)\` doesn't just calculate slope, but returns the **angle (-π ~ π)** from the $x$-axis.

- Slope: Regardless of direction, $(-1, -1)$ and $(1, 1)$ represent the same line
- atan2(angle): From $(1, 1)$ to $(3, 3)$: $45°$ (atan2(2, 2))
- atan2(angle): From $(3, 3)$ to $(1, 1)$: $-135°$ (atan2(-2, -2))

Using \`for j in range(i + 1, n)\` only checks points after index $i$. Points before and after the reference point on the same line can have angles differing by $180°$, causing them to be recognized as different slopes.

## 6. Solution: GCD-based Reduced Fraction Representation

The safest and most accurate method is to use \`math.gcd\` to divide $dy$ and $dx$ by their GCD, then use the **ratio (tuple)** as the hash map key.

### Final Solution Code

\`\`\`python
from collections import defaultdict
import math

class Solution:
    def maxPoints(self, points: list[list[int]]) -> int:
        n = len(points)
        if n <= 2: 
            return n
        
        max_total = 0
        
        for i in range(n):
            slopes = defaultdict(int)
            p1 = points[i]
            
            for j in range(i + 1, n):
                p2 = points[j]
                dy = p2[1] - p1[1]
                dx = p2[0] - p1[0]
                
                # 1. Divide by GCD to get reduced fraction
                g = math.gcd(dy, dx)
                dy //= g
                dx //= g
                
                # 2. Unify direction (very important!)
                # Make (1, -1) and (-1, 1) recognized as the same slope
                if dx < 0:
                    dx, dy = -dx, -dy
                elif dx == 0:  # For vertical lines, unify to (0, 1)
                    dy = abs(dy)
                
                slopes[(dy, dx)] += 1
            
            # Maximum number of connected points + 1 (self)
            current_max = 0
            if slopes:
                current_max = max(slopes.values())
            
            max_total = max(max_total, current_max + 1)
            
        return max_total
\`\`\`

### Key Points

1. **GCD for reduced fraction**: Unify $(2, 2)$ and $(4, 4)$ to $(1, 1)$
2. **Direction unification**: If $dx$ is negative, flip both signs to keep $dx$ always positive
3. **Vertical line handling**: When $dx = 0$, unify $dy$ to positive

## 7. Test Case Analysis

Input: \`[[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]\`

Finding the group with slope $-1$:

- Slope between P4(4, 1) and P2(3, 2): $\\frac{2 - 1}{3 - 4} = \\frac{1}{-1} = -1$
- Slope between P2(3, 2) and P5(2, 3): $\\frac{3 - 2}{2 - 3} = \\frac{1}{-1} = -1$
- Slope between P5(2, 3) and P6(1, 4): $\\frac{4 - 3}{1 - 2} = \\frac{1}{-1} = -1$

P4, P2, P5, P6 all lie on the same line with slope $-1$. Therefore, the maximum number of points is **4**.

## 8. Learning Direction and Summary

### Algorithms and Data Structures

#### ① Composite Data Structure Design

Like the "All-O(1)" problem, combining multiple data structures to maximize performance.

- **Hash Map + Doubly Linked List**: Used when maintaining sorted state with $O(1)$ insert/delete (core principle of LFU cache, LRU cache)
- **Study**: LFU/LRU Cache implementation, understanding time complexity limits of each data structure

#### ② Computational Geometry Basics

Content covered in "Max Points on a Line" problem.

- **Slope and Precision**: Learn GCD-based reduced fraction representation or angle representation using atan2 instead of $dy/dx$ division
- **Direction Handling**: Since lines have no direction, techniques for normalizing vectors (e.g., always keeping $dx$ positive) are important
- **Study**: Euclidean algorithm (GCD), floating-point error handling

### Learning Roadmap

| Level | Topic | Recommended Practice Problems (LeetCode) |
|-------|-------|------------------------------------------|
| Basic | Hash map and precision control | 149. Max Points on a Line |
| Intermediate | Composite data structure usage | 146. LRU Cache / 460. LFU Cache |
| Advanced | Concurrency and real-time sorting | 432. All O\`one Data Structure |
| Design | Scalable system architecture | System design interviews (LeetCode design, real-time leaderboard) |

## Conclusion

This problem is important for building foundations in computational geometry. Key points:

1. **Accurately representing slopes** (using GCD)
2. **Unifying direction** to recognize the same line as one
3. **Handling edge cases** (vertical lines, duplicate points)

These concepts frequently appear in interviews and are also useful in system design problems.`
    }
  },
  {
    slug: 'all-o1-data-structure',
    tags: ['Algorithm', 'Data Structure', 'Interview', 'LeetCode'],
    date: 'January 2, 2026',
    readTime: '10 min read',
    views: 0,
    kr: {
      title: 'All-O(1) Data Structure',
      description: 'HelloInterview에서 발췌한 LeetCode 432번 문제 - 모든 연산을 O(1) 시간에 수행하는 데이터 구조 설계 방법을 분석합니다.',
      content: `# All-O(1) Data Structure

> 해당 포스트는 [HelloInterview 커뮤니티](https://www.hellointerview.com/community/questions/all-one-data-structure/cm5eguhab02ce838oupc7l1c0)에서 발췌했습니다.

## 문제 설명

문자열 키와 정수 카운트를 유지하며, **모든 연산을 O(1) 평균 시간**에 수행하는 데이터 구조를 설계해야 합니다. 네 가지 연산을 지원해야 합니다:

1. **inc(key)**: 키의 카운트를 증가
2. **dec(key)**: 키의 카운트를 감소 (카운트가 0이 되면 키 제거)
3. **getMaxKey()**: 최대 카운트를 가진 키 중 하나 반환
4. **getMinKey()**: 최소 카운트를 가진 키 중 하나 반환

**예시:**

\`\`\`
inc("hello")
inc("hello")
inc("world")
getMaxKey()  // "hello" (count 2)
getMinKey()  // "world" (count 1)
dec("hello")
getMaxKey()  // "hello" or "world" (둘 다 count 1)
\`\`\`

**제약 조건:**

- 모든 연산은 **O(1) 평균 시간 복잡도**여야 함
- 키는 **문자열**, 카운트는 **양의 정수**
- 카운트가 **0**이 되면 키를 데이터 구조에서 제거해야 함
- 키가 없으면 **빈 문자열** 반환
- 동일한 최대/최소 카운트를 가진 키가 여러 개면 **아무거나 하나** 반환

---

## DESCRIPTION

**문자열 키와 정수 카운트**를 유지하며 **O(1) 평균 시간**에 네 가지 연산을 지원하는 데이터 구조를 설계하세요: 키의 카운트를 증가시키는 inc(key), 키의 카운트를 감소시키는 dec(key, 카운트가 0에 도달하면 키 제거), **최대 카운트**를 가진 키를 반환하는 getMaxKey(), **최소 카운트**를 가진 키를 반환하는 getMinKey(). 예를 들어, inc("apple"), inc("apple"), inc("banana") 후에 getMaxKey()를 호출하면 "apple" (카운트 2)을 반환하고 getMinKey()는 "banana" (카운트 1)을 반환해야 합니다.

**Input:**

\`\`\`
inc("hello")
inc("hello")
inc("world")
getMaxKey()
getMinKey()
dec("hello")
getMaxKey()
\`\`\`

**Output:**

\`\`\`
null
null
null
"hello"
"world"
null
"hello" or "world"
\`\`\`

**Explanation:** inc("hello")를 두 번 호출한 후, hello는 카운트 2를 가집니다. inc("world") 후, world는 카운트 1을 가집니다. getMaxKey()는 "hello" (카운트 2)를 반환하고, getMinKey()는 "world" (카운트 1)을 반환합니다. dec("hello") 후, 둘 다 카운트 1을 가지므로 getMaxKey()는 둘 중 하나를 반환할 수 있습니다.

**Constraints:**

- 모든 연산은 **O(1) 평균 시간 복잡도**로 실행되어야 합니다
- 키는 **문자열**이고, 카운트는 **양의 정수**입니다
- 카운트가 **0**에 도달하면 키를 데이터 구조에서 **제거**해야 합니다
- 키가 없으면 getMaxKey()와 getMinKey()는 **빈 문자열**을 반환합니다
- 동일한 최대/최소 카운트를 가진 키가 여러 개이면 **아무거나 하나**를 반환합니다

---

## 문제 이해

핵심 과제는 **키-카운트 매핑**과 **카운트-키 그룹핑**을 동시에 유지하면서 O(1) 연산을 지원하는 것입니다. 단순한 해시 맵은 카운트를 추적하지만 최소/최대를 찾기 위해 O(n) 시간이 필요합니다.

핵심 아이디어는 **이중 연결 리스트를 사용한 카운트 버킷** 구조입니다. 각 버킷은 특정 카운트 값을 나타내고, 그 카운트를 가진 모든 키를 저장합니다. 이렇게 하면 증가/감소 시 인접한 카운트로 O(1) 시간에 이동할 수 있고, 리스트의 head/tail을 통해 최소/최대에 O(1) 시간에 접근할 수 있습니다.

## 직관 구축

**단순한 접근법**은 해시 맵으로 키 카운트를 추적하고 모든 값을 스캔하여 최소/최대를 찾는 것입니다. 이는 O(n) 시간이 걸립니다.

**더 나은 접근법**은 **카운트 노드의 이중 연결 리스트**를 유지하는 것입니다. 각 노드는 카운트 값을 나타내고 그 카운트를 가진 모든 키를 저장합니다. 예를 들어, "apple"의 카운트를 2에서 3으로 증가시킬 때, count-2 노드에서 count-3 노드로 이동합니다 (노드가 없으면 생성). 인접한 카운트로 이동할 수 있으므로 O(1) 시간이 걸립니다.

이 패턴은 **실시간 분석 시스템** (상위/하위 성과자 추적), **캐시 구현** (LFU 제거 정책), **리더보드 시스템** (최고/최저 점수 찾기)에서 나타납니다. O(1) 제약은 **초당 수백만 건의 업데이트**가 발생하는 고처리량 시스템에서 중요합니다.

## 구현

### CountNode 구조

이중 연결 리스트 노드를 정의합니다. 각 CountNode는 카운트 값, 그 카운트를 가진 **키들의 집합** (O(1) 추가/제거를 위해), 그리고 이전/다음 카운트 노드에 대한 포인터를 저장합니다.

\`\`\`python
class CountNode:
    def __init__(self, count):
        self.count = count
        self.keys = set()  # O(1) 추가/제거를 위한 집합
        self.prev = None
        self.next = None
\`\`\`

### 핵심 데이터 구조

**세 개의 해시 맵**을 사용합니다:
- **keyCount**: 각 키를 현재 카운트에 매핑
- **keyNode**: 각 키를 CountNode에 매핑 (O(1) 접근)
- **head/tail 포인터**: 이중 연결 리스트의 최소/최대 노드에 대한 포인터

\`\`\`python
class AllOne:
    def __init__(self):
        self.keyCount = {}      # key -> count
        self.keyNode = {}       # key -> CountNode
        self.head = None        # 최소 카운트 노드
        self.tail = None        # 최대 카운트 노드
\`\`\`

### Increment 구현

inc(key)는 키를 현재 카운트 노드에서 다음 카운트 노드로 이동시킵니다. 키가 새로 추가되면 count-1 노드에 추가합니다 (없으면 생성). count c에서 c+1로 이동할 때, 현재 노드 다음에 count-(c+1) 노드가 있는지 확인하고, 없으면 **생성하여 삽입**합니다. 키를 이전 노드의 집합에서 제거하고, 집합이 비어있으면 **이전 노드를 삭제**합니다.

\`\`\`python
def inc(self, key: str) -> None:
    if key in self.keyCount:
        count = self.keyCount[key]
        node = self.keyNode[key]
        self.keyCount[key] = count + 1
        
        # 다음 카운트 노드가 없으면 생성
        if node.next is None or node.next.count != count + 1:
            newNode = CountNode(count + 1)
            newNode.prev = node
            newNode.next = node.next
            if node.next:
                node.next.prev = newNode
            else:
                self.tail = newNode
            node.next = newNode
        
        # 키를 새 노드로 이동
        node.next.keys.add(key)
        self.keyNode[key] = node.next
        node.keys.remove(key)
        
        # 빈 노드 제거
        if not node.keys:
            if node.prev:
                node.prev.next = node.next
            else:
                self.head = node.next
            if node.next:
                node.next.prev = node.prev
            else:
                self.tail = node.prev
    else:
        # 새 키 추가
        self.keyCount[key] = 1
        if self.head is None or self.head.count != 1:
            newNode = CountNode(1)
            newNode.next = self.head
            if self.head:
                self.head.prev = newNode
            else:
                self.tail = newNode
            self.head = newNode
        self.head.keys.add(key)
        self.keyNode[key] = self.head
\`\`\`

### Decrement 구현

dec(key)는 키를 이전 카운트 노드로 이동시키거나, 카운트가 0이 되면 완전히 제거합니다. count c에서 c-1로 감소시킬 때, 현재 노드 이전에 count-(c-1) 노드가 있는지 확인하고, 없고 c > 1이면 **생성하여 삽입**합니다. 키를 이전 노드의 집합에서 제거하고 빈 노드를 삭제합니다. 새 카운트가 0이면 **모든 맵에서 키를 제거**합니다.

\`\`\`python
def dec(self, key: str) -> None:
    if key not in self.keyCount:
        return
    
    count = self.keyCount[key]
    node = self.keyNode[key]
    
    if count == 1:
        # 키 완전 제거
        del self.keyCount[key]
        del self.keyNode[key]
        node.keys.remove(key)
    else:
        self.keyCount[key] = count - 1
        
        # 이전 카운트 노드가 없으면 생성
        if node.prev is None or node.prev.count != count - 1:
            newNode = CountNode(count - 1)
            newNode.next = node
            newNode.prev = node.prev
            if node.prev:
                node.prev.next = newNode
            else:
                self.head = newNode
            node.prev = newNode
        
        # 키를 새 노드로 이동
        node.prev.keys.add(key)
        self.keyNode[key] = node.prev
        node.keys.remove(key)
    
    # 빈 노드 제거
    if not node.keys:
        if node.prev:
            node.prev.next = node.next
        else:
            self.head = node.next
        if node.next:
            node.next.prev = node.prev
        else:
            self.tail = node.prev
\`\`\`

### Min/Max 키 조회

getMinKey()와 getMaxKey()는 head와 tail 포인터를 사용합니다. head는 항상 최소 카운트 노드를, tail은 최대 카운트 노드를 가리키므로, 각 노드의 키 집합에서 **아무 키나 하나**를 반환하면 됩니다 (집합 반복을 사용). head나 tail이 null이면 (키가 없으면) **빈 문자열**을 반환합니다.

\`\`\`python
def getMaxKey(self) -> str:
    if self.tail is None:
        return ""
    return next(iter(self.tail.keys))

def getMinKey(self) -> str:
    if self.head is None:
        return ""
    return next(iter(self.head.keys))
\`\`\`

## 배운 점

- **패턴**: 해시 맵과 이중 연결 리스트를 결합하여 직접 접근과 순서 있는 순회 모두에서 O(1) 연산을 달성
- **사용 사례**: LFU 캐시, 실시간 리더보드, 즉각적인 최소/최대 쿼리가 필요한 분석 시스템에 필수
- **설계 원칙**: 양방향 포인터 (key→node 및 node→keys)를 유지하여 양방향에서 O(1) 업데이트 가능
- **메모리 관리**: 장기 실행 시스템에서 메모리 누수를 방지하기 위해 항상 빈 카운트 노드를 제거

## 시간 복잡도

- **inc(key)**: O(1) - 해시 맵 조회 및 연결 리스트 노드 삽입/삭제
- **dec(key)**: O(1) - 해시 맵 조회 및 연결 리스트 노드 삽입/삭제
- **getMaxKey()**: O(1) - tail 포인터 접근
- **getMinKey()**: O(1) - head 포인터 접근

## 공간 복잡도

O(n) - n은 고유 키의 개수. 각 키는 해시 맵과 연결 리스트 노드에 저장됩니다.

## 일반적인 실수

**실수**: 힙이나 트리 같은 정렬된 구조를 카운트에 사용 → **해결**: 이들은 O(log n) 연산이 필요하므로 O(1) 탐색을 위해 이중 연결 리스트 사용

**실수**: 빈 카운트 노드를 제거하는 것을 잊음 → **해결**: 키를 제거한 후 카운트 버킷이 비어있는지 항상 확인하고 노드를 삭제하여 메모리 누수 방지

**실수**: dec() 중 키가 존재하지 않는 경우를 처리하지 않음 → **해결**: 감소하기 전에 키가 존재하는지 확인하고, 카운트가 0이 되면 키 맵과 카운트 버킷 모두에서 제거

---

## 완전한 해결 코드

Dummy Head/Tail을 사용한 구현 방식:

\`\`\`python
class Node:
    def __init__(self, count):
        self.count = count
        self.keys = set()
        self.prev = None
        self.next = None

class AllOne:
    def __init__(self):
        self.key_map = {}  # key -> Node
        self.head = Node(0) # Dummy Head (최소값 쪽)
        self.tail = Node(0) # Dummy Tail (최대값 쪽)
        self.head.next = self.tail
        self.tail.prev = self.head

    def _insert_after(self, node, new_node):
        new_node.prev = node
        new_node.next = node.next
        node.next.prev = new_node
        node.next = new_node

    def _remove_node(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def inc(self, key):
        if key not in self.key_map:
            # 처음 삽입될 때: count 1 노드 확인 및 생성
            if self.head.next.count != 1:
                self._insert_after(self.head, Node(1))
            self.head.next.keys.add(key)
            self.key_map[key] = self.head.next
        else:
            curr_node = self.key_map[key]
            # 다음 빈도(count + 1) 노드가 없으면 생성
            if curr_node.next.count != curr_node.count + 1:
                self._insert_after(curr_node, Node(curr_node.count + 1))
            curr_node.next.keys.add(key)
            self.key_map[key] = curr_node.next
            curr_node.keys.remove(key)
            if not curr_node.keys: self._remove_node(curr_node)

    def dec(self, key):
        curr_node = self.key_map[key]
        if curr_node.count == 1:
            del self.key_map[key]
        else:
            # 이전 빈도(count - 1) 노드가 없으면 생성
            if curr_node.prev.count != curr_node.count - 1:
                self._insert_after(curr_node.prev, Node(curr_node.count - 1))
            curr_node.prev.keys.add(key)
            self.key_map[key] = curr_node.prev
        
        curr_node.keys.remove(key)
        if not curr_node.keys: self._remove_node(curr_node)

    def getMaxKey(self):
        return next(iter(self.tail.prev.keys)) if self.tail.prev != self.head else ""

    def getMinKey(self):
        return next(iter(self.head.next.keys)) if self.head.next != self.tail else ""
\`\`\``
    },
    en: {
      title: 'All-O(1) Data Structure',
      description: 'Analysis of LeetCode 432 - Designing a data structure that supports all operations in O(1) time, excerpted from HelloInterview.',
      content: `# All-O(1) Data Structure

> This post is excerpted from [HelloInterview Community](https://www.hellointerview.com/community/questions/all-one-data-structure/cm5eguhab02ce838oupc7l1c0).

## Problem Description

Design a data structure that maintains **string keys with integer counts** and supports four operations in **O(1) average time**: increment a key's count (inc(key)), decrement a key's count (dec(key), removing the key when count reaches zero), retrieve any key with the **maximum count** (getMaxKey()), and retrieve any key with the **minimum count** (getMinKey()).

**Example:**

\`\`\`
inc("hello")
inc("hello")
inc("world")
getMaxKey()  // "hello" (count 2)
getMinKey()  // "world" (count 1)
dec("hello")
getMaxKey()  // "hello" or "world" (both have count 1)
\`\`\`

**Constraints:**

- All operations must run in **O(1) average time complexity**
- Keys are **strings**, counts are **positive integers**
- When count reaches **0**, the key must be **removed** from the data structure
- getMaxKey() and getMinKey() return **empty string** if no keys exist
- If multiple keys have the same max/min count, return **any one** of them

---

## DESCRIPTION

Design a data structure that maintains **string keys with integer counts** and supports four operations in **O(1) average time**: increment a key's count (inc(key)), decrement a key's count (dec(key), removing the key when count reaches zero), retrieve any key with the **maximum count** (getMaxKey()), and retrieve any key with the **minimum count** (getMinKey()). For example, after inc("apple"), inc("apple"), inc("banana"), calling getMaxKey() should return "apple" (count 2) and getMinKey() should return "banana" (count 1).

**Input:**

\`\`\`
inc("hello")
inc("hello")
inc("world")
getMaxKey()
getMinKey()
dec("hello")
getMaxKey()
\`\`\`

**Output:**

\`\`\`
null
null
null
"hello"
"world"
null
"hello" or "world"
\`\`\`

**Explanation:** After two inc("hello"), hello has count 2. After inc("world"), world has count 1. getMaxKey() returns "hello" (count 2), getMinKey() returns "world" (count 1). After dec("hello"), both have count 1, so getMaxKey() can return either.

**Constraints:**

- All operations must run in **O(1) average time complexity**
- Keys are **strings**, counts are **positive integers**
- When count reaches **0**, the key must be **removed** from the data structure
- getMaxKey() and getMinKey() return **empty string** if no keys exist
- If multiple keys have the same max/min count, return **any one** of them

---

## Understanding the Problem

The core challenge is maintaining **both key-to-count mappings and count-to-keys groupings** while supporting O(1) operations. A simple hash map tracks counts but requires O(n) to find min/max. The key insight is using a **doubly-linked list of count buckets**, where each bucket stores all keys with that count. This allows O(1) navigation to adjacent counts when incrementing/decrementing, and O(1) access to min/max via list head/tail.

## Building Intuition

A **naive approach** uses a hash map for key counts and scans all values to find min/max, taking O(n) time. A **better approach** maintains a **doubly-linked list of count nodes**, where each node represents a count value and stores all keys at that count. When incrementing "apple" from count 2 to 3, we move it from the count-2 node to the count-3 node (creating the node if needed), which takes O(1) since we can navigate to adjacent counts.

This pattern appears in **real-time analytics systems** (tracking top/bottom performers), **cache implementations** (LFU eviction policies), and **leaderboard systems** (finding highest/lowest scores). The O(1) constraint is critical for **high-throughput systems** where millions of updates occur per second.

## Implementation

### CountNode Structure

Define the **doubly-linked list node** that represents a single count value. Each CountNode stores the count value, a **set of keys** at that count (for O(1) add/remove), and pointers to previous/next count nodes.

\`\`\`python
class CountNode:
    def __init__(self, count):
        self.count = count
        self.keys = set()  # Set for O(1) add/remove
        self.prev = None
        self.next = None
\`\`\`

### Core Data Structure

Implement the main data structure with **three hash maps**: keyCount (maps each key to its current count), keyNode (maps each key to its CountNode for O(1) access), and maintain head/tail pointers to the doubly-linked list for O(1) min/max access.

\`\`\`python
class AllOne:
    def __init__(self):
        self.keyCount = {}      # key -> count
        self.keyNode = {}       # key -> CountNode
        self.head = None        # minimum count node
        self.tail = None        # maximum count node
\`\`\`

### Increment Implementation

Implement inc(key) by moving the key from its current count node to the next count node. If the key is new, add it to the count-1 node (creating if needed). If moving from count c to c+1, check if a count-(c+1) node exists after the current node; if not, **create and insert it** between current and next. Remove the key from the old node's set, and if that set becomes empty, **delete the old node** from the linked list.

\`\`\`python
def inc(self, key: str) -> None:
    if key in self.keyCount:
        count = self.keyCount[key]
        node = self.keyNode[key]
        self.keyCount[key] = count + 1
        
        if node.next is None or node.next.count != count + 1:
            newNode = CountNode(count + 1)
            newNode.prev = node
            newNode.next = node.next
            if node.next:
                node.next.prev = newNode
            else:
                self.tail = newNode
            node.next = newNode
        
        node.next.keys.add(key)
        self.keyNode[key] = node.next
        node.keys.remove(key)
        
        if not node.keys:
            if node.prev:
                node.prev.next = node.next
            else:
                self.head = node.next
            if node.next:
                node.next.prev = node.prev
            else:
                self.tail = node.prev
    else:
        self.keyCount[key] = 1
        if self.head is None or self.head.count != 1:
            newNode = CountNode(1)
            newNode.next = self.head
            if self.head:
                self.head.prev = newNode
            else:
                self.tail = newNode
            self.head = newNode
        self.head.keys.add(key)
        self.keyNode[key] = self.head
\`\`\`

### Decrement Implementation

Implement dec(key) by moving the key to the previous count node, or removing it entirely if count becomes 0. If decrementing from count c to c-1, check if a count-(c-1) node exists before the current node; if not and c > 1, **create and insert it**. Remove the key from the old node's set and delete the old node if empty. If the new count is 0, **remove the key from all maps** (keyCount and keyNode).

\`\`\`python
def dec(self, key: str) -> None:
    if key not in self.keyCount:
        return
    
    count = self.keyCount[key]
    node = self.keyNode[key]
    
    if count == 1:
        del self.keyCount[key]
        del self.keyNode[key]
        node.keys.remove(key)
    else:
        self.keyCount[key] = count - 1
        
        if node.prev is None or node.prev.count != count - 1:
            newNode = CountNode(count - 1)
            newNode.next = node
            newNode.prev = node.prev
            if node.prev:
                node.prev.next = newNode
            else:
                self.head = newNode
            node.prev = newNode
        
        node.prev.keys.add(key)
        self.keyNode[key] = node.prev
        node.keys.remove(key)
    
    if not node.keys:
        if node.prev:
            node.prev.next = node.next
        else:
            self.head = node.next
        if node.next:
            node.next.prev = node.prev
        else:
            self.tail = node.prev
\`\`\`

### Min/Max Key Retrieval

Implement getMinKey() and getMaxKey() using the head and tail pointers. Since head always points to the minimum count node and tail to the maximum, simply return **any key from the respective node's key set** (use set iteration to get one element). Return an **empty string** if head or tail is null (no keys exist).

\`\`\`python
def getMaxKey(self) -> str:
    if self.tail is None:
        return ""
    return next(iter(self.tail.keys))

def getMinKey(self) -> str:
    if self.head is None:
        return ""
    return next(iter(self.head.keys))
\`\`\`

## What We've Learned

- **Pattern**: Combine hash maps with doubly-linked lists to achieve O(1) operations for both direct access and ordered traversal
- **Use Case**: Essential for LFU caches, real-time leaderboards, and analytics systems requiring instant min/max queries
- **Design Principle**: Maintain bidirectional pointers (key→node and node→keys) to enable O(1) updates in both directions
- **Memory Management**: Always remove empty count nodes to prevent memory leaks in long-running systems

## Time Complexity

- **inc(key)**: O(1) - hash map lookup and linked list node insertion/deletion
- **dec(key)**: O(1) - hash map lookup and linked list node insertion/deletion
- **getMaxKey()**: O(1) - tail pointer access
- **getMinKey()**: O(1) - head pointer access

## Space Complexity

O(n) - where n is the number of unique keys. Each key is stored in both hash maps and linked list nodes.

## Common Pitfalls

**Pitfall**: Using a sorted structure like a heap or tree for counts → **Fix**: These require O(log n) operations; use a doubly-linked list for O(1) navigation

**Pitfall**: Forgetting to remove empty count nodes → **Fix**: Always check if a count bucket is empty after removing a key and delete the node to prevent memory leaks

**Pitfall**: Not handling the case when a key doesn't exist during dec() → **Fix**: Check if the key exists before decrementing; if count becomes 0, remove from both the key map and count bucket

---

## Complete Solution Code

Implementation using Dummy Head/Tail:

\`\`\`python
class Node:
    def __init__(self, count):
        self.count = count
        self.keys = set()
        self.prev = None
        self.next = None

class AllOne:
    def __init__(self):
        self.key_map = {}  # key -> Node
        self.head = Node(0) # Dummy Head (minimum side)
        self.tail = Node(0) # Dummy Tail (maximum side)
        self.head.next = self.tail
        self.tail.prev = self.head

    def _insert_after(self, node, new_node):
        new_node.prev = node
        new_node.next = node.next
        node.next.prev = new_node
        node.next = new_node

    def _remove_node(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def inc(self, key):
        if key not in self.key_map:
            # First insertion: check and create count 1 node
            if self.head.next.count != 1:
                self._insert_after(self.head, Node(1))
            self.head.next.keys.add(key)
            self.key_map[key] = self.head.next
        else:
            curr_node = self.key_map[key]
            # Create next frequency (count + 1) node if it doesn't exist
            if curr_node.next.count != curr_node.count + 1:
                self._insert_after(curr_node, Node(curr_node.count + 1))
            curr_node.next.keys.add(key)
            self.key_map[key] = curr_node.next
            curr_node.keys.remove(key)
            if not curr_node.keys: self._remove_node(curr_node)

    def dec(self, key):
        curr_node = self.key_map[key]
        if curr_node.count == 1:
            del self.key_map[key]
        else:
            # Create previous frequency (count - 1) node if it doesn't exist
            if curr_node.prev.count != curr_node.count - 1:
                self._insert_after(curr_node.prev, Node(curr_node.count - 1))
            curr_node.prev.keys.add(key)
            self.key_map[key] = curr_node.prev
        
        curr_node.keys.remove(key)
        if not curr_node.keys: self._remove_node(curr_node)

    def getMaxKey(self):
        return next(iter(self.tail.prev.keys)) if self.tail.prev != self.head else ""

    def getMinKey(self):
        return next(iter(self.head.next.keys)) if self.head.next != self.tail else ""
\`\`\``
    }
  },
  {
    slug: 'hello-interview',
    tags: ['System Design', 'Architecture', 'Interview'],
    date: 'January 1, 2026',
    readTime: '15 min read',
    views: 0,
    kr: {
      title: 'From HelloInterview - Leetcode System Architecture',
      description: 'HelloInterview에서 발췌한 LeetCode 온라인 저지 시스템 설계와 개선 방안을 분석합니다.',
      content: `> 해당 포스트는 [HelloInterview 커뮤니티](https://www.hellointerview.com/community/submissions/cmiiabtob012l08ad3i6mmakl)에서 발췌했습니다.

![LeetCode System Design](/design-leetcode.png)

이미지에서 제시된 내용은 **'LeetCode(온라인 코딩 테스트 플랫폼) 시스템 설계'**에 관한 것입니다. 제공된 설계 도안과 요구사항을 바탕으로 주요 내용을 분석 및 요약해 드립니다.

## 1. 요구사항 분석 (Requirements)

### 기능적 요구사항 (Functional Requirements)

- 사용자가 문제 풀이(Solution)를 제출하고 결과를 확인할 수 있어야 함
- 전 세계 사용자를 위한 실시간 리더보드(Leaderboard) 제공
- 대규모 대회(10만 명 참가, 1시간 진행)를 안정적으로 지원

### 비기능적 요구사항 (Non-Functional Requirements)

- 리더보드 조회 지연 시간(Latency)은 500ms 미만이어야 함
- 결과 데이터의 무결성 및 가용성이 높아야 함
- 제출이 몰리는 피크 타임의 높은 쓰기 처리량(High throughput)을 감당해야 함

## 2. 핵심 엔티티 (Core Entities)

시스템을 구성하는 주요 데이터 모델입니다.

- **User**: 사용자 정보
- **Solution**: 제출된 코드, 언어, 실행 결과(Pass/Fail)
- **Problem**: 문제 설명, 제약 조건, 테스트 케이스
- **Competition**: 대회 정보(시작/종료 시간, 참가자 목록)

## 3. 시스템 아키텍처 및 흐름 (High-Level Design)

전체적인 흐름은 API Gateway → 서비스 계층 → 비동기 처리 → 데이터 저장의 구조를 띱니다.

### 1) 제출 및 실행 흐름 (Solution Service)

- 클라이언트가 코드를 제출하면 API Gateway를 거쳐 Solution Service(Write heavy)로 전달됩니다
- **Kafka Queue**: 급증하는 제출량을 제어(Throttling)하고 시스템 부하를 분산하기 위해 메시지 큐를 사용합니다
- **Code Execution Workers**: 보안을 위해 격리된 환경(Docker 컨테이너 등)에서 Java, Python, Go 등 다양한 언어의 코드를 실제로 실행하고 결과를 판독합니다

### 2) 데이터 저장 및 조회

- **Relational DB (PostgreSQL/MySQL)**: 사용자 정보, 문제 상세, 제출 결과 등을 영구 저장합니다
- **Leaderboard Service (Read heavy)**: 리더보드 정보를 전문적으로 처리합니다
- **Redis (Sorted Set)**: 실시간 순위 계산을 위해 인메모리 DB인 Redis를 활용합니다. 대회당 하나의 Sorted Set을 구성하여 점수 기반으로 빠른 순위 조회가 가능하도록 설계되었습니다

### 3) 실시간 피드백

코드 실행이 완료되면 결과가 Solution Service를 통해 클라이언트에게 반환되며(SSE 또는 Polling 방식 활용 가능), 동시에 리더보드 서비스로 전달되어 순위가 즉시 갱신됩니다.

## 4. API 설계 (API Routes)

- \`POST /competitions/:id/submissions\`: 코드 제출
- \`GET /competitions/:id/leaderboard\`: 리더보드 조회 (페이지네이션 포함)
- \`GET /competitions/:id/submissions\`: 본인의 제출 이력 확인

## 5. 핵심 요약

이 설계의 핵심은 **"확장성과 격리"**입니다.

- **확장성**: 대규모 대회 시 발생하는 폭발적인 트래픽을 처리하기 위해 Kafka를 도입하여 완충 작용을 하고, 리더보드는 Redis를 통해 초고속 조회를 가능하게 했습니다
- **보안/격리**: 사용자가 제출한 위험할 수 있는 코드를 처리하기 위해 별도의 격리된 워커(Isolated Workers) 환경을 구축한 것이 특징입니다
- **성능 최적화**: 쓰기 작업(제출)과 읽기 작업(리더보드 조회)의 부하를 분리하여 설계함으로써 시스템의 안정성을 높였습니다

---

## HelloInterview의 문제 제기 및 개선 방안

다만 해당 HelloInterview에서는 다음과 같은 문제제기가 있습니다:

> Nice design! You picked strong patterns like Redis sorted sets for neighbor lookups and a queue plus prewarmed sandboxes for bursty submissions. The strongest insight is decoupling evaluation via Kafka so you can absorb contest spikes. The most critical weakness is the mismatch between an async execution pipeline and a synchronous PASS/FAIL submission API, which will break under load and make retries unsafe. Tightening the API/processing contract, clarifying leaderboard consistency, and hardening sandbox isolation would make this production-ready.

### 주요 문제점

1. **비동기 API/처리 불일치 및 비멱등성 제출**
   - POST가 즉시 PASS/FAIL을 반환하면서 동시에 Kafka를 통해 비동기 처리하고 SSE로 결과를 스트리밍하는 구조
   - 피크 부하 시 동기 실행이 타임아웃되거나 재시도 시 이중 실행 발생
   - 혼합된 동기/비동기 의미론으로 인한 일관성 없는 사용자 경험

2. **샌드박스 격리 미흡**
   - "dockerized containers"에만 의존하고 커널 격리(seccomp/AppArmor), 파일시스템/네트워크 잠금, microVM에 대한 상세가 없음
   - 컨테이너 탈출이나 리소스 고갈로 호스트가 손상되거나 테스트 데이터가 유출될 수 있음

3. **리더보드 일관성 및 지연 시간 문제**
   - "Postgres → Redis" 업데이트가 "interval polling for latest"로 이루어지며, 점수 모델/동점자 처리 규칙이 정의되지 않음
   - 버스트 중 오래된 또는 순서가 잘못된 순위가 발생할 수 있음

4. **데이터 모델링 확장성 부족**
   - Competition.participantIds를 배열로 저장하고 Problem.testCases를 Postgres 행에 인라인으로 저장하면 행이 비대해지고 쿼리 성능이 저하됨

---

## 개선된 해결 방안

사용자께서 제공하신 내용은 앞서 분석한 설계의 취약점을 보완하기 위한 상세한 개선 로직과 아키텍처 해결 방안입니다. 핵심은 **'비동기 처리의 일관성 확보'**와 **'보안 강화'**입니다.

### 1. API 통신 방식의 변경 (비동기화 및 멱등성)

**문제**: 제출 즉시 PASS/FAIL을 반환하면 부하 발생 시 타임아웃이나 중복 실행 문제가 생깁니다.

**해결**:

- 제출 시 즉시 결과 대신 **Job ID(작업 핸들)**를 반환하는 완전 비동기 방식으로 전환합니다
- **Idempotency-Key(중복 방지 키)**를 도입하여 클라이언트가 재시도해도 서버에서 중복 실행되지 않도록 보장합니다
- 결과는 SSE(Server-Sent Events)나 웹소켓을 통해 푸시하거나, 클라이언트가 작업 상태를 폴링(Polling)해서 가져옵니다

**예시**:
\`\`\`
POST /submissions
{ competitionId, problemId, code, language }
Headers: Idempotency-Key: <uuid>
→ 202 { submissionId, status: "QUEUED" }

GET /submissions/:id → { status, verdict, runtime, memory, message }
SSE/WebSocket: /competitions/:id/stream (events: submissionUpdated, leaderboardUpdated)
\`\`\`

### 2. 코드 실행 및 샌드박스 보안 강화

**문제**: 단순한 도커 컨테이너는 컨테이너 탈출이나 리소스 고갈 공격에 취약합니다.

**해결**:

- **microVM(Firecracker, gVisor)**을 사용하여 커널 수준에서 실행 환경을 완전히 격리합니다
- 네트워크 접속 차단(Default-deny), 파일 시스템 읽기 전용 설정, CPU/메모리/실행 시간의 엄격한 제한(cgroups v2)을 적용합니다
- Prewarm 풀을 언어별로 구성하고 최대 동시성 제한을 둡니다

**구현 예시**:
\`\`\`python
import subprocess

def run_secure_code(user_code, lang, timeout=2, mem_limit="256m"):
    docker_cmd = [
        "docker", "run", "--rm",
        "--runtime=runsc",  # gVisor 적용
        "--network", "none",  # 외부 인터넷 차단
        "--memory", mem_limit,
        "-v", "/tmp/solution.py:/app/solution.py:ro",  # 읽기 전용
        "python:3.10-slim",
        "python3", "/app/solution.py"
    ]
    result = subprocess.run(docker_cmd, capture_output=True, text=True, timeout=timeout)
    return {"stdout": result.stdout, "stderr": result.stderr, "exit_code": result.returncode}
\`\`\`

### 3. 데이터 모델 및 확장성 최적화

**문제**: 대회 참가자 목록을 배열로 저장하거나 테스트 케이스를 DB 행에 직접 넣으면 성능이 저하됩니다.

**해결**:

- **조인 테이블(Join Table)**을 사용하여 참가자 관계를 관리합니다
- 대용량 테스트 케이스 데이터는 DB가 아닌 S3/GCS 같은 객체 스토리지에 별도로 저장하고 DB에는 경로(Hash/URL)만 저장합니다

**스키마 예시**:
\`\`\`sql
-- 제출 정보 테이블 (Idempotency Key 포함)
CREATE TABLE submissions (
    id UUID PRIMARY KEY,
    user_id INT NOT NULL,
    problem_id INT NOT NULL,
    competition_id INT,
    code TEXT NOT NULL,
    language VARCHAR(20),
    status VARCHAR(20) DEFAULT 'PENDING',
    idempotency_key VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 참가자 조인 테이블
CREATE TABLE competition_participants (
    competition_id INT,
    user_id INT,
    registered_at TIMESTAMP,
    PRIMARY KEY (competition_id, user_id)
);
\`\`\`

### 4. 실시간 리더보드 일관성 유지

**문제**: 수만 명이 동시에 리더보드를 새로고침(Polling)하면 서버가 마비됩니다.

**해결**:

- Redis Sorted Set을 활용하되, 점수 계산 시 '해결 문제 수'와 '패널티 시간'을 하나의 스코어로 인코딩하여 저장합니다
- 데이터베이스(Postgres)를 원천 데이터(Source of Truth)로 삼고, **Transactional Outbox 패턴**을 사용해 DB 업데이트와 Redis 갱신이 원자적으로 일어나게 합니다
- 클라이언트에게는 SSE/웹소켓을 통해 실시간 순위 변화를 브로드캐스트합니다

**점수 계산 공식**:
\`\`\`
Score = (Solved Count × 10^10) + (10^9 - Total Penalty Time)
\`\`\`

이렇게 설계하면 많이 맞춘 사람이 무조건 상위에 오르고, 맞춘 개수가 같다면 패널티 시간이 적은 사람이 높은 점수를 갖게 되어 원자적으로 정렬이 가능합니다.

### 5. 부하 제어 및 복구 전략 (Backpressure)

**문제**: 제출량이 처리 속도를 넘어서면 시스템이 마비됩니다.

**해결**:

- Kafka의 지연(Lag) 정도에 따라 워커(Worker) 노드를 자동으로 확장(Autoscale)합니다
- 사용자별/대회별 호출 제한(Rate Limit)을 두어 특정 사용자의 과도한 제출을 차단합니다
- Redis 캐시 유실 시 DB를 바탕으로 리더보드를 재구축하는 복구 프로세스를 갖춥니다

---

## 개선된 비동기 시퀀스 다이어그램

### 처리 순서

1. **사용자**: 코드 제출 (Idempotency Key 포함)
2. **서버**: DB에 '대기 중' 상태 저장 후 Kafka에 메시지 발행, 사용자에게 jobId 즉시 반환
3. **워커**: Kafka에서 메시지 수신 → gVisor 샌드박스에서 실행 → 결과 생성
4. **채점 서비스**: DB 결과 업데이트 및 리더보드 갱신 이벤트 발행
5. **알림 서비스**: SSE를 통해 사용자 화면에 "정답입니다!" 결과 푸시

이 구조를 도입하면 10만 명 이상의 대규모 대회에서도 서버 타임아웃 없이 안정적으로 서비스를 운영할 수 있습니다.

---

## 최종 통합 아키텍처 요약

1. **클라이언트 (User)**: POST /submissions 호출 (Idempotency-Key 포함). 결과 대기를 위해 SSE 채널 구독
2. **API 서버 (EKS)**: 요청을 받으면 DB에 PENDING 상태로 저장 후, 즉시 Kafka의 submission.eval 토픽으로 메시지 발행. 사용자에게는 202 Accepted 응답
3. **워커 (Worker, gVisor)**: Kafka에서 메시지를 가져와 gVisor 샌드박스에서 코드 실행. 결과(Verdict)를 도출하여 eval.results 토픽으로 발행
4. **결과 처리 서비스**: 결과를 DB에 영구 저장하고, Transactional Outbox를 통해 리더보드 갱신 이벤트를 발생시킴
5. **리더보드 프로젝터**: 이벤트를 읽어 **Redis(Sorted Set)**의 점수를 업데이트
6. **실시간 알림 (SSE)**: 업데이트된 결과를 사용자에게 실시간 전송

---

## 장애 대응 및 데이터 정합성 (Resilience)

### Kafka 소비자 장애
워커가 다운되어도 메시지는 Kafka에 안전하게 보관됩니다. 워커가 복구되면 마지막으로 읽었던 지점(Offset)부터 다시 처리를 시작하므로 데이터 유실이 없습니다.

### Redis 캐시 유실
Redis 데이터가 삭제되더라도, Source of Truth인 Aurora DB에 모든 결과가 있으므로, DB의 leaderboard 테이블을 기반으로 Redis를 즉시 재구축(Rebuild)할 수 있습니다.

### 워커 무한 루프 공격
스크립트의 timeout 설정과 Docker의 cpus 제한을 통해 특정 사용자의 코드가 전체 워커 리소스를 점유하지 못하게 차단합니다.

---

## 결론

제시된 해결책은 시스템을 **"안정적인 비동기 구조"**로 바꾸는 것에 초점이 맞춰져 있습니다. 사용자가 코드를 제출하면 시스템은 일단 "접수됨"을 알리고, 뒤에서 안전하게 격리된 환경에서 코드를 실행한 뒤, 그 결과를 이벤트 방식으로 리더보드와 사용자에게 전달하는 것이 가장 이상적인 운영 모델입니다.

기존에 지적된 동기식(Sync) 처리의 한계를 해결하고, 대규모 트래픽에서도 데이터 무결성과 보안을 유지할 수 있는 개선된 비동기(Async) 아키텍처를 제안합니다.

이 구조는 실제 리트코드(LeetCode)나 백준 같은 대형 플랫폼이 겪는 기술적 난제들을 해결할 수 있는 강력한 모델입니다.`
    },
    en: {
      title: 'From HelloInterview - Leetcode System Architecture',
      description: 'Analysis of LeetCode online judge system design and improvements excerpted from HelloInterview.',
      content: `> This post is excerpted from [HelloInterview Community](https://www.hellointerview.com/community/submissions/cmiiabtob012l08ad3i6mmakl).

![LeetCode System Design](/design-leetcode.png)

The content presented in the image is about **'LeetCode (Online Coding Test Platform) System Design'**. Based on the provided design diagram and requirements, I will analyze and summarize the main content.

## 1. Requirements Analysis

### Functional Requirements

- Users can submit solutions and check results
- Real-time leaderboard for global users
- Support for large-scale competitions (100,000 participants, 1-hour duration)

### Non-Functional Requirements

- Leaderboard query latency must be under 500ms
- High data integrity and availability
- Handle high write throughput during peak submission times

## 2. Core Entities

Main data models that constitute the system:

- **User**: User information
- **Solution**: Submitted code, language, execution results (Pass/Fail)
- **Problem**: Problem description, constraints, test cases
- **Competition**: Competition information (start/end time, participant list)

## 3. System Architecture and Flow

The overall flow follows the structure: API Gateway → Service Layer → Async Processing → Data Storage.

### 1) Submission and Execution Flow (Solution Service)

- When clients submit code, it goes through API Gateway to Solution Service (Write heavy)
- **Kafka Queue**: Uses message queue to control (throttle) sudden submission spikes and distribute system load
- **Code Execution Workers**: Execute code in isolated environments (Docker containers, etc.) for security, running code in various languages like Java, Python, Go, and reading results

### 2) Data Storage and Retrieval

- **Relational DB (PostgreSQL/MySQL)**: Permanently stores user information, problem details, submission results
- **Leaderboard Service (Read heavy)**: Specialized processing of leaderboard information
- **Redis (Sorted Set)**: Uses in-memory DB Redis for real-time ranking calculations. One Sorted Set per competition is configured to enable fast score-based ranking queries

### 3) Real-time Feedback

When code execution completes, results are returned to clients through Solution Service (using SSE or Polling), and simultaneously delivered to leaderboard service for immediate ranking updates.

## 4. API Design

- \`POST /competitions/:id/submissions\`: Code submission
- \`GET /competitions/:id/leaderboard\`: Leaderboard query (with pagination)
- \`GET /competitions/:id/submissions\`: Check own submission history

## 5. Key Summary

The core of this design is **"Scalability and Isolation"**.

- **Scalability**: Introduces Kafka to buffer explosive traffic during large competitions, and enables ultra-fast queries through Redis for leaderboards
- **Security/Isolation**: Features a separate isolated worker environment to handle potentially dangerous code submitted by users
- **Performance Optimization**: Separates write (submission) and read (leaderboard query) workloads to improve system stability

---

## HelloInterview's Issues and Improvements

However, HelloInterview raises the following issues:

> Nice design! You picked strong patterns like Redis sorted sets for neighbor lookups and a queue plus prewarmed sandboxes for bursty submissions. The strongest insight is decoupling evaluation via Kafka so you can absorb contest spikes. The most critical weakness is the mismatch between an async execution pipeline and a synchronous PASS/FAIL submission API, which will break under load and make retries unsafe.

### Main Issues

1. **Async API/Processing Mismatch and Non-idempotent Submissions**
   - Structure where POST returns immediate PASS/FAIL while also processing asynchronously through Kafka and streaming results via SSE
   - Synchronous runs timeout or double-execute on retries under peak load
   - Inconsistent user experience due to mixed sync/async semantics

2. **Insufficient Sandbox Isolation**
   - Relies only on "dockerized containers" without details on kernel isolation (seccomp/AppArmor), filesystem/network lockdown, or microVMs
   - Container escape or resource exhaustion can compromise hosts or leak test data

3. **Leaderboard Consistency and Latency Issues**
   - Updates flow "Postgres → Redis" via "interval polling for latest" without defined scoring model/tie-breaker rules
   - Stale or out-of-order rankings can occur during bursts

4. **Data Modeling Scalability Issues**
   - Storing Competition.participantIds as arrays and Problem.testCases inline in Postgres rows causes row bloat and query performance degradation

---

## Improved Solutions

The content provided addresses detailed improvement logic and architectural solutions to complement the design's weaknesses. The core is **"ensuring async processing consistency"** and **"security hardening"**.

### 1. API Communication Method Change (Async and Idempotency)

**Problem**: Returning immediate PASS/FAIL on submission causes timeout or duplicate execution issues under load.

**Solution**:

- Switch to fully async mode returning **Job ID (job handle)** instead of immediate results
- Introduce **Idempotency-Key** to ensure server doesn't duplicate execution even if client retries
- Push results via SSE (Server-Sent Events) or WebSocket, or allow clients to poll job status

**Example**:
\`\`\`
POST /submissions
{ competitionId, problemId, code, language }
Headers: Idempotency-Key: <uuid>
→ 202 { submissionId, status: "QUEUED" }

GET /submissions/:id → { status, verdict, runtime, memory, message }
SSE/WebSocket: /competitions/:id/stream (events: submissionUpdated, leaderboardUpdated)
\`\`\`

### 2. Code Execution and Sandbox Security Hardening

**Problem**: Simple Docker containers are vulnerable to container escape or resource exhaustion attacks.

**Solution**:

- Use **microVM (Firecracker, gVisor)** to completely isolate execution environment at kernel level
- Apply network access blocking (Default-deny), read-only filesystem settings, strict CPU/memory/execution time limits (cgroups v2)
- Configure prewarm pools per language with maximum concurrency limits

### 3. Data Model and Scalability Optimization

**Problem**: Storing competition participant lists as arrays or test cases directly in DB rows degrades performance.

**Solution**:

- Use **Join Tables** to manage participant relationships
- Store large test case data separately in object storage like S3/GCS, storing only paths (Hash/URL) in DB

### 4. Real-time Leaderboard Consistency Maintenance

**Problem**: Tens of thousands of users refreshing leaderboards simultaneously crashes the server.

**Solution**:

- Use Redis Sorted Set but encode 'solved count' and 'penalty time' as a single score for storage
- Use database (Postgres) as Source of Truth and **Transactional Outbox pattern** to atomically update DB and Redis
- Broadcast real-time ranking changes to clients via SSE/WebSocket

**Score Calculation Formula**:
\`\`\`
Score = (Solved Count × 10^10) + (10^9 - Total Penalty Time)
\`\`\`

### 5. Load Control and Recovery Strategy (Backpressure)

**Problem**: System crashes when submission volume exceeds processing speed.

**Solution**:

- Auto-scale worker nodes based on Kafka lag
- Implement per-user/per-competition rate limits to block excessive submissions
- Have recovery process to rebuild leaderboard from DB when Redis cache is lost

---

## Conclusion

The proposed solutions focus on transforming the system into a **"stable async structure"**. When users submit code, the system first acknowledges "received", then executes code in a safely isolated environment, and delivers results to leaderboard and users via events - this is the ideal operational model.

This addresses the limitations of synchronous (Sync) processing and proposes an improved async (Async) architecture that maintains data integrity and security even under large-scale traffic.

This structure is a powerful model that can solve technical challenges faced by large platforms like LeetCode or Baekjoon.`
    }
  },
  {
    slug: 'apache-ambari-hadoop-heap-memory-issue',
    tags: ['Hadoop', 'Spark', 'Hive'],
    date: 'January 15, 2024',
    readTime: '5 min read',
    views: 0,
    kr: {
      title: 'Apache Ambari Hadoop서비스에서 겪었던 문제 & 해결 review - Heap 메모리 부족',
      description: 'Apache Ambari Hadoop 환경에서 1GB 이상의 쿼리를 처리할 때 발생한 Heap 메모리 부족 문제와 해결 방법에 대한 리뷰입니다.',
      content: `지난 인프라 구조는 다음과 같았습니다.

* Bastion Host 구조
* Namenode 1대
* 12대의 datanode

해당 인프라 구조에서 주로 2개의 게임 서비스(Elyon, TERA)를 운영하였고 평균 쿼리 사이즈가 1GB를 상회했었습니다.

![Figure 1. Bastion Host - Apache Ambari Hadoop Ecosystem Architecture](/hadoop-architecture.png)

그러나 해당 인프라를 운영하면서 유독 Heap 메모리 부족으로 많은 인프라 장애를 앓고 있었습니다. 관련 유력 원인은 다음과 같습니다.

#### 1. YARN NodeManager/ResourceManager 메모리 부족

* 컨테이너 할당이 물리 메모리를 초과할 때
* yarn.nodemanager.resource.memory-mb 설정이 실제 가용 메모리보다 클 때
* Java heap이 작은데 많은 애플리케이션이 동시 실행될 때

#### 2. MapReduce Job의 메모리 설정 문제

* Map/Reduce task의 heap size가 너무 작게 설정 (mapreduce.map.java.opts, mapreduce.reduce.java.opts)
* 대용량 데이터 처리 시 메모리 버퍼 부족
* Shuffle 단계에서 메모리 초과

#### 3. HBase RegionServer OOM

* MemStore 크기 설정이 부적절할 때
* BlockCache와 MemStore 합이 heap의 80%를 초과할 때
* 대량의 동시 요청 처리 시

#### 4. Hive/Tez 실행 엔진

* Tez AM (Application Master) heap 부족
* 복잡한 쿼리의 실행 계획 생성 시
* 조인이나 집계 연산의 중간 결과가 메모리에 쌓일 때

그러나 당시 상황 로그 분석 및 자료들 분석 결과, 1GB 정도 쿼리를 돌리는 환경에서 YARN 메모리 부족이 자주 발생했다면, 전형적인 메모리 오버커밋(over-commit) 문제였을 가능성이 높습니다.

## 당시 상황 분석

xlarge 인스턴스 (보통 4 vCPU, 16GB RAM 기준)

* 실제 가용 메모리: ~14GB (OS, 데몬 제외)
* DataNode가 사용: ~2GB
* NodeManager가 컨테이너에 할당 가능: 이론상 ~12GB

### 문제 발생 시나리오:

\`\`\`
yarn.nodemanager.resource.memory-mb = 12288 (12GB)
mapreduce.map.memory.mb = 2048 (2GB)
mapreduce.reduce.memory.mb = 4096 (4GB)

→ Map task 6개 or Reduce task 3개까지만 가능
→ 하지만 Java heap + off-heap 메모리가 실제로는 더 사용됨
\`\`\`

## 1GB 쿼리에서 왜 문제가?

### Multiple Map tasks 동시 실행

1GB 데이터 → HDFS block 단위(128MB)로 나뉨 → 약 8개 Map task

각 Map task가 2GB 메모리 요청

노드당 6개만 가능한데 8개가 스케줄링되면 대기/재시도

### Reduce 단계의 메모리 압박

Shuffle/Sort 단계에서 메모리 버퍼 사용

\`mapreduce.reduce.shuffle.memory.limit.percent\` (기본 0.25)

4GB reduce task의 경우 실제 heap 3GB + shuffle buffer 1GB = 실제 4GB+ 사용

### Container 메모리 vs Java Heap 불일치

\`\`\`
mapreduce.map.memory.mb = 2048
mapreduce.map.java.opts = -Xmx1638m  (80% 권장)

→ 나머지 400MB는 off-heap, overhead
→ 실제로는 2GB 이상 사용하는 경우 발생
\`\`\`

## 전형적인 에러 로그

\`\`\`
Container killed by YARN for exceeding memory limits. 
2.1 GB of 2 GB physical memory used.
\`\`\`

## 당시 해결 방법들

### 즉시 조치:

* \`yarn.nodemanager.resource.memory-mb\`를 10GB로 축소
* \`yarn.nodemanager.vmem-check-enabled=false\` (임시 우회)

### 근본적 해결:

* Map/Reduce task 메모리를 더 여유있게 (2GB → 3GB)
* 동시 실행 task 수 제한
* DataNode heap 메모리 최적화 (불필요하게 크면 줄임)

위의 근본적 해결방법 중 Map/Reduce task 메모리를 더 여유있게 (2GB → 3GB) 해당 내용에 대한 조치를 순서대로 알아보겠습니다.

### Ambari UI에서 변경 (가장 일반적)

#### 1. MapReduce2 설정

Ambari Web UI → Services → MapReduce2 → Configs → Advanced

[Memory 관련 설정]

\`mapreduce.map.memory.mb\` = 3072 (2048 → 3072)

\`mapreduce.reduce.memory.mb\` = 6144 (4096 → 6144)

[Java Heap 설정 - 80% 규칙]

\`mapreduce.map.java.opts\` = -Xmx2457m (80% of 3072)

\`mapreduce.reduce.java.opts\` = -Xmx4915m (80% of 6144)

#### 2. YARN 설정도 함께 확인

Services → YARN → Configs

\`yarn.scheduler.minimum-allocation-mb\` = 1024

\`yarn.scheduler.maximum-allocation-mb\` = 8192 (task가 요청 가능한 최대치)

\`yarn.nodemanager.resource.memory-mb\` = 10240 (노드당 할당 가능 총량)

### 설정 파일로 직접 변경 (모든 노드)

\`mapred-site.xml\` (보통 /etc/hadoop/conf/)

\`\`\`
<property>
  <name>mapreduce.map.memory.mb</name>
  <value>3072</value>
</property>

<property>
  <name>mapreduce.reduce.memory.mb</name>
  <value>6144</value>
</property>

<property>
  <name>mapreduce.map.java.opts</name>
  <value>-Xmx2457m</value>
</property>

<property>
  <name>mapreduce.reduce.java.opts</name>
  <value>-Xmx4915m</value>
</property>
\`\`\`

### Job 실행 시 동적으로 변경 (임시 테스트용)

Hive 쿼리 실행 전:

\`\`\`
SET mapreduce.map.memory.mb=3072;
SET mapreduce.reduce.memory.mb=6144;
SET mapreduce.map.java.opts=-Xmx2457m;
SET mapreduce.reduce.java.opts=-Xmx4915m;

SELECT ... -- 실제 쿼리
\`\`\`

Spark submit 시:

\`\`\`
spark-submit \\
  --conf spark.executor.memory=3g \\
  --conf spark.driver.memory=2g \\
  your_job.py
\`\`\`

### 변경 후 필수 작업

\`\`\`
# Ambari에서 변경 시:
1. "Save" 클릭
2. "Restart All Required Services" (NodeManager 재시작 필요)

# 직접 변경 시:
ambari-server restart
# 또는
sudo systemctl restart hadoop-yarn-nodemanager
\`\`\`

## 실전 팁

메모리 계산 공식:

\`\`\`
Java Heap = Container Memory × 0.8

예시:
Container 3GB (3072MB) → Heap 2457MB (-Xmx2457m)
Container 6GB (6144MB) → Heap 4915MB (-Xmx4915m)
\`\`\`

왜 80%인가?

* 나머지 20%는 JVM overhead, off-heap, native memory 사용
* 100%로 설정하면 Container killed 발생`
    },
    en: {
      title: 'Apache Ambari Hadoop Service Issues & Solutions Review - Heap Memory Insufficiency',
      description: 'A review of Heap memory insufficiency issues and solutions that occurred when processing queries over 1GB in an Apache Ambari Hadoop environment.',
      content: `The previous infrastructure structure was as follows:

* Bastion Host structure
* 1 Namenode
* 12 datanodes

This infrastructure primarily operated 2 game services (Elyon, TERA), with average query sizes exceeding 1GB.

![Figure 1. Bastion Host - Apache Ambari Hadoop Ecosystem Architecture](/hadoop-architecture.png)

However, while operating this infrastructure, we frequently experienced infrastructure failures due to Heap memory insufficiency. The likely causes are as follows:

#### 1. YARN NodeManager/ResourceManager Memory Insufficiency

* When container allocation exceeds physical memory
* When yarn.nodemanager.resource.memory-mb setting is larger than actual available memory
* When Java heap is small but many applications run simultaneously

#### 2. MapReduce Job Memory Configuration Issues

* Map/Reduce task heap size set too small (mapreduce.map.java.opts, mapreduce.reduce.java.opts)
* Memory buffer shortage during large-scale data processing
* Memory overflow during Shuffle phase

#### 3. HBase RegionServer OOM

* When MemStore size configuration is inappropriate
* When the sum of BlockCache and MemStore exceeds 80% of heap
* When processing large volumes of concurrent requests

#### 4. Hive/Tez Execution Engine

* Tez AM (Application Master) heap insufficiency
* When generating execution plans for complex queries
* When intermediate results of joins or aggregation operations accumulate in memory

However, based on log analysis and data review at the time, if YARN memory insufficiency frequently occurred in an environment processing approximately 1GB queries, it was likely a typical memory over-commit problem.

## Situation Analysis at the Time

xlarge instance (typically 4 vCPU, 16GB RAM)

* Actual available memory: ~14GB (excluding OS, daemons)
* DataNode usage: ~2GB
* NodeManager container allocation possible: theoretically ~12GB

### Problem Scenario:

\`\`\`
yarn.nodemanager.resource.memory-mb = 12288 (12GB)
mapreduce.map.memory.mb = 2048 (2GB)
mapreduce.reduce.memory.mb = 4096 (4GB)

→ Only 6 Map tasks or 3 Reduce tasks possible
→ But Java heap + off-heap memory actually uses more
\`\`\`

## Why Problems with 1GB Queries?

### Multiple Map Tasks Concurrent Execution

1GB data → divided into HDFS block units (128MB) → approximately 8 Map tasks

Each Map task requests 2GB memory

Only 6 possible per node, but if 8 are scheduled, waiting/retry occurs

### Memory Pressure in Reduce Phase

Memory buffer usage during Shuffle/Sort phase

\`mapreduce.reduce.shuffle.memory.limit.percent\` (default 0.25)

For 4GB reduce task: actual heap 3GB + shuffle buffer 1GB = actual 4GB+ usage

### Container Memory vs Java Heap Mismatch

\`\`\`
mapreduce.map.memory.mb = 2048
mapreduce.map.java.opts = -Xmx1638m  (80% recommended)

→ Remaining 400MB is off-heap, overhead
→ Cases where 2GB+ is actually used occur
\`\`\`

## Typical Error Log

\`\`\`
Container killed by YARN for exceeding memory limits. 
2.1 GB of 2 GB physical memory used.
\`\`\`

## Solutions at the Time

### Immediate Actions:

* Reduce \`yarn.nodemanager.resource.memory-mb\` to 10GB
* \`yarn.nodemanager.vmem-check-enabled=false\` (temporary workaround)

### Fundamental Solutions:

* Increase Map/Reduce task memory more generously (2GB → 3GB)
* Limit concurrent task execution count
* Optimize DataNode heap memory (reduce if unnecessarily large)

Among the fundamental solutions above, let's examine the steps for increasing Map/Reduce task memory more generously (2GB → 3GB).

### Changing via Ambari UI (Most Common)

#### 1. MapReduce2 Configuration

Ambari Web UI → Services → MapReduce2 → Configs → Advanced

[Memory-related Settings]

\`mapreduce.map.memory.mb\` = 3072 (2048 → 3072)

\`mapreduce.reduce.memory.mb\` = 6144 (4096 → 6144)

[Java Heap Settings - 80% Rule]

\`mapreduce.map.java.opts\` = -Xmx2457m (80% of 3072)

\`mapreduce.reduce.java.opts\` = -Xmx4915m (80% of 6144)

#### 2. Also Check YARN Configuration

Services → YARN → Configs

\`yarn.scheduler.minimum-allocation-mb\` = 1024

\`yarn.scheduler.maximum-allocation-mb\` = 8192 (maximum requestable by tasks)

\`yarn.nodemanager.resource.memory-mb\` = 10240 (total allocatable per node)

### Direct File Configuration (All Nodes)

\`mapred-site.xml\` (usually /etc/hadoop/conf/)

\`\`\`
<property>
  <name>mapreduce.map.memory.mb</name>
  <value>3072</value>
</property>

<property>
  <name>mapreduce.reduce.memory.mb</name>
  <value>6144</value>
</property>

<property>
  <name>mapreduce.map.java.opts</name>
  <value>-Xmx2457m</value>
</property>

<property>
  <name>mapreduce.reduce.java.opts</name>
  <value>-Xmx4915m</value>
</property>
\`\`\`

### Dynamic Change During Job Execution (Temporary Testing)

Before Hive query execution:

\`\`\`
SET mapreduce.map.memory.mb=3072;
SET mapreduce.reduce.memory.mb=6144;
SET mapreduce.map.java.opts=-Xmx2457m;
SET mapreduce.reduce.java.opts=-Xmx4915m;

SELECT ... -- actual query
\`\`\`

Spark submit:

\`\`\`
spark-submit \\
  --conf spark.executor.memory=3g \\
  --conf spark.driver.memory=2g \\
  your_job.py
\`\`\`

### Required Tasks After Changes

\`\`\`
# When changing via Ambari:
1. Click "Save"
2. "Restart All Required Services" (NodeManager restart required)

# When changing directly:
ambari-server restart
# or
sudo systemctl restart hadoop-yarn-nodemanager
\`\`\`

## Practical Tips

Memory calculation formula:

\`\`\`
Java Heap = Container Memory × 0.8

Example:
Container 3GB (3072MB) → Heap 2457MB (-Xmx2457m)
Container 6GB (6144MB) → Heap 4915MB (-Xmx4915m)
\`\`\`

Why 80%?

* Remaining 20% is for JVM overhead, off-heap, native memory usage
* Setting to 100% causes Container killed`
    }
  }
]

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [language, setLanguage] = useState<'kr' | 'en'>('kr')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem('language') as 'kr' | 'en' | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    const handleStorageChange = () => {
      const savedLanguage = localStorage.getItem('language') as 'kr' | 'en' | null
      if (savedLanguage) {
        setLanguage(savedLanguage)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    // Also listen for custom event from LanguageToggle
    window.addEventListener('languageChange', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('languageChange', handleStorageChange)
    }
  }, [])

  const post = posts.find(p => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  if (!mounted) {
    return null
  }

  const postContent = language === 'kr' ? post.kr : post.en
  const backText = language === 'kr' ? '← 목록으로 돌아가기' : '← Back to blog'
  const coAuthoredText = language === 'kr' ? 'Co-authored with Claude Sonnet-4.5' : 'Co-authored with Claude Sonnet-4.5'

  return (
    <article className="min-h-screen max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 inline-block">
        {backText}
      </Link>
      
      {/* Main Title */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">{postContent.title}</h1>
      
      {/* Description/Summary */}
      <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">{postContent.description}</p>
      
      {/* Metadata: readTime | views | date */}
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {post.readTime} · {post.views} views · Published {post.date}
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      
      {/* Co-authored */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 italic flex items-center gap-1.5">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {coAuthoredText}
      </p>
      <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
        <ReactMarkdown 
          components={{
            h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white" {...props} />,
            h4: ({node, ...props}) => <h4 className="text-lg font-semibold mt-3 mb-2 text-gray-900 dark:text-white" {...props} />,
            p: ({node, ...props}) => <p className="mb-4 text-gray-700 dark:text-gray-300" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300" {...props} />,
            li: ({node, ...props}) => <li className="ml-4" {...props} />,
            code: ({node, inline, ...props}: any) => 
              inline ? (
                <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-200" {...props} />
              ) : (
                <code className="block bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm font-mono text-gray-800 dark:text-gray-200 overflow-x-auto mb-4" {...props} />
              ),
            pre: ({node, ...props}) => <pre className="mb-4" {...props} />,
            strong: ({node, ...props}) => <strong className="font-semibold text-gray-900 dark:text-white" {...props} />,
            em: ({node, ...props}) => <em className="italic text-gray-600 dark:text-gray-400" {...props} />,
            img: ({node, ...props}: any) => (
              <div className="my-6 flex flex-col items-center">
                <Image
                  src={props.src || ''}
                  alt={props.alt || ''}
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-lg max-w-3xl"
                />
                {props.alt && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center italic">
                    {props.alt}
                  </p>
                )}
              </div>
            ),
          }}
        >
          {postContent.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}
