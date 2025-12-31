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
