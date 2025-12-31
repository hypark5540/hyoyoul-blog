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

