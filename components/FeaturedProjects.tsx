'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface ProjectContent {
  title: string
  description: string
}

interface Project {
  kr: ProjectContent
  en: ProjectContent
  tags: string[]
  website?: string
  source?: string
  sourceUI?: string
}

const projects: Project[] = [
  {
    kr: {
      title: '데이터 구조 재구성 및 최적화',
      description: 'Medallion Architecture 정책을 적용하여 통합 KPI 관리를 간소화했습니다. 게임당 3-5개의 파이프라인을 1개로 통합하고, Liquid Clustering을 통해 쿼리 속도를 개선했습니다 (1시간 작업을 20분으로 단축).'
    },
    en: {
      title: 'Data Structure Reorganization and Optimization',
      description: 'Applied Medallion Architecture policies, streamlined integrated KPI management. Consolidated 3-5 pipelines per game into 1 pipeline, improved query speed through Liquid Clustering (reduced 1-hour tasks to 20 minutes).'
    },
    tags: ['S3', 'Databricks', 'Delta Lake', 'DLT', 'Liquid Clustering', 'Spark', 'Z-order']
  },
  {
    kr: {
      title: '통합 KPI 메트릭 전달',
      description: '이전에 각 게임 프로젝트별로 별도로 관리되던 KPI 대시보드를 통합했습니다. Medallion Architecture 기반 재구성을 통해 여러 내부 메트릭을 1개의 통합 메트릭으로 통합했습니다.'
    },
    en: {
      title: 'Integrated KPI Metrics Delivery',
      description: 'Unified and integrated KPI dashboards that were previously managed separately for each game project. Consolidated multiple in-house metrics into 1 integrated metric through Medallion Architecture-based reorganization.'
    },
    tags: ['S3', 'DLT', 'Tableau', 'Databricks', 'Python', 'Spark']
  },
  {
    kr: {
      title: '인프라 마이그레이션',
      description: '연간 2억원 규모의 AWS ETL 서비스를 6개월 내 Krafton 통합 Databricks 서비스로 마이그레이션했습니다. Hive/Presto 쿼리를 Unity Catalog 및 DLT 형식으로 재구성하여 80% 비용 절감을 달성했습니다 (연간 2억원 → 4천만원).'
    },
    en: {
      title: 'Infrastructure Migration',
      description: 'Migrated AWS ETL service (200M KRW annually) to Krafton\'s integrated Databricks service within 6 months. Achieved 80% cost savings (200M → 40M KRW annually) by reorganizing Hive/Presto queries to Unity Catalog and DLT format.'
    },
    tags: ['Databricks', 'DLT', 'Unity Catalog', 'Python', 'S3', 'AWS', 'Spark']
  },
  {
    kr: {
      title: 'Analytics Lab ETL 프로세스 개발',
      description: '13노드 Bastion Host 구조의 Hadoop Ecosystem Architecture를 유지보수했습니다. Airflow를 사용한 내부 ETL 프로세스를 구축하고, 이상 탐지를 위한 자체 검증 모듈 "Verify"를 개발하여 알람 시스템(SMTP, Slack)을 구현했습니다.'
    },
    en: {
      title: 'Analytics Lab ETL Process Development',
      description: 'Maintained Hadoop Ecosystem Architecture with 13-node Bastion Host structure. Created internal ETL processes using Airflow, developed self-verification module "Verify" for anomaly detection with alarm system (SMTP, Slack).'
    },
    tags: ['Hadoop', 'AWS', 'Airflow', 'Presto', 'Python', 'S3', 'Hive', 'Tableau']
  },
  {
    kr: {
      title: '관리자 도구: LogQA',
      description: '퍼블리셔가 각 게임 프로젝트의 로그를 조회할 수 있도록 돕는 Django 기반 외부 도구입니다. 각 국가의 퍼블리셔는 지정된 국가의 로그만 조회할 수 있으며, 서버 DB 백업 및 버전 관리 기능을 제공합니다.'
    },
    en: {
      title: 'Admin Tool: LogQA',
      description: 'Django-based external tool to help publishers view logs for their respective game projects. Publishers from each country can only view logs for their designated country with server DB backup and version control.'
    },
    tags: ['Python', 'Django', 'Docker', 'React', 'nginx', 'Git']
  },
  {
    kr: {
      title: 'Krafton Together',
      description: 'PHP 기반 CMS XpressEngine을 사용하여 통합 정형/비정형 분석 환경을 개발했습니다. 분석 관련 요청을 위한 게시 공간과 외부 사용자를 위한 프로젝트별 분석 공간을 구축했습니다.'
    },
    en: {
      title: 'Krafton Together',
      description: 'Developed integrated structured/unstructured analytics environment using PHP-based CMS XpressEngine. Created posting space for analytics-related requests & project-specific analytics spaces for external users.'
    },
    tags: ['PHP', 'XpressEngine', 'RDBMS', 'nginx', 'Jupyter', 'Git']
  },
  {
    kr: {
      title: 'TERA PC 런처 안정성 메트릭',
      description: '런처 성공/종료를 포함한 상세 로그 정보를 설계하고 제공했습니다. Kinesis SDK 기반 로그 생성 및 수집 모듈을 구축하고, 수집된 로그 정보로부터 메트릭을 제공했습니다.'
    },
    en: {
      title: 'TERA PC Launcher Stability Metrics',
      description: 'Designed and delivered detailed log information including launcher success/termination. Created log generation and collection module based on Kinesis SDK, provided metrics from collected log information.'
    },
    tags: ['AWS Kinesis', 'AWS Firehose', 'Python', 'JavaScript', 'Tableau', 'Git']
  },
  {
    kr: {
      title: '내부 모바일 게임 수익 API',
      description: 'AppAnnie(현재 data.ai)의 모바일 게임 시장 수익 데이터를 수집 및 저장했습니다. 내부 Krafton 접근을 위한 커스텀 API를 개발 및 배포하여 최적의 실행 비용으로 대량 데이터 처리를 지원했습니다.'
    },
    en: {
      title: 'Internal Mobile Game Revenue API',
      description: 'Collection and storage of mobile game market revenue data from AppAnnie (now data.ai). Developed and deployed custom API to enable internal Krafton access to stored data with bulk data processing for optimal execution cost.'
    },
    tags: ['AWS API Gateway', 'AWS Lambda', 'RDBMS', 'Python', 'Jupyter', 'Git']
  }
]

interface FeaturedProjectsProps {
  limit?: number
}

export default function FeaturedProjects({ limit }: FeaturedProjectsProps) {
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
    window.addEventListener('languageChange', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('languageChange', handleStorageChange)
    }
  }, [])

  if (!mounted) {
    return null
  }

  const displayProjects = limit ? projects.slice(0, limit) : projects
  
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {displayProjects.map((project, index) => {
        const content = language === 'kr' ? project.kr : project.en
        return (
        <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{content.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{content.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
              >
                {language === 'kr' ? '웹사이트' : 'Website'}
              </a>
            )}
            {project.source && (
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
              >
                {language === 'kr' ? '소스' : 'Source'}
              </a>
            )}
            {project.sourceUI && (
              <a
                href={project.sourceUI}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
              >
                {language === 'kr' ? '소스 (UI)' : 'Source (UI)'}
              </a>
            )}
          </div>
        </div>
        )
      })}
    </div>
  )
}



