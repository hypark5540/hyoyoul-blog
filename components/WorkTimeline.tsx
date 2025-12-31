'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface TimelineItem {
  icon?: string
  iconBg?: string
  iconTextColor?: string
  logo?: string
  start: string
  end?: string
  title: string
  company: string
  href?: string
  description: {
    kr: string[]
    en: string[]
  }
  links?: {
    name: string
    href: string
    icon?: string
  }[]
}

const workItems: TimelineItem[] = [
  {
    logo: '/icon-2.png',
    start: 'Sep 2018',
    end: 'Jan 2026',
    title: 'Data Architect & Engineer',
    company: 'KRAFTON Inc.',
    href: 'https://www.krafton.com/',
    description: {
      kr: [
        'Databricks(Medallion Architecture, Delta Live Tables, Liquid Clustering)를 활용한 데이터 아키텍처 설계 및 최적화로 ETL 효율성과 쿼리 성능 향상',
        '게임당 3-5개 파이프라인을 통합 구조로 통합하여 Liquid Clustering 및 Z-order 최적화를 통해 쿼리 실행 시간 67% 단축 (1시간 → 20분)',
        '자회사 AWS에서 Krafton 통합 Databricks 플랫폼으로 인프라 마이그레이션 주도, 80% 비용 절감 달성 ($150k → $30k annually)',
        'Azure, AWS, Hadoop 생태계 전반의 대규모 빅데이터 플랫폼 관리 (13-node Apache Ambari Hadoop, Hive, Spark, Presto)',
        'Apache Airflow, Hadoop Workflow, Oozie, Docker를 활용한 ETL 워크플로우 오케스트레이션 개발, C# 및 LINQPad를 사용한 내부 데이터 관리 도구 구축',
        '다양한 게임 타이틀에 걸친 PC, Mobile, Dedicated Server, Central Server 아키텍처의 텔레메트리 로그 설계 및 검증',
        'PUBG 주요 통화 회계 검증, 이연 수익 계산 수행, AI 모델을 활용한 Hi-Fi Rush 예측 수익 분석',
        'Tableau를 활용한 인터랙티브 대시보드 생성, 외부 파트너를 위한 Django 기반 LogQA 도구 유지보수, PHP 기반 CMS를 사용한 내부 분석 플랫폼 "Together" 개발',
        'AWS Kinesis SDK 기반 로그 수집 모듈 개발, AppAnnie(data.ai) API를 통합한 AWS Lambda 기반 모바일 수익 수집 시스템',
        '크로스 스튜디오 협업을 통해 개발 및 라이브 서비스 단계의 10개 이상 게임 타이틀 지원 (PUBG, Hi-Fi Rush, Subnautica 2, TERA, ELYON)'
      ],
      en: [
        'Designed and optimized data architectures using Databricks (Medallion Architecture, Delta Live Tables, Liquid Clustering) to enhance ETL efficiency and query performance',
        'Consolidated 3-5 pipelines per game into unified structures, reducing query execution time by 67% (1 hour to 20 minutes) through Liquid Clustering and Z-order optimization',
        'Led infrastructure migration from subsidiary AWS to Krafton\'s integrated Databricks platform, achieving 80% cost reduction ($150k -> $30k annually)',
        'Managed large-scale big data platforms across Azure, AWS, and Hadoop ecosystem (13-node Apache Ambari Hadoop, Hive, Spark, Presto)',
        'Developed ETL workflow orchestration using Apache Airflow, Hadoop Workflow, Oozie, and Docker, built internal data management tools with C# and LINQPad',
        'Designed and verified telemetry logs for PC, Mobile, Dedicated Server, and Central Server architectures across multiple game titles',
        'Performed PUBG primary currency accounting verification, deferred revenue calculation, and predictive revenue analysis for Hi-Fi Rush using AI models',
        'Created interactive dashboards with Tableau, maintained Django-based LogQA tool for external partners, and developed in-house analytics platform "Together" using PHP-based CMS',
        'Developed AWS Kinesis SDK-based log collection module, AWS Lambda-based mobile revenue collection system integrating AppAnnie (data.ai) API',
        'Supported 10+ game titles across development and live service stages (PUBG, Hi-Fi Rush, Subnautica 2, TERA, ELYON) with cross-studio collaboration'
      ]
    }
  },
  {
    logo: '/icon-1.png',
    start: 'Jun 2018',
    end: 'Sep 2018',
    title: 'Data Architect & Engineer (Intern)',
    company: 'Bluehole Studio Inc.',
    href: 'https://www.krafton.com/studios/bluehole/',
    description: {
      kr: [
        'Hadoop 생태계 이해 및 cronjob을 활용한 기본 데이터플로우 스케줄링 관리',
        '기본적인 게임 스튜디오 운영 이해 및 데이터플로우 다이어그램 작성'
      ],
      en: [
        'Understood Hadoop ecosystem and managed basic dataflow scheduling using cronjob',
        'Gained understanding of basic game studio operations and created dataflow diagrams'
      ]
    }
  }
]

