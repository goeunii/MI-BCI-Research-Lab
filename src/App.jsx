import { useState } from 'react'
import {
  Activity,
  ArrowDown,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleDot,
  Database,
  Gamepad2,
  Fan,
  Lightbulb,
  Menu,
  MoveLeft,
  MoveRight,
  Pause,
  Power,
  Play,
  Radio,
  RotateCcw,
  ScanLine,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'

const participants = ['KGE', 'KHY', 'OYJ', 'WMJ']

const researchData = {
  A: {
    label: '연구 A',
    title: '저채널 최적화 및 신호 안정화',
    summary: '분류에 필요한 핵심 전극을 찾고, 세션이 달라져도 사용할 수 있는 안정적인 신호 표현을 연구합니다.',
    question: '전극 수를 줄이면서도 운동상상 분류 정보를 유지할 수 있을까?',
    chips: ['16채널 → 5·7채널', '신호 품질 관리', '공분산 안정화', '영점 보정'],
    steps: [
      ['01', '기준 신호 구성', '16채널 EEG를 기준으로 신호 품질과 세션별 변화를 확인합니다.'],
      ['02', '핵심 채널 탐색', '운동상상 분류에 필요한 전극 조합을 같은 평가 조건에서 비교합니다.'],
      ['03', '신호 안정화', '세션 간 분포 변화에 대응하는 보정 방법을 적용하고 검증합니다.'],
    ],
  },
  B: {
    label: '연구 B',
    title: 'TTT 기반 테스트 시점 적응',
    summary: '학습된 모델을 고정해 사용하는 대신, 새 테스트 세션의 특성을 이용해 추론 시점에 적응하는 방법을 연구합니다.',
    question: '모델이 처음 보는 EEG 세션에 테스트 과정에서 적응할 수 있을까?',
    chips: ['EEGNet', 'EEG Conformer', 'TTT OFF / ON', '세션 변화 대응'],
    steps: [
      ['01', '기준 모델 학습', '학습 세션으로 EEGNet과 EEG Conformer 기준 모델을 구성합니다.'],
      ['02', '새 세션 입력', '학습에서 보지 못한 테스트 세션을 모델에 입력합니다.'],
      ['03', '테스트 시점 적응', 'TTT OFF와 ON을 분리해 같은 조건에서 성능 변화를 검증합니다.'],
    ],
  },
}

const electrodes = [
  ['Fp1', 31, 16], ['Fp2', 69, 16], ['F7', 17, 34], ['F3', 35, 35], ['Fz', 50, 32], ['F4', 65, 35], ['F8', 83, 34],
  ['T7', 11, 52], ['C3', 34, 52], ['Cz', 50, 49], ['C4', 66, 52], ['T8', 89, 52],
  ['P7', 18, 70], ['P3', 36, 68], ['Pz', 50, 71], ['P4', 64, 68], ['P8', 82, 70], ['O1', 38, 84], ['O2', 62, 84],
]

const channelPresets = {
  16: new Set(['Fp1', 'Fp2', 'F7', 'F3', 'F4', 'F8', 'C3', 'Cz', 'C4', 'P7', 'P3', 'Pz', 'P4', 'P8', 'O1', 'O2']),
  7: new Set(['F3', 'F4', 'C3', 'Cz', 'C4', 'P3', 'P4']),
  5: new Set(['C3', 'Cz', 'C4', 'P3', 'P4']),
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = [
    ['연구 개요', '#overview'],
    ['연구 내용', '#research'],
    ['연구 과정', '#method'],
    ['실험 결과', '#results'],
    ['응용', '#application'],
  ]

  return (
    <header className="site-header">
      <a className="brand" href="#top" onClick={() => setOpen(false)}>
        <span className="brand-icon"><BrainCircuit /></span>
        <span>MI-BCI <b>연구팀</b></span>
      </a>
      <nav className={open ? 'nav open' : 'nav'} aria-label="주요 메뉴">
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
      <a className="header-button" href="#application">체험 영역 보기 <ArrowRight /></a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="메뉴 열기" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
    </header>
  )
}

function SectionTitle({ number, label, title, description, light = false }) {
  return (
    <div className={light ? 'section-title light' : 'section-title'}>
      <div className="section-kicker"><span>{number}</span>{label}</div>
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  )
}

function Waveform({ variant = 1 }) {
  const paths = [
    'M0 44 C12 43 18 46 28 43 S40 30 50 48 S62 57 74 39 S90 31 102 48 S118 56 130 41 S146 34 158 46 S174 58 188 38 S205 31 218 49 S235 54 250 40 S270 35 286 47 S304 55 320 42 S340 34 360 46 S380 52 400 43',
    'M0 46 C10 39 20 53 30 43 S48 26 59 50 S72 58 83 38 S102 30 116 52 S134 56 148 37 S167 32 180 49 S198 56 214 38 S232 34 248 50 S268 56 282 39 S300 33 318 50 S342 55 360 40 S382 34 400 47',
  ]
  return (
    <svg className="waveform" viewBox="0 0 400 86" preserveAspectRatio="none" aria-hidden="true">
      <path className="wave-grid" d="M0 21.5H400M0 43H400M0 64.5H400" />
      <path className="wave-glow" d={paths[(variant - 1) % 2]} />
      <path className="wave-line" d={paths[(variant - 1) % 2]} />
    </svg>
  )
}

function BrainMap({ channels }) {
  return (
    <div className="brain-map">
      <span className="sr-only">{channels}채널 전극 배치도</span>
      <div className="head-map">
        <span className="map-nose" /><span className="map-ear left" /><span className="map-ear right" />
        <i className="axis horizontal" /><i className="axis vertical" />
        {electrodes.map(([name, x, y]) => (
          <button key={name} className={channelPresets[channels].has(name) ? 'selected' : ''} style={{ left: `${x}%`, top: `${y}%` }} aria-label={`${name} 전극`}>
            <i /><span>{name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function App() {
  const [activeResearch, setActiveResearch] = useState('A')
  const [participant, setParticipant] = useState('KGE')
  const [metric, setMetric] = useState('BA')
  const [channels, setChannels] = useState(7)
  const [playing, setPlaying] = useState(false)
  const [iot, setIot] = useState({ light: false, blind: false, fan: false })
  const [gameSide, setGameSide] = useState('center')
  const [gameRunning, setGameRunning] = useState(false)
  const [score, setScore] = useState(0)
  const research = researchData[activeResearch]

  const moveCharacter = (side) => {
    setGameSide(side)
    if (gameRunning) setScore(value => value + 1)
  }

  return (
    <>
      <Header />
      <main id="top">
        <section className="hero">
          <div className="hero-network" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span /> 운동상상 기반 뇌-컴퓨터 인터페이스 연구</p>
              <h1>더 적은 전극으로,<br /><em>더 안정적인</em><br />뇌파 분류</h1>
              <p className="hero-description">운동상상 EEG의 핵심 채널을 찾고, 세션 변화에 대응하는 신호 안정화와 테스트 시점 적응 방법을 연구합니다.</p>
              <div className="hero-actions">
                <a className="button primary" href="#research">연구 내용 보기 <ArrowDown /></a>
                <a className="button secondary" href="#application">체험 영역 보기 <ArrowRight /></a>
              </div>
            </div>
            <div className="hero-brain">
              <span className="orbit orbit-1" /><span className="orbit orbit-2" /><span className="orbit orbit-3" />
              <img src="/brain-hero.png" alt="운동 피질 전극과 신호 연결을 표현한 파란색 뇌 시각화" />
              <span className="brain-tag tag-c3"><i /> C3</span>
              <span className="brain-tag tag-cz"><i /> Cz</span>
              <span className="brain-tag tag-c4"><i /> C4</span>
              <div className="brain-status"><span /> 운동 피질 중심 신호 분석</div>
            </div>
          </div>
          <div className="container hero-summary">
            <div><small>연구 구성</small><b>2개 연구 방향</b><span>저채널 안정화 · TTT 적응</span></div>
            <div><small>채널 비교</small><b>16 → 5·7채널</b><span>전체 채널과 저채널 구성 비교</span></div>
            <div><small>참가자</small><b>4명</b><span>KGE · KHY · OYJ · WMJ</span></div>
          </div>
        </section>

        <section className="section white-section" id="overview">
          <div className="container">
            <SectionTitle number="01" label="연구 개요" title={<>EEG를 실제 환경에서<br />사용하기 위한 세 가지 과제</>} description="운동상상 EEG는 사람과 날짜, 세션에 따라 달라집니다. 연구실 안의 높은 성능만이 아니라 실제 사용 조건을 고려해 문제를 정의했습니다." />
            <div className="goal-grid">
              <article>
                <span className="number">01</span><div className="goal-icon"><CircleDot /></div>
                <h3>전극 수를<br />줄일 수 있을까?</h3>
                <p>분류에 필요한 핵심 채널을 찾아 착용과 설치 부담을 줄일 가능성을 탐색합니다.</p>
              </article>
              <article>
                <span className="number">02</span><div className="goal-icon"><Activity /></div>
                <h3>세션이 달라져도<br />안정적일 수 있을까?</h3>
                <p>날짜와 세션 변화로 발생하는 EEG 분포 차이에 대응하는 보정 방법을 검증합니다.</p>
              </article>
              <article>
                <span className="number">03</span><div className="goal-icon"><Zap /></div>
                <h3>새로운 신호에<br />적응할 수 있을까?</h3>
                <p>테스트 시점에 들어오는 새로운 EEG 특성을 활용해 모델을 적응시키는 방법을 연구합니다.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section blue-section" id="research">
          <div className="container">
            <SectionTitle light number="02" label="연구 내용" title={<>하나의 목표를 향한<br />두 가지 연구 방향</>} description="연구 A와 B는 평가 목적과 조건이 다르기 때문에 각각 독립적으로 설명하고 비교합니다." />
            <div className="research-tabs" role="tablist" aria-label="연구 선택">
              {Object.entries(researchData).map(([key, item]) => (
                <button key={key} className={activeResearch === key ? 'active' : ''} onClick={() => setActiveResearch(key)} role="tab" aria-selected={activeResearch === key}>
                  <span>{key}</span><div><small>{item.label}</small><b>{item.title}</b></div><ArrowRight />
                </button>
              ))}
            </div>
            <div className="research-panel">
              <div className="research-main">
                <p className="panel-label">{research.label} · 핵심 질문</p>
                <h3>“{research.question}”</h3>
                <p>{research.summary}</p>
                <div className="chip-list">{research.chips.map(chip => <span key={chip}>{chip}</span>)}</div>
              </div>
              <div className="research-steps">
                {research.steps.map(([number, title, body]) => (
                  <article key={number}><span>{number}</span><div><h4>{title}</h4><p>{body}</p></div></article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section white-section" id="method">
          <div className="container">
            <SectionTitle number="03" label="연구 과정" title={<>뇌파 수집부터<br />응용까지 이어지는 과정</>} description="두 연구는 같은 EEG 수집 기반을 공유하지만, 분석과 평가 단계에서는 각 연구 질문에 맞는 독립적인 조건을 유지합니다." />
            <div className="pipeline">
              {[
                [Database, '01', 'EEG 수집', '좌·우 손 운동상상 데이터를 여러 세션에서 수집'],
                [ShieldCheck, '02', '신호 품질 관리', '잡음과 이상 구간을 확인하고 분석 데이터 구성'],
                [SlidersHorizontal, '03', '채널·신호 최적화', '저채널 구성과 신호 안정화 방법 검증'],
                [BrainCircuit, '04', '분류 모델 평가', '연구별 기준 조건과 개선 조건 비교'],
                [Radio, '05', '응용 연결', '저장 EEG 재생과 인터페이스 제어로 확장'],
              ].map(([Icon, number, title, body], index) => (
                <article key={number}>
                  <div className="pipeline-icon"><Icon /></div><span>{number}</span><h3>{title}</h3><p>{body}</p>
                  {index < 4 && <ChevronRight className="pipeline-arrow" />}
                </article>
              ))}
            </div>
            <div className="signal-board">
              <div><small>EEG SIGNAL · C3</small><Waveform variant={1} /></div>
              <div><small>EEG SIGNAL · C4</small><Waveform variant={2} /></div>
              <span className="signal-chip"><ScanLine /> 저장 EEG 연결 예정</span>
            </div>
          </div>
        </section>

        <section className="section result-section" id="results">
          <div className="container">
            <SectionTitle number="04" label="실험 결과" title={<>실제 수치와 조건을<br />함께 보여주는 결과 화면</>} description="현재 저장소에는 확정 결과표가 없어 임의의 성능 수치를 넣지 않았습니다. 실제 보고서 데이터 연결 후 아래 구조에 표시됩니다." />
            <div className="result-dashboard">
              <div className="dashboard-controls">
                <div><small>연구 선택</small><div className="button-group">{['A', 'B'].map(key => <button key={key} onClick={() => setActiveResearch(key)} className={activeResearch === key ? 'active' : ''}>연구 {key}</button>)}</div></div>
                <div><small>참가자</small><div className="button-group participants">{participants.map(name => <button key={name} onClick={() => setParticipant(name)} className={participant === name ? 'active' : ''}>{name}</button>)}</div></div>
                <div><small>평가지표</small><div className="button-group metrics">{['BA', 'AUC'].map(item => <button key={item} onClick={() => setMetric(item)} className={metric === item ? 'active' : ''}>{item}</button>)}</div></div>
              </div>
              <div className="dashboard-grid">
                <article className="chart-card">
                  <div className="card-head"><div><small>성능 비교</small><h3>{participant} · {metric}</h3></div><span>데이터 연동 전</span></div>
                  <div className="empty-chart">
                    <div className="chart-lines"><i /><i /><i /><i /></div>
                    <div className="chart-placeholder"><Database /><b>확정된 연구 수치가 필요합니다</b><p>보고서 데이터 연결 후 기준 조건과 개선 조건을 표시합니다.</p></div>
                  </div>
                  <div className="legend"><span><i />{activeResearch === 'A' ? '16채널 기준' : 'TTT OFF'}</span><span><i />{activeResearch === 'A' ? '저채널 구성' : 'TTT ON'}</span></div>
                </article>
                <article className="condition-card">
                  <small>현재 선택 조건</small><h3>연구 {activeResearch}<br />{participant} · {metric}</h3>
                  <div className="condition-visual"><BarChart3 /><span>실제 결과 연결 위치</span></div>
                  <ul><li><Check /> 동일 평가 조건끼리 비교</li><li><Check /> 실제 보고서 수치만 사용</li><li><Check /> 선별 기준과 한계를 함께 표기</li></ul>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section lab-section" id="application">
          <div className="container">
            <SectionTitle light number="05" label="전극 구성 체험" title={<>채널 수를 바꾸며<br />전극 위치를 확인해보세요</>} description="현재 전극 조합은 화면 동작을 확인하기 위한 예시입니다. 실제 실험에서 확정된 채널 목록으로 교체해야 합니다." />
            <div className="electrode-lab">
              <aside>
                <small>채널 구성</small>
                {[16, 7, 5].map(number => <button key={number} className={channels === number ? 'active' : ''} onClick={() => setChannels(number)}><b>{String(number).padStart(2, '0')}</b><span>채널</span><i /></button>)}
                <div className="channel-stat"><span>현재 선택</span><b>{channels}<small> CH</small></b></div>
                <p><Sparkles /> 화면 확인용 구성</p>
              </aside>
              <BrainMap channels={channels} />
              <div className="lab-copy"><span className="live"><i /> 현재 구성</span><h3>{channels}채널<br />전극 배치</h3><p>{channels === 16 ? '전체 기준 채널을 표시합니다.' : '운동 피질 주변의 저채널 후보 구성을 표시합니다.'}</p><hr /><small>실험하지 않은 조합에 성능값을 표시하지 않습니다.</small></div>
            </div>

            <div className="replay-block">
              <div className="replay-copy"><span className="mini-label">저장 EEG 재생</span><h3>실제 신호와 예측 과정을<br />한 화면에서 확인</h3><p>원본 EEG가 연결되면 참가자·세션·Trial을 선택하고 파형과 모델 예측을 함께 재생합니다.</p><span className="notice">현재 파형은 UI 시연용입니다.</span></div>
              <div className={playing ? 'replay-console playing' : 'replay-console'}>
                <div className="console-head"><span><i /> EEG 재생 화면</span><b>시연용 파형</b></div>
                <div className="console-body"><div className="channel-labels"><span>C3</span><span>C4</span></div><div className="waves"><Waveform variant={1} /><Waveform variant={2} /><i className="playhead" /></div><div className="prediction"><small>예측 결과</small><b>LEFT</b><span>UI DEMO</span></div></div>
                <div className="console-controls"><button onClick={() => setPlaying(!playing)} aria-label={playing ? '일시정지' : '재생'}>{playing ? <Pause /> : <Play />}</button><span>00:0{playing ? '8' : '0'} / 00:30</span><div><i style={{ width: playing ? '28%' : '2%' }} /></div><b>1.0×</b></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section white-section applications">
          <div className="container">
            <SectionTitle number="06" label="확장 방향" title={<>뇌파 분류 결과를<br />기기와 게임 제어로 연결</>} description="아래 기능은 연구 결과의 활용 가능성을 보여주는 화면 시뮬레이션이며, 실제 IoT 기기나 실시간 EEG와 연결된 상태는 아닙니다." />
            <div className="expansion-grid">
              <article className="wearable-card">
                <div className="demo-heading"><span>01</span><div><small>저채널 웨어러블</small><h3>전극 위치 확인</h3></div></div>
                <div className="wearable-head">
                  <i className="wearable-band" />
                  {['C3', 'Cz', 'C4', 'P3', 'P4'].map((name, index) => <span className={`wearable-dot dot-${index + 1}`} key={name}><i />{name}</span>)}
                  <b><Radio /> 5 CH</b>
                </div>
                <p>운동 피질 주변의 핵심 전극을 가벼운 착용 구조에 배치한 콘셉트입니다.</p>
              </article>

              <article className="iot-card">
                <div className="demo-heading"><span>02</span><div><small>IoT 제어 시뮬레이션</small><h3>생활 기기 켜고 끄기</h3></div></div>
                <div className="iot-room">
                  <button className={iot.light ? 'on' : ''} onClick={() => setIot({ ...iot, light: !iot.light })}><Lightbulb /><span>조명</span><b>{iot.light ? 'ON' : 'OFF'}</b></button>
                  <button className={iot.blind ? 'on' : ''} onClick={() => setIot({ ...iot, blind: !iot.blind })}><SlidersHorizontal /><span>블라인드</span><b>{iot.blind ? 'OPEN' : 'CLOSE'}</b></button>
                  <button className={iot.fan ? 'on' : ''} onClick={() => setIot({ ...iot, fan: !iot.fan })}><Fan /><span>공기 순환</span><b>{iot.fan ? 'ON' : 'OFF'}</b></button>
                </div>
                <p><Power /> 버튼을 눌러 분류 명령이 기기 상태로 연결되는 흐름을 확인합니다.</p>
              </article>

              <article className="game-card">
                <div className="demo-heading"><span>03</span><div><small>좌·우 제어 미니게임</small><h3>떨어지는 물체 피하기</h3></div></div>
                <div className={gameRunning ? 'mini-game running' : 'mini-game'}>
                  <div className="game-brain"><BrainCircuit /><i className={gameSide === 'right' ? 'hot left' : gameSide === 'left' ? 'hot right' : ''} /><span>{gameSide === 'left' ? 'C4 자극점' : gameSide === 'right' ? 'C3 자극점' : '좌·우를 선택하세요'}</span></div>
                  <div className="game-stage">
                    <i className="falling item-1" /><i className="falling item-2" /><i className="falling item-3" />
                    <span className={`game-character ${gameSide}`}><Gamepad2 /></span>
                    <b>점수 {score}</b>
                  </div>
                </div>
                <div className="game-controls">
                  <button onClick={() => moveCharacter('left')}><MoveLeft /> 왼쪽</button>
                  <button className="game-start" onClick={() => { setGameRunning(!gameRunning); if (!gameRunning) setScore(0) }}>{gameRunning ? <Pause /> : <Play />}{gameRunning ? '일시정지' : '게임 시작'}</button>
                  <button onClick={() => moveCharacter('right')}>오른쪽 <MoveRight /></button>
                  <button className="reset" onClick={() => { setGameSide('center'); setScore(0); setGameRunning(false) }} aria-label="게임 초기화"><RotateCcw /></button>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="closing">
          <div className="container"><div><p>MI-BCI 캡스톤디자인</p><h2>운동상상 EEG를<br />더 간단하고 안정적으로</h2></div><a className="button light-button" href="#top">처음으로 돌아가기 <ArrowRight /></a></div>
        </section>
      </main>
      <footer><div className="container"><span>MI-BCI 연구팀 · CAPSTONE DESIGN 2026</span><span>운동상상 EEG 기반 BCI 연구</span></div></footer>
    </>
  )
}

export default App
