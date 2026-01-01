export interface PostContent {
  title: string
  description: string
}

export interface Post {
  slug: string
  tags: string[]
  date: string
  readTime: string
  views: number
  isDraft?: boolean
  kr: PostContent
  en: PostContent
}

export const allPosts: Post[] = [
  {
    slug: 'max-points-on-a-line',
    tags: ['Algorithm', 'Geometry', 'Interview', 'LeetCode'],
    date: 'January 3, 2026',
    readTime: '12 min read',
    views: 0,
    isDraft: false,
    kr: {
      title: 'Max Points on a Line',
      description: 'LeetCode 149번 문제 - 2차원 평면 위의 점들 중 같은 직선 위에 있는 점의 최대 개수를 구하는 알고리즘 분석'
    },
    en: {
      title: 'Max Points on a Line',
      description: 'Analysis of LeetCode 149 - Finding the maximum number of points that lie on the same straight line'
    }
  },
  {
    slug: 'all-o1-data-structure',
    tags: ['Algorithm', 'Data Structure', 'Interview', 'LeetCode'],
    date: 'January 2, 2026',
    readTime: '10 min read',
    views: 0,
    isDraft: false,
    kr: {
      title: 'All-O(1) Data Structure',
      description: 'HelloInterview에서 발췌한 LeetCode 432번 문제 - 모든 연산을 O(1) 시간에 수행하는 데이터 구조 설계 방법을 분석합니다.'
    },
    en: {
      title: 'All-O(1) Data Structure',
      description: 'Analysis of LeetCode 432 - Designing a data structure that supports all operations in O(1) time, excerpted from HelloInterview.'
    }
  },
  {
    slug: 'hello-interview',
    tags: ['System Design', 'Architecture', 'Interview'],
    date: 'January 1, 2026',
    readTime: '15 min read',
    views: 0,
    isDraft: false,
    kr: {
      title: 'From HelloInterview - Leetcode System Architecture',
      description: 'HelloInterview에서 발췌한 LeetCode 온라인 저지 시스템 설계와 개선 방안을 분석합니다.'
    },
    en: {
      title: 'From HelloInterview - Leetcode System Architecture',
      description: 'Analysis of LeetCode online judge system design and improvements excerpted from HelloInterview.'
    }
  },
  {
    slug: 'apache-ambari-hadoop-heap-memory-issue',
    tags: ['Hadoop', 'Spark', 'Hive'],
    date: 'January 15, 2024',
    readTime: '5 min read',
    views: 0,
    isDraft: false,
    kr: {
      title: 'Apache Ambari Hadoop서비스에서 겪었던 문제 & 해결 review - Heap 메모리 부족',
      description: 'Apache Ambari Hadoop 환경에서 1GB 이상의 쿼리를 처리할 때 발생한 Heap 메모리 부족 문제와 해결 방법에 대한 리뷰입니다.'
    },
    en: {
      title: 'Apache Ambari Hadoop Service Issues & Solutions Review - Heap Memory Insufficiency',
      description: 'A review of Heap memory insufficiency issues and solutions that occurred when processing queries over 1GB in an Apache Ambari Hadoop environment.'
    }
  }
]



