export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  readTime: number; // minutes
  image?: string;
  gradient: string; // gradient colors for weather card style
}

export const samplePosts: BlogPost[] = [
  {
    id: "7",
    title: "Data Driven Decision의 한계",
    excerpt: "데이터 기반 의사결정의 장점과 함께 존재하는 한계점들을 분석하고, 데이터에만 의존할 때 발생할 수 있는 문제점들을 살펴봅니다.",
    content: `# Data Driven Decision의 한계

데이터 기반 의사결정(Data Driven Decision Making)은 현대 비즈니스와 조직 운영에서 핵심적인 역할을 하고 있습니다. 하지만 데이터에만 의존할 때 발생하는 한계와 함정들에 대해 알아봅시다.

## 데이터 기반 의사결정이란?

데이터 기반 의사결정은 직관이나 경험보다는 객관적인 데이터와 분석을 바탕으로 결정을 내리는 접근 방식입니다. 이는 더 정확하고 객관적인 의사결정을 가능하게 합니다.

## 주요 한계점들

### 1. 데이터의 불완전성

모든 데이터가 완벽하게 수집되거나 측정 가능한 것은 아닙니다. 특히:

- **정성적 요소의 누락**: 고객 만족도, 직원 사기, 브랜드 가치 등은 정량화하기 어렵습니다
- **측정 불가능한 변수**: 시장의 감정, 경쟁사의 전략, 예상치 못한 외부 요인들
- **데이터 수집의 한계**: 모든 관련 데이터를 수집하는 것은 현실적으로 불가능합니다

\`\`\`
예시: 고객 이탈률 데이터만으로는 
왜 고객이 떠났는지 진짜 이유를 알 수 없습니다.
\`\`\`

### 2. 과거 데이터의 한계

데이터는 주로 과거의 패턴을 보여줍니다:

- **미래 예측의 어려움**: 과거 데이터가 미래를 완벽하게 예측하지 못합니다
- **변화하는 환경**: 시장, 기술, 고객 행동이 빠르게 변화합니다
- **블랙 스완 이벤트**: 예측 불가능한 큰 변화는 데이터로 예측할 수 없습니다

### 3. 데이터 해석의 주관성

데이터 자체는 객관적이지만, 해석은 주관적일 수 있습니다:

- **편향된 해석**: 자신의 가설을 뒷받침하는 데이터만 선택하는 경향
- **맥락의 부재**: 데이터만으로는 전체적인 맥락을 파악하기 어렵습니다
- **다양한 해석 가능성**: 같은 데이터도 다르게 해석될 수 있습니다

### 4. 의사결정의 지연

데이터 수집과 분석에는 시간이 걸립니다:

- **기회 상실**: 완벽한 데이터를 기다리는 동안 기회를 놓칠 수 있습니다
- **빠른 변화**: 빠르게 변화하는 환경에서는 즉각적인 판단이 필요합니다
- **분석 마비**: 너무 많은 데이터 분석으로 인해 결정을 미루는 현상

### 5. 창의성과 혁신의 제한

데이터는 기존 패턴을 보여주지만, 혁신은 패턴을 깨는 것입니다:

- **혁신의 예측 불가능성**: 진정한 혁신은 데이터로 예측하기 어렵습니다
- **창의적 사고의 억제**: 데이터에만 의존하면 새로운 아이디어가 나오기 어렵습니다
- **리스크 회피**: 데이터가 없는 영역에 대한 도전을 피하게 됩니다

## 균형잡힌 접근법

데이터 기반 의사결정의 한계를 인식하고 균형잡힌 접근이 필요합니다:

### 데이터 + 직관

- 데이터는 객관적인 정보를 제공합니다
- 직관은 경험과 맥락을 반영합니다
- 두 가지를 결합하면 더 나은 의사결정이 가능합니다

### 데이터 + 창의성

- 데이터로 기회를 발견하고
- 창의성으로 새로운 솔루션을 만듭니다
- 혁신은 데이터와 창의성의 조화에서 나옵니다

### 데이터 + 윤리

- 데이터가 모든 것을 정당화하지는 않습니다
- 윤리적 고려사항도 함께 평가해야 합니다
- 단기적 데이터보다 장기적 가치를 고려합니다

## 실무 적용 팁

1. **데이터의 한계 인식**: 데이터가 모든 것을 알려주지 않는다는 것을 기억하세요
2. **맥락 고려**: 데이터뿐만 아니라 전체적인 상황을 봅니다
3. **빠른 실험**: 완벽한 데이터를 기다리지 말고 작은 실험을 통해 검증합니다
4. **다양한 관점**: 데이터 분석가뿐만 아니라 다양한 전문가의 의견을 듣습니다
5. **지속적 학습**: 데이터 해석 능력을 지속적으로 개선합니다

## 마무리

데이터 기반 의사결정은 강력한 도구이지만, 완벽하지는 않습니다. 데이터의 한계를 인식하고, 직관, 창의성, 윤리와 함께 사용할 때 진정으로 효과적인 의사결정이 가능합니다.

데이터는 도구일 뿐, 목적이 되어서는 안 됩니다. 최종 목표는 더 나은 결정을 내리고, 더 나은 결과를 만드는 것입니다.`,
    category: "생각",
    tags: ["Data", "Decision Making", "Analytics"],
    date: "2023-12-11",
    readTime: 7,
    gradient: "from-violet-400 via-purple-500 to-fuchsia-600",
  },
  {
    id: "8",
    title: "Savermatrix <-> Game Status 결합",
    excerpt: "Savermatrix와 Game Status 시스템을 결합하여 더 효율적이고 통합된 게임 데이터 관리 솔루션을 만드는 방법을 탐구합니다.",
    content: `# Savermatrix <-> Game Status 결합

게임 개발에서 데이터 저장과 게임 상태 관리는 핵심적인 요소입니다. Savermatrix와 Game Status 시스템을 결합하여 더 강력하고 효율적인 솔루션을 만들어봅시다.

## 시스템 개요

### Savermatrix란?

Savermatrix는 게임 데이터를 효율적으로 저장하고 관리하는 시스템입니다. 플레이어의 진행 상황, 인벤토리, 설정 등을 영구적으로 보관합니다.

주요 특징:
- **영구 저장**: 게임 데이터의 안전한 저장
- **버전 관리**: 데이터 구조 변경 시 호환성 유지
- **백업 및 복구**: 데이터 손실 방지

### Game Status란?

Game Status는 현재 게임의 상태를 실시간으로 관리하는 시스템입니다. 플레이어의 현재 위치, HP, 상태 효과 등을 추적합니다.

주요 특징:
- **실시간 상태**: 현재 게임 상태의 즉각적인 반영
- **상태 전환**: 게임 상태 간의 부드러운 전환
- **동기화**: 여러 시스템 간의 상태 동기화

## 결합의 필요성

두 시스템을 분리하면 다음과 같은 문제가 발생할 수 있습니다:

- **데이터 불일치**: 저장된 데이터와 현재 상태가 다를 수 있습니다
- **중복 관리**: 같은 데이터를 두 곳에서 관리해야 합니다
- **복잡성 증가**: 두 시스템을 따로 관리하는 것이 복잡합니다

## 통합 아키텍처

### 1. 단일 소스 원칙

\`\`\`typescript
// 통합된 게임 상태 관리
interface GameState {
  // 영구 저장 데이터
  player: {
    level: number;
    experience: number;
    inventory: Item[];
  };
  
  // 현재 세션 상태
  session: {
    currentHP: number;
    currentLocation: string;
    activeEffects: Effect[];
  };
}
\`\`\`

### 2. 상태 동기화 메커니즘

\`\`\`typescript
class UnifiedGameManager {
  private state: GameState;
  private saver: Savermatrix;
  
  // 상태 변경 시 자동 저장
  updateState(updates: Partial<GameState>) {
    this.state = { ...this.state, ...updates };
    this.autoSave(); // 변경사항 자동 저장
  }
  
  // 주기적 자동 저장
  private autoSave() {
    this.saver.save(this.state);
  }
}
\`\`\`

### 3. 이벤트 기반 아키텍처

\`\`\`typescript
// 상태 변경 이벤트
interface StateChangeEvent {
  type: 'state_changed';
  field: string;
  oldValue: any;
  newValue: any;
}

// 이벤트 리스너로 자동 저장
eventBus.on('state_changed', (event: StateChangeEvent) => {
  if (event.field.startsWith('player.')) {
    savermatrix.save(event.newValue);
  }
});
\`\`\`

## 구현 전략

### 전략 1: 계층적 구조

\`\`\`
┌─────────────────────┐
│   Game Status       │  (현재 상태)
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│   Savermatrix      │  (영구 저장)
└─────────────────────┘
\`\`\`

**장점:**
- 명확한 책임 분리
- 각 시스템의 독립적 테스트 가능
- 유연한 확장성

### 전략 2: 통합 모델

\`\`\`
┌─────────────────────┐
│  Unified Game State │
│  (Status + Save)    │
└─────────────────────┘
\`\`\`

**장점:**
- 단일 데이터 모델
- 일관성 보장
- 간단한 구현

## 실제 구현 예시

### 저장 트리거 설정

\`\`\`typescript
// 중요한 상태 변경 시 자동 저장
const saveTriggers = [
  'player.level_up',
  'player.item_acquired',
  'player.progress_milestone',
  'game.checkpoint_reached'
];

saveTriggers.forEach(trigger => {
  gameStatus.on(trigger, () => {
    savermatrix.save(gameStatus.getState());
  });
});
\`\`\`

### 로드 시 상태 복원

\`\`\`typescript
// 게임 시작 시 저장된 데이터 로드
async function initializeGame() {
  const savedData = await savermatrix.load();
  
  if (savedData) {
    // 영구 데이터 복원
    gameStatus.restorePermanentState(savedData.player);
    
    // 세션 상태 초기화
    gameStatus.initializeSession(savedData.session);
  } else {
    // 새 게임 시작
    gameStatus.startNewGame();
  }
}
\`\`\`

## 최적화 고려사항

### 1. 저장 빈도 최적화

- **즉시 저장**: 중요한 변경사항 (레벨업, 아이템 획득)
- **주기적 저장**: 일정 시간마다 자동 저장
- **체크포인트 저장**: 특정 지점에서만 저장

### 2. 데이터 압축

\`\`\`typescript
// 저장 전 데이터 압축
const compressed = compress(gameState);
savermatrix.save(compressed);
\`\`\`

### 3. 증분 저장

전체 상태를 매번 저장하지 않고 변경된 부분만 저장:

\`\`\`typescript
// 변경된 필드만 저장
const changes = diff(currentState, lastSavedState);
savermatrix.saveIncremental(changes);
\`\`\`

## 에러 처리

### 저장 실패 시

\`\`\`typescript
try {
  await savermatrix.save(state);
} catch (error) {
  // 저장 실패 시 재시도 로직
  console.error('Save failed, retrying...', error);
  await retrySave(state, 3);
}
\`\`\`

### 데이터 무결성 검증

\`\`\`typescript
function validateGameState(state: GameState): boolean {
  // 상태 유효성 검사
  if (state.player.level < 0) return false;
  if (state.session.currentHP < 0) return false;
  // ... 추가 검증
  return true;
}
\`\`\`

## 테스트 전략

### 단위 테스트

\`\`\`typescript
describe('Unified Game Manager', () => {
  it('should save state when status changes', () => {
    const manager = new UnifiedGameManager();
    manager.updateState({ player: { level: 2 } });
    expect(savermatrix.save).toHaveBeenCalled();
  });
});
\`\`\`

### 통합 테스트

\`\`\`typescript
it('should restore game state from save', async () => {
  const savedState = createTestState();
  await savermatrix.save(savedState);
  
  const restored = await initializeGame();
  expect(restored).toEqual(savedState);
});
\`\`\`

## 마무리

Savermatrix와 Game Status를 결합하면 더 강력하고 일관된 게임 데이터 관리 시스템을 만들 수 있습니다. 

핵심은:
- **명확한 책임 분리**: 각 시스템의 역할을 명확히 정의
- **자동 동기화**: 상태 변경 시 자동으로 저장
- **에러 처리**: 저장 실패에 대한 대비책
- **성능 최적화**: 불필요한 저장 최소화

이러한 통합을 통해 플레이어 경험을 향상시키고, 개발 과정을 단순화할 수 있습니다.`,
    category: "기술",
    tags: ["Game Development", "System Design", "Data Management"],
    date: "2023-11-10",
    readTime: 9,
    gradient: "from-rose-400 via-red-500 to-pink-600",
  },
  {
    id: "1",
    title: "Apache Ambari Hadoop서비스에서 겪었던 문제 & 해결 review - Heap 메모리 부족",
    excerpt: "Apache Ambari Hadoop서비스에서 겪었던 문제 & 해결 review - Heap 메모리 부족",
    content: `지난 인프라 구조는 다음과 같았습니다.
- Bastion Host 구조
- Namenode 1대
- 12대의 datanode

해당 인프라 구조에서 주로 2개의 게임 서비스(Elyon, TERA)를 운영하였고 평균 쿼리 사이즈가 1GB를 상회했었습니다.

![Hadoop Ecosystem Architecture](/hadoop-architecture.png)

( 그림1. Bastion Host - Apache Ambari Hadoop Ecosystem Architecture )

그러나 해당 인프라를 운영하면서 유독 Heap 메모리 부족으로 많은 인프라 장애를 앓고 있었습니다. 관련 유력 원인은 다음과 같습니다.

1. YARN NodeManager/ResourceManager 메모리 부족
- 컨테이너 할당이 물리 메모리를 초과할 때
- yarn.nodemanager.resource.memory-mb 설정이 실제 가용 메모리보다 클 때
- Java heap이 작은데 많은 애플리케이션이 동시 실행될 때

2. MapReduce Job의 메모리 설정 문제
- Map/Reduce task의 heap size가 너무 작게 설정 (mapreduce.map.java.opts, mapreduce.reduce.java.opts)
- 대용량 데이터 처리 시 메모리 버퍼 부족
- Shuffle 단계에서 메모리 초과

3. HBase RegionServer OOM
- MemStore 크기 설정이 부적절할 때
- BlockCache와 MemStore 합이 heap의 80%를 초과할 때
- 대량의 동시 요청 처리 시

4. Hive/Tez 실행 엔진
- Tez AM (Application Master) heap 부족
- 복잡한 쿼리의 실행 계획 생성 시
- 조인이나 집계 연산의 중간 결과가 메모리에 쌓일 때


그러나 당시 상황 로그 분석 및 자료들 분석 결과, 1GB 정도 쿼리를 돌리는 환경에서 YARN 메모리 부족이 자주 발생했다면, 전형적인 메모리 오버커밋(over-commit) 문제였을 가능성이 높습니다.

## 당시 상황 분석

xlarge 인스턴스 (보통 4 vCPU, 16GB RAM 기준)

- 실제 가용 메모리: ~14GB (OS, 데몬 제외)
- DataNode가 사용: ~2GB
- NodeManager가 컨테이너에 할당 가능: 이론상 ~12GB

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

- \`yarn.nodemanager.resource.memory-mb\`를 10GB로 축소
- \`yarn.nodemanager.vmem-check-enabled=false\` (임시 우회)

### 근본적 해결:

- Map/Reduce task 메모리를 더 여유있게 (2GB → 3GB)
- 동시 실행 task 수 제한
- DataNode heap 메모리 최적화 (불필요하게 크면 줄임)


위의 근본적 해결방법 중중
Map/Reduce task 메모리를 더 여유있게 (2GB → 3GB) 해당 내용에 대한 조치를 순서대로 알아보겠습니다.


### Ambari UI에서 변경 (가장 일반적)

1. MapReduce2 설정

Ambari Web UI → Services → MapReduce2 → Configs → Advanced

[Memory 관련 설정]

\`mapreduce.map.memory.mb\` = 3072 (2048 → 3072)
\`mapreduce.reduce.memory.mb\` = 6144 (4096 → 6144)

[Java Heap 설정 - 80% 규칙]

\`mapreduce.map.java.opts\` = -Xmx2457m (80% of 3072)
\`mapreduce.reduce.java.opts\` = -Xmx4915m (80% of 6144)

2. YARN 설정도 함께 확인

Services → YARN → Configs

\`yarn.scheduler.minimum-allocation-mb\` = 1024
\`yarn.scheduler.maximum-allocation-mb\` = 8192 (task가 요청 가능한 최대치)
\`yarn.nodemanager.resource.memory-mb\` = 10240 (노드당 할당 가능 총량)

### 설정 파일로 직접 변경 (모든 노드)

\`mapred-site.xml\` (보통 /etc/hadoop/conf/)

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

### Job 실행 시 동적으로 변경 (임시 테스트용)

Hive 쿼리 실행 전:
\`\`\`sql
SET mapreduce.map.memory.mb=3072;
SET mapreduce.reduce.memory.mb=6144;
SET mapreduce.map.java.opts=-Xmx2457m;
SET mapreduce.reduce.java.opts=-Xmx4915m;

SELECT ... -- 실제 쿼리
\`\`\`

Spark submit 시:
\`\`\`bash
spark-submit \\
  --conf spark.executor.memory=3g \\
  --conf spark.driver.memory=2g \\
  your_job.py
\`\`\`

### 변경 후 필수 작업

\`\`\`bash
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

- 나머지 20%는 JVM overhead, off-heap, native memory 사용
- 100%로 설정하면 Container killed 발생`,
    category: "스터디",
    tags: ["Hadoop", "Spark", "Hive"],
    date: "2024-01-15",
    readTime: 5,
    gradient: "from-blue-400 via-blue-500 to-blue-600",
  },
  {
    id: "2",
    title: "Next.js 14 완벽 가이드",
    excerpt: "Next.js 14의 App Router와 서버 액션을 활용한 모던 웹 개발 방법을 배워봅니다.",
    content: "전체 내용...",
    category: "튜토리얼",
    tags: ["Next.js", "Web Development"],
    date: "2024-01-12",
    readTime: 8,
    gradient: "from-purple-400 via-pink-500 to-red-500",
  },
  {
    id: "3",
    title: "TypeScript 베스트 프랙티스",
    excerpt: "TypeScript를 더 효과적으로 사용하는 방법과 일반적인 실수들을 피하는 팁을 공유합니다.",
    content: "전체 내용...",
    category: "기술",
    tags: ["TypeScript", "Programming"],
    date: "2024-01-10",
    readTime: 6,
    gradient: "from-green-400 via-emerald-500 to-teal-600",
  },
  {
    id: "4",
    title: "CSS Grid와 Flexbox 마스터하기",
    excerpt: "현대적인 레이아웃을 만들기 위한 CSS Grid와 Flexbox의 고급 기법들을 알아봅니다.",
    content: "전체 내용...",
    category: "디자인",
    tags: ["CSS", "Web Design"],
    date: "2024-01-08",
    readTime: 7,
    gradient: "from-orange-400 via-amber-500 to-yellow-500",
  },
  {
    id: "5",
    title: "웹 성능 최적화 전략",
    excerpt: "웹사이트의 로딩 속도를 개선하고 사용자 경험을 향상시키는 실용적인 최적화 기법들을 소개합니다.",
    content: "전체 내용...",
    category: "기술",
    tags: ["Performance", "Optimization"],
    date: "2024-01-05",
    readTime: 10,
    gradient: "from-indigo-400 via-purple-500 to-pink-500",
  },
  {
    id: "6",
    title: "AI와 개발자의 미래",
    excerpt: "인공지능이 개발 업무에 미치는 영향과 앞으로의 변화에 대해 생각해봅니다.",
    content: "전체 내용...",
    category: "생각",
    tags: ["AI", "Future"],
    date: "2024-01-03",
    readTime: 4,
    gradient: "from-cyan-400 via-blue-500 to-indigo-600",
  },
];

