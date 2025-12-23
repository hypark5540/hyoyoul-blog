import { BlogPost } from "@/types/blog";

export const translations = {
  ko: {
    blog: {
      title: "Hyo Youl Blog",
      subtitle: "포트폴리오, 스터디 & 연구 모음",
      search: "Search",
      about: "About",
      backToList: "목록으로 돌아가기",
      readTime: (minutes: number) => `${minutes}분`,
      minutes: "분",
      noResults: "검색 결과가 없습니다",
      tryAnother: "다른 검색어를 시도해보세요",
      searchPlaceholder: "검색어를 입력하세요...",
      searchResults: (count: number) => `${count}개의 결과를 찾았습니다`,
      enterToSearch: "검색어를 입력하여 포스트를 찾아보세요",
      searchHint: "제목, 내용, 태그, 카테고리로 검색할 수 있습니다",
      sort: {
        latest: "최신순",
        popular: "인기순 (시청시간순)",
      },
      categories: {
        기술: "기술",
        튜토리얼: "튜토리얼",
        디자인: "디자인",
        생각: "생각",
      },
    },
    about: {
      title: "About",
      content: "",
    },
  },
  en: {
    blog: {
      title: "Hyo Youl Blog",
      subtitle: "Archive of Portfolio, Study & Research",
      search: "Search",
      about: "About",
      backToList: "Back to List",
      readTime: (minutes: number) => `${minutes} min`,
      minutes: "min",
      noResults: "No search results found",
      tryAnother: "Try a different search term",
      searchPlaceholder: "Enter search term...",
      searchResults: (count: number) => `Found ${count} results`,
      enterToSearch: "Enter a search term to find posts",
      searchHint: "You can search by title, content, tags, and category",
      sort: {
        latest: "Latest",
        popular: "Popular (by view time)",
      },
      categories: {
        기술: "Technology",
        튜토리얼: "Tutorial",
        디자인: "Design",
        생각: "Thoughts",
      },
    },
    about: {
      title: "About",
      content: `## Introduction

Experience in the gaming industry with a demonstrated history of data validation, design, analysis, and ETL pipeline development. Skilled in data architecture design optimized for game-specific characteristics, with strong capabilities in collaboration and communication with domestic and international game studios. Data Engineer and Architect with a Bachelor's degree.

---

## Work Experience

### KRAFTON Inc.
**Data Architect & Engineer** · Full-time  
September 2018 - Present · 7 years 4 months  
Seoul, South Korea · On-site

**■ Data Architect**

- Designed and optimized data architectures to enhance ETL efficiency and analytical query performance across multiple game titles
- Managed data structures using Databricks features including Medallion Architecture, Delta Live Tables, and Liquid Clustering
- Analyzed Governance team's unified architecture, conducted code reviews, and designed ETL structures for new titles ensuring consistency
- Developed unified packages for managing diverse game titles through team collaboration
- Built internal data management tools using C# and LINQPad, automating tasks and improving efficiency
- Managed MSSQL servers and implemented data extraction and ETL processes
- Provided unified reporting metrics to international studios

**■ Data Engineer**

- Supported large-scale big data platforms across Azure, AWS, Apache Ambari Hadoop, Hive, Spark, and Presto
- Contributed to DW systems development including S3, MySQL, and Databricks DLT
- Developed ETL workflow orchestration using Apache Airflow, Hadoop Workflow, Oozie, and Docker
- Ensured data integrity through log QA and validation with development studios
- Developed and maintained Django-based LogQA tool for rapid data delivery to external partners
- Created interactive dashboards with Tableau, delivering real-time insights to business teams
- Performed churn analysis, diagnostics, and FQ analysis
- Developed log generation modules using AWS Lambda and SDK
- Supported data analysis and query optimization using Python and PySpark for rapid post-launch decision-making

**■ Skills & Technologies**

- Big Data & DW: Databricks, Cloudera Hadoop, Apache Ambari Hadoop, MSSQL, MySQL, S3, Presto, DLT
- ETL Tools: Airflow, Hadoop Workflow, Presto, Hue
- Visualization: Tableau
- Coding: Python, PySpark, C#
- Use Cases: KPI Reporting, Post-Launch Monitoring, Funnel & Churn Analysis, LTV, FQ, Conversion Metrics
- Collaboration: Extensive experience with domestic and international studio stakeholders

**Skills**: Databricks · Python · AWS · Amazon S3 · Spark · Hadoop · Hive · Presto · MS SQL Server · Airflow · C# · Docker · DLT · MySQL


**■ Games Worked On**
![Games Collage](/games-collage.jpg)

---

## About the Portfolio

This page is a portfolio space introducing the projects I've worked on and my tech stack. I share various web development projects and experiences.

## Main Topics

- **Technology**: Latest web development technologies and trends
- **Development**: Practical experience and know-how
- **Thoughts**: Thoughts and concerns as a developer
- **Tutorial**: Practical development guides

## Tech Stack

This blog is built with the following technologies:

- **Next.js 14**: Full-stack framework based on React
- **TypeScript**: Language for type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animation library

## Contact

If you have any questions or suggestions, please feel free to contact us.

Thank you for visiting the blog!`,
    },
  },
};