const educationItems: TimelineItem[] = [
  {
    logo: '/education-2.jpg',
    start: 'Mar 2012',
    end: 'Feb 2018',
    title: 'Bachelor of Computer Science Engineering',
    company: 'Hansung University',
    href: 'https://hansung.ac.kr',
    description: {
      kr: [
        '우수한 성적으로 졸업',
        '졸업 프로젝트: 식당 검색 지도 제작, 데이터베이스 관리'
      ],
      en: [
        'Graduated with honor',
        'Senior project: Making map for searching dining, managing databases'
      ]
    }
  },
  {
    icon: 'K',
    iconBg: 'bg-gray-600',
    iconTextColor: 'text-white',
    start: 'Sep 2008',
    end: 'Jul 2009',
    title: 'Gifted Education Program',
    company: 'KAIST IT Institute',
    href: 'http://itedu.kaist.ac.kr',
    description: {
      kr: [
        '컴퓨터 기초 이론 및 원리 학습',
        'C언어 기초 학습',
        'Assembly 언어 원리 및 기본실습'
      ],
      en: [
        'Computer fundamentals and principles',
        'C language fundamentals',
        'Assembly language principles and basic practice'
      ]
    }
  }
]

const TimelineItemComponent = ({ item, language }: { item: TimelineItem, language: 'kr' | 'en' }) => {
  const description = item.description[language]
  
  return (
    <li className="relative ml-10 py-4">
      {/* Avatar/Icon */}
      {item.href ? (
        <Link
          href={item.href}
          target="_blank"
          className="absolute -left-16 top-4 flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 overflow-hidden hover:opacity-80 transition cursor-pointer"
        >
          {item.logo ? (
            <Image
              src={item.logo}
              alt={item.company}
              width={96}
              height={96}
              className="w-[200%] h-[200%] object-contain"
              unoptimized
              key={item.logo}
            />
          ) : (
            <div className={`w-full h-full rounded-full ${item.iconBg || 'bg-gray-600'} ${item.iconTextColor || 'text-white'} flex items-center justify-center text-sm font-bold`}>
              {item.icon}
            </div>
          )}
        </Link>
      ) : (
        <div className="absolute -left-16 top-4 flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 overflow-hidden">
          {item.logo ? (
            <Image
              src={item.logo}
              alt={item.company}
              width={96}
              height={96}
              className="w-[200%] h-[200%] object-contain"
              unoptimized
              key={item.logo}
            />
          ) : (
            <div className={`w-full h-full rounded-full ${item.iconBg || 'bg-gray-600'} ${item.iconTextColor || 'text-white'} flex items-center justify-center text-sm font-bold`}>
              {item.icon}
            </div>
          )}
        </div>
      )}
      
      {/* Content */}
      <div className="flex flex-1 flex-col justify-start gap-1">
        {item.start && (
          <time className="text-xs text-gray-500 dark:text-gray-400">
            <span>{item.start}</span>
            <span>{" - "}</span>
            <span>{item.end ? item.end : "Present"}</span>
          </time>
        )}
        <h2 className="font-semibold leading-none text-gray-900 dark:text-white">
          {item.href ? (
            <Link href={item.href} target="_blank" className="hover:underline">
              {item.company}
            </Link>
          ) : (
            item.company
          )}
        </h2>
        {item.title && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
        )}
        {description && (
          <ul className="ml-4 list-outside list-disc mt-2">
            {description.map((desc, i) => (
              <li key={i} className="text-sm text-gray-600 dark:text-gray-400 pr-8">
                {desc}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Links */}
      {item.links && item.links.length > 0 && (
        <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
          {item.links.map((link, idx) => (
            <Link
              href={link.href}
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {link.icon && (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              )}
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </li>
  )
}

export default function WorkTimeline() {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work')
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

  const currentItems = activeTab === 'work' ? workItems : educationItems

  const translations = {
    kr: {
      work: 'Work',
      education: 'Education'
    },
    en: {
      work: 'Work',
      education: 'Education'
    }
  }

  const t = translations[language]

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex gap-6 mb-6">
        <button
          onClick={() => setActiveTab('work')}
          className={`text-sm font-medium transition-colors pb-2 ${
            activeTab === 'work'
              ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          {t.work}
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`text-sm font-medium transition-colors pb-2 ${
            activeTab === 'education'
              ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          {t.education}
        </button>
      </div>

      {/* Timeline Card */}
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900">
        <div className="p-0">
          <ul className="ml-10 border-l border-gray-200 dark:border-gray-800">
            {currentItems.map((item, index) => (
              <TimelineItemComponent key={index} item={item} language={language} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