// 포스트 영어 번역 데이터
export const postTranslations: Record<string, Partial<BlogPost>> = {
  "1": {
    title: "Problems & Solutions Review in Apache Ambari Hadoop Service - Heap Memory Shortage",
    excerpt: "Problems & Solutions Review in Apache Ambari Hadoop Service - Heap Memory Shortage",
    category: "Study",
    tags: ["Hadoop", "Spark", "Hive"],
    content: `The previous infrastructure structure was as follows:
- Bastion Host structure
- 1 Namenode
- 12 datanodes

This infrastructure primarily operated 2 game services (Elyon, TERA), and the average query size exceeded 1GB.

![Hadoop Ecosystem Architecture](/hadoop-architecture.png)

(Figure 1. Bastion Host - Apache Ambari Hadoop Ecosystem Architecture)

However, while operating this infrastructure, we frequently experienced infrastructure failures due to Heap memory shortages. The main potential causes are as follows:

1. YARN NodeManager/ResourceManager Memory Shortage
- When container allocation exceeds physical memory
- When \`yarn.nodemanager.resource.memory-mb\` setting is larger than actual available memory
- When Java heap is small but many applications run simultaneously

2. MapReduce Job Memory Configuration Issues
- Map/Reduce task heap size set too small (\`mapreduce.map.java.opts\`, \`mapreduce.reduce.java.opts\`)
- Memory buffer shortage during large-scale data processing
- Memory overflow during Shuffle phase

3. HBase RegionServer OOM
- When MemStore size configuration is inappropriate
- When BlockCache and MemStore combined exceed 80% of heap
- When processing large volumes of concurrent requests

4. Hive/Tez Execution Engine
- Tez AM (Application Master) heap shortage
- When generating execution plans for complex queries
- When intermediate results of join or aggregation operations accumulate in memory


However, based on log analysis and data review at the time, if YARN memory shortages frequently occurred in an environment running 1GB queries, it was likely a typical memory over-commit problem.

## Situation Analysis at the Time

xlarge instance (typically 4 vCPU, 16GB RAM)

- Actual available memory: ~14GB (excluding OS, daemons)
- DataNode usage: ~2GB
- NodeManager can allocate to containers: theoretically ~12GB

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
Only 6 possible per node, but if 8 are scheduled → waiting/retry

### Memory Pressure in Reduce Phase

Memory buffer usage during Shuffle/Sort phase
\`mapreduce.reduce.shuffle.memory.limit.percent\` (default 0.25)
For 4GB reduce task: actual heap 3GB + shuffle buffer 1GB = actual 4GB+ usage

### Container Memory vs Java Heap Mismatch

\`\`\`
mapreduce.map.memory.mb = 2048
mapreduce.map.java.opts = -Xmx1638m  (80% recommended)

→ Remaining 400MB is off-heap, overhead
→ Cases where more than 2GB is actually used occur
\`\`\`

## Typical Error Log

\`\`\`
Container killed by YARN for exceeding memory limits. 
2.1 GB of 2 GB physical memory used.
\`\`\`

## Solutions at the Time

### Immediate Actions:

- Reduced \`yarn.nodemanager.resource.memory-mb\` to 10GB
- \`yarn.nodemanager.vmem-check-enabled=false\` (temporary workaround)

### Fundamental Solutions:

- Increased Map/Reduce task memory more generously (2GB → 3GB)
- Limited concurrent task execution count
- Optimized DataNode heap memory (reduced if unnecessarily large)


Among the fundamental solutions above, let's look at the steps for increasing Map/Reduce task memory more generously (2GB → 3GB) in order.


### Changing via Ambari UI (Most Common)

1. MapReduce2 Configuration

Ambari Web UI → Services → MapReduce2 → Configs → Advanced

[Memory Related Settings]

\`mapreduce.map.memory.mb\` = 3072 (2048 → 3072)
\`mapreduce.reduce.memory.mb\` = 6144 (4096 → 6144)

[Java Heap Settings - 80% Rule]

\`mapreduce.map.java.opts\` = -Xmx2457m (80% of 3072)
\`mapreduce.reduce.java.opts\` = -Xmx4915m (80% of 6144)

2. Also Check YARN Configuration

Services → YARN → Configs

\`yarn.scheduler.minimum-allocation-mb\` = 1024
\`yarn.scheduler.maximum-allocation-mb\` = 8192 (maximum that tasks can request)
\`yarn.nodemanager.resource.memory-mb\` = 10240 (total allocatable per node)

### Direct Configuration File Changes (All Nodes)

\`mapred-site.xml\` (usually /etc/hadoop/conf/)

\`\`\`xml
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

### Dynamic Changes During Job Execution (Temporary Testing)

Before Hive Query Execution:
\`\`\`sql
SET mapreduce.map.memory.mb=3072;
SET mapreduce.reduce.memory.mb=6144;
SET mapreduce.map.java.opts=-Xmx2457m;
SET mapreduce.reduce.java.opts=-Xmx4915m;

SELECT ... -- actual query
\`\`\`

During Spark Submit:
\`\`\`bash
spark-submit \\
  --conf spark.executor.memory=3g \\
  --conf spark.driver.memory=2g \\
  your_job.py
\`\`\`

### Required Actions After Changes

\`\`\`bash
# When changing via Ambari:
1. Click "Save"
2. "Restart All Required Services" (NodeManager restart required)

# When changing directly:
ambari-server restart
# or
sudo systemctl restart hadoop-yarn-nodemanager
\`\`\`

## Practical Tips

Memory Calculation Formula:

\`\`\`
Java Heap = Container Memory × 0.8

Example:
Container 3GB (3072MB) → Heap 2457MB (-Xmx2457m)
Container 6GB (6144MB) → Heap 4915MB (-Xmx4915m)
\`\`\`

Why 80%?

- Remaining 20% is for JVM overhead, off-heap, native memory usage
- Setting to 100% causes Container killed errors`,
  },
  "2": {
    title: "Complete Guide to Next.js 14",
    excerpt: "Learn modern web development methods using Next.js 14's App Router and server actions.",
    category: "Tutorial",
    tags: ["Next.js", "Web Development"],
  },
  "3": {
    title: "TypeScript Best Practices",
    excerpt: "Share tips on how to use TypeScript more effectively and avoid common mistakes.",
    category: "Technology",
    tags: ["TypeScript", "Programming"],
  },
  "4": {
    title: "Mastering CSS Grid and Flexbox",
    excerpt: "Learn advanced techniques for CSS Grid and Flexbox to create modern layouts.",
    category: "Design",
    tags: ["CSS", "Web Design"],
  },
  "5": {
    title: "Web Performance Optimization Strategies",
    excerpt: "Introduce practical optimization techniques to improve website loading speed and user experience.",
    category: "Technology",
    tags: ["Performance", "Optimization"],
  },
  "6": {
    title: "AI and the Future of Developers",
    excerpt: "Think about the impact of artificial intelligence on development work and future changes.",
    category: "Thoughts",
    tags: ["AI", "Future"],
  },
  "7": {
    title: "Limitations of Data Driven Decision",
    excerpt: "Analyze the limitations that exist alongside the advantages of data-driven decision-making, and examine the problems that can occur when relying solely on data.",
    category: "Thoughts",
    tags: ["Data", "Decision Making", "Analytics"],
  },
  "8": {
    title: "Savermatrix <-> Game Status Integration",
    excerpt: "Explore methods to combine Savermatrix and Game Status systems to create a more efficient and integrated game data management solution.",
    category: "Technology",
    tags: ["Game Development", "System Design", "Data Management"],
  },
};

