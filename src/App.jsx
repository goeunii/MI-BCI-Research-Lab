import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import {
  Activity,
  ArrowDown,
  ArrowRight,
  BrainCircuit,
  ChevronRight,
  CircleDot,
  Database,
  FlaskConical,
  Gamepad2,
  Menu,
  MousePointer2,
  Pause,
  Play,
  Radio,
  Rotate3D,
  ScanLine,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Research', path: '/research' },
  { label: 'Results', path: '/results' },
  { label: 'Application', path: '/application' },
]

const researchTracks = {
  A: {
    eyebrow: 'Research A · Signal stability',
    title: '더 적은 채널로,\n더 안정적인 신호를.',
    description:
      '운동상상 분류에 필요한 핵심 전극을 탐색하고, 세션과 날짜가 달라져도 흔들리지 않는 신호 표현을 연구합니다.',
    question: '채널 수를 줄여도 분류 정보는 유지될 수 있을까?',
    tags: ['16 → 5–7 CH', 'ARTIFACT GATING', 'COVARIANCE', 'ZERO CALIBRATION'],
    steps: [
      ['01', 'EEG 수집', '좌·우 손 운동상상 데이터를 여러 세션에서 수집합니다.'],
      ['02', '품질 관리', '신호 품질을 확인하고 분석에 적합한 구간을 선별합니다.'],
      ['03', '채널 탐색', '16채널 기준과 저채널 후보 구성을 동일 조건에서 비교합니다.'],
      ['04', '신호 안정화', '세션 간 분포 변화에 대응하는 보정 전략을 검증합니다.'],
    ],
  },
  B: {
    eyebrow: 'Research B · Test-time adaptation',
    title: '새로운 EEG에,\n테스트 중 적응하다.',
    description:
      '학습이 끝난 모델을 그대로 고정하는 대신, 새로운 테스트 신호의 특성을 활용해 추론 시점에 적응시키는 방법을 탐색합니다.',
    question: '모델이 처음 보는 세션에 스스로 적응할 수 있을까?',
    tags: ['EEGNET', 'CONFORMER', 'TTT OFF / ON', 'SESSION SHIFT'],
    steps: [
      ['01', '기준 모델 학습', '학습 세션으로 EEGNet과 Conformer 기준 모델을 구성합니다.'],
      ['02', '새 세션 입력', '모델이 학습에서 보지 못한 테스트 세션을 입력합니다.'],
      ['03', 'TTT 적응', '테스트 신호의 보조 목적을 이용해 제한적으로 가중치를 갱신합니다.'],
      ['04', '독립 평가', '동일 조건에서 TTT OFF와 ON을 나누어 비교합니다.'],
    ],
  },
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="MI-BCI Research Lab 홈">
        <span className="brand-mark"><BrainCircuit size={18} /></span>
        <span>MI—BCI <b>LAB</b></span>
      </Link>
      <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="주요 메뉴">
        {navItems.map((item, index) => (
          <NavLink key={item.path} to={item.path} end={item.path === '/'} onClick={() => setOpen(false)}>
            <span>0{index + 1}</span>{item.label}
          </NavLink>
        ))}
      </nav>
      <div className="header-status"><span /> CAPSTONE 2026</div>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="메뉴 열기" aria-expanded={open}>
        {open ? <X /> : <Menu />}
      </button>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <p className="eyebrow">MI—BCI RESEARCH LAB</p>
        <h2>Think left.<br />Think right.</h2>
      </div>
      <div className="footer-meta">
        <p>운동상상 EEG 기반 좌·우 분류와<br />신호 안정화 및 온라인 적응 연구</p>
        <span>CAPSTONE DESIGN · 2026</span>
      </div>
    </footer>
  )
}

function Layout({ children }) {
  return <><Header /><main>{children}</main><Footer /></>
}

function SignalLine({ mode = 'left', subtle = false }) {
  return (
    <svg className={subtle ? 'signal-line subtle' : 'signal-line'} viewBox="0 0 620 120" preserveAspectRatio="none" aria-hidden="true">
      <path className="signal-grid" d="M0 30H620M0 60H620M0 90H620" />
      <path className="signal-path signal-back" d="M0 65 C20 64 24 66 38 64 S58 56 70 66 S90 75 108 62 S132 49 146 68 S169 77 188 63 S209 58 224 65 S244 70 258 61 S279 41 294 70 S314 84 328 61 S350 46 366 69 S389 78 405 64 S426 53 442 67 S466 75 480 61 S502 48 520 68 S543 76 558 63 S586 59 620 65" />
      <path className={`signal-path ${mode}`} d="M0 65 C20 64 24 66 38 64 S58 56 70 66 S90 75 108 62 S132 49 146 68 S169 77 188 63 S209 58 224 65 S244 70 258 61 S279 41 294 70 S314 84 328 61 S350 46 366 69 S389 78 405 64 S426 53 442 67 S466 75 480 61 S502 48 520 68 S543 76 558 63 S586 59 620 65" />
    </svg>
  )
}

function BrainVisual({ mode = 'left', compact = false }) {
  return (
    <div className={compact ? 'brain-visual compact' : 'brain-visual'}>
      <div className="brain-orbit orbit-one" />
      <div className="brain-orbit orbit-two" />
      <div className={`brain-shell ${mode}`}>
        <svg viewBox="0 0 420 420" role="img" aria-label={`${mode === 'left' ? '왼손' : '오른손'} 운동상상 뇌 영역 시각화`}>
          <defs>
            <pattern id="brainGrid" width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M 18 0 L 0 0 0 18" fill="none" stroke="currentColor" strokeWidth="0.8" opacity=".32" />
            </pattern>
          </defs>
          <path className="brain-half left-half" d="M205 57C134 40 60 97 48 179c-8 57 16 109 62 138 27 17 56 31 95 41V57Z" />
          <path className="brain-half right-half" d="M215 57c71-17 145 40 157 122 8 57-16 109-62 138-27 17-56 31-95 41V57Z" />
          <path className="brain-grid-fill" d="M205 57C134 40 60 97 48 179c-8 57 16 109 62 138 27 17 56 31 95 41V57Zm10 0c71-17 145 40 157 122 8 57-16 109-62 138-27 17-56 31-95 41V57Z" fill="url(#brainGrid)" />
          <g className="brain-lines">
            <path d="M204 90c-40-19-83 1-102 37M204 142c-58-19-112 17-118 65M205 201c-61-4-100 30-105 75M205 267c-41 1-69 20-79 48" />
            <path d="M216 90c40-19 83 1 102 37M216 142c58-19 112 17 118 65M215 201c61-4 100 30 105 75M215 267c41 1 69 20 79 48" />
          </g>
          <g className="electrode-points">
            <circle className="c3" cx="151" cy="204" r="8" /><circle className="cz" cx="210" cy="182" r="8" /><circle className="c4" cx="269" cy="204" r="8" />
          </g>
        </svg>
        <span className="brain-label label-c3">C3</span>
        <span className="brain-label label-c4">C4</span>
        <span className="scan-line" />
      </div>
      <div className="brain-caption"><Rotate3D size={15} /> MOTOR CORTEX · LIVE VIEW</div>
    </div>
  )
}

function SectionHeading({ number, eyebrow, title, body }) {
  return (
    <div className="section-heading">
      <div className="section-number">{number}</div>
      <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{body && <p className="section-body">{body}</p>}</div>
    </div>
  )
}

function HomePage() {
  const [mode, setMode] = useState('left')
  return (
    <Layout>
      <section className="hero page-shell">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span /> EEG MOTOR IMAGERY · CAPSTONE DESIGN</p>
          <h1>Thought<br /><em>becomes</em><br />interface.</h1>
          <p className="hero-description">뇌의 좌·우 운동상상을 읽고, 더 적은 전극과 더 나은 적응으로 사람과 기술 사이의 새로운 인터페이스를 연구합니다.</p>
          <div className="hero-actions">
            <Link to="/research" className="button primary">연구 살펴보기 <ArrowRight size={17} /></Link>
            <Link to="/application" className="button ghost">데모 체험하기 <MousePointer2 size={16} /></Link>
          </div>
        </div>
        <div className="hero-lab">
          <div className="hero-visual-top"><span>NEURAL SIGNAL / 001</span><span>INTERACTIVE MODEL</span></div>
          <BrainVisual mode={mode} />
          <div className="mode-control">
            <span>MOTOR IMAGERY</span>
            <div>{['left', 'right'].map((item) => <button key={item} className={mode === item ? 'active' : ''} onClick={() => setMode(item)}>{item.toUpperCase()}</button>)}</div>
          </div>
        </div>
        <a href="#overview" className="scroll-hint"><ArrowDown size={16} /> SCROLL TO EXPLORE</a>
      </section>

      <section id="overview" className="overview page-shell section-pad">
        <SectionHeading number="01" eyebrow="WHY THIS RESEARCH" title={<>EEG는 매일,<br />조금씩 달라집니다.</>} body="같은 사람의 같은 상상도 전극 수, 세션, 날짜와 환경에 따라 신호 분포가 달라집니다. 우리는 이 변화 속에서도 사용할 수 있는 BCI를 고민합니다." />
        <div className="problem-grid">
          <article><span className="icon-box"><CircleDot /></span><p>01 · CHANNELS</p><h3>많은 전극이<br />항상 필요할까?</h3><small>착용 부담을 낮추기 위한 핵심 채널 탐색</small></article>
          <article><span className="icon-box"><Activity /></span><p>02 · VARIATION</p><h3>세션이 달라져도<br />안정적일 수 있을까?</h3><small>날짜·세션 간 EEG 분포 변화에 대응</small></article>
          <article><span className="icon-box"><Zap /></span><p>03 · ADAPTATION</p><h3>새로운 신호에<br />적응할 수 있을까?</h3><small>테스트 시점 적응 전략의 가능성 탐색</small></article>
        </div>
      </section>

      <section className="tracks page-shell section-pad">
        <SectionHeading number="02" eyebrow="TWO RESEARCH TRACKS" title="하나의 목표, 두 개의 접근." />
        <div className="track-list">
          <Link to="/research?track=A" className="track-card track-a">
            <div className="track-index">A</div><div className="track-copy"><p>SIGNAL OPTIMIZATION</p><h3>저채널 최적화 &<br />신호 안정화</h3><span>16CH → 5–7CH · COVARIANCE · CALIBRATION</span></div><ArrowRight />
          </Link>
          <Link to="/research?track=B" className="track-card track-b">
            <div className="track-index">B</div><div className="track-copy"><p>ONLINE ADAPTATION</p><h3>TTT 기반<br />테스트 시점 적응</h3><span>STATIC → ADAPTIVE · EEGNET · CONFORMER</span></div><ArrowRight />
          </Link>
        </div>
      </section>

      <section className="pipeline page-shell section-pad">
        <div className="pipeline-title"><p className="eyebrow">END-TO-END PIPELINE</p><h2>생각에서<br />명령까지.</h2></div>
        <div className="pipeline-flow">
          {[['01','IMAGINE','좌·우 손 운동상상'],['02','CAPTURE','다채널 EEG 수집'],['03','PROCESS','전처리·특징 추출'],['04','CLASSIFY','LEFT / RIGHT 분류'],['05','CONNECT','응용 인터페이스']].map((step, i) => <div className="pipeline-step" key={step[0]}><span>{step[0]}</span><b>{step[1]}</b><small>{step[2]}</small>{i < 4 && <ChevronRight />}</div>)}
        </div>
        <SignalLine mode={mode} subtle />
      </section>
    </Layout>
  )
}

function ResearchPage() {
  const initialTrack = new URLSearchParams(useLocation().search).get('track')
  const [active, setActive] = useState(initialTrack === 'B' ? 'B' : 'A')
  const data = researchTracks[active]
  return (
    <Layout>
      <section className="page-intro page-shell research-intro">
        <p className="eyebrow">02 / RESEARCH</p>
        <h1>How do we make<br /><em>EEG more usable?</em></h1>
        <p>EEG의 현실적인 한계를 줄이기 위해 하드웨어 입력과 모델 적응, 두 방향에서 접근합니다.</p>
      </section>
      <section className="research-switch page-shell">
        <button onClick={() => setActive('A')} className={active === 'A' ? 'active' : ''}><span>A</span><div><small>RESEARCH A</small>저채널·신호 안정화</div></button>
        <button onClick={() => setActive('B')} className={active === 'B' ? 'active' : ''}><span>B</span><div><small>RESEARCH B</small>TTT 온라인 적응</div></button>
      </section>
      <section className={`research-detail page-shell track-${active.toLowerCase()}`}>
        <div className="research-detail-copy"><p className="eyebrow">{data.eyebrow}</p><h2>{data.title.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h2><p>{data.description}</p><div className="tag-row">{data.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
        <div className="research-figure">
          {active === 'A' ? <BrainVisual mode="left" compact /> : <AdaptationDiagram />}
        </div>
      </section>
      <section className="research-question page-shell"><p>CORE QUESTION</p><h2>“{data.question}”</h2></section>
      <section className="method page-shell section-pad">
        <SectionHeading number="03" eyebrow={`${active === 'A' ? 'SIGNAL' : 'ADAPTATION'} PIPELINE`} title="연구는 이렇게 진행됩니다." />
        <div className="method-list">{data.steps.map(([n, title, body]) => <article key={n}><span>{n}</span><div><h3>{title}</h3><p>{body}</p></div><ArrowRight /></article>)}</div>
      </section>
      <section className="evaluation-callout page-shell">
        <div><p className="eyebrow">EVALUATION PRINCIPLE</p><h2>같은 조건끼리,<br />독립적으로 비교합니다.</h2></div>
        <p>연구 A와 B는 데이터 구성과 평가 목적이 다릅니다. 결과를 하나의 순위로 섞지 않고, 각 연구 안에서 기준 조건과 개선 조건을 비교합니다.</p>
        <Link to="/results" className="circle-link" aria-label="결과 보기"><ArrowRight /></Link>
      </section>
    </Layout>
  )
}

function AdaptationDiagram() {
  return (
    <div className="adaptation-diagram">
      <div className="adapt-node"><Database /><small>NEW SESSION</small><b>Test EEG</b></div><ArrowRight className="adapt-arrow" />
      <div className="adapt-core"><span className="pulse-ring" /><BrainCircuit /><small>TEST-TIME</small><b>Adaptation</b></div><ArrowRight className="adapt-arrow" />
      <div className="adapt-output"><span>L</span><span>R</span><small>PREDICTION</small></div>
      <SignalLine mode="right" subtle />
    </div>
  )
}

const subjects = ['KGE', 'KHY', 'OYJ', 'WMJ']

function ResultsPage() {
  const [track, setTrack] = useState('A')
  const [subject, setSubject] = useState('KGE')
  const [metric, setMetric] = useState('BA')
  return (
    <Layout>
      <section className="page-intro page-shell results-intro">
        <p className="eyebrow">03 / RESULTS</p>
        <h1>Evidence,<br /><em>not assumptions.</em></h1>
        <p>참가자와 평가 조건을 선택해 연구별 결과를 탐색하는 대시보드입니다.</p>
      </section>
      <section className="dashboard page-shell">
        <div className="dashboard-toolbar">
          <div><small>RESEARCH</small><div className="segmented">{['A','B'].map(item => <button key={item} onClick={() => setTrack(item)} className={track === item ? 'active' : ''}>{item === 'A' ? 'A · LOW CHANNEL' : 'B · TTT'}</button>)}</div></div>
          <div><small>SUBJECT</small><div className="segmented compact">{subjects.map(item => <button key={item} onClick={() => setSubject(item)} className={subject === item ? 'active' : ''}>{item}</button>)}</div></div>
          <div><small>METRIC</small><div className="segmented compact">{['BA','AUC'].map(item => <button key={item} onClick={() => setMetric(item)} className={metric === item ? 'active' : ''}>{item}</button>)}</div></div>
        </div>
        <div className="dashboard-grid">
          <article className="metric-panel performance-panel">
            <div className="panel-title"><div><small>PERFORMANCE COMPARISON</small><h3>{subject} · {metric}</h3></div><span className="data-state">DATA PENDING</span></div>
            <div className="empty-chart">
              <div className="chart-y"><span>1.0</span><span>0.75</span><span>0.5</span><span>0.25</span><span>0</span></div>
              <div className="chart-area"><i /><i /><i /><i /><i /><div className="empty-message"><Database /><b>연구 데이터 연동 전</b><span>실제 보고서 수치만 표시할 예정입니다.</span></div></div>
            </div>
            <div className="chart-legend"><span><i className="legend-base" />{track === 'A' ? '16CH BASELINE' : 'TTT OFF'}</span><span><i className="legend-active" />{track === 'A' ? 'LOW-CHANNEL' : 'TTT ON'}</span></div>
          </article>
          <article className="metric-panel selected-panel"><div className="panel-title"><div><small>SELECTED CONDITION</small><h3>{track === 'A' ? 'Channel layout' : 'Adaptation mode'}</h3></div></div>{track === 'A' ? <MiniElectrodes /> : <div className="mini-adapt"><BrainCircuit /><span>STATIC</span><ArrowRight /><span>ADAPTIVE</span></div>}<p className="panel-note">실제 실험 설정을 연결하면 이 영역에 선택 채널과 모델 조건이 표시됩니다.</p></article>
          <article className="metric-panel session-panel"><div className="panel-title"><div><small>SESSION PERFORMANCE</small><h3>Across sessions</h3></div><span className="data-state">DATA PENDING</span></div><div className="session-placeholder"><SignalLine mode={track === 'A' ? 'left' : 'right'} /><span>SESSION 01</span><span>SESSION 02</span><span>SESSION 03</span></div></article>
          <article className="metric-panel note-panel"><ScanLine /><div><small>READING THE RESULTS</small><h3>수치보다 조건을<br />먼저 읽어주세요.</h3><p>BA·AUC는 데이터 분할, 세션 구성, 선별 기준을 함께 봐야 의미가 있습니다. 최종 데이터 연동 시 각 그래프에 평가 조건을 함께 표기합니다.</p></div></article>
        </div>
      </section>
      <section className="data-principles page-shell section-pad">
        <SectionHeading number="04" eyebrow="DATA INTEGRITY" title="보여주기 위한 숫자를 만들지 않습니다." />
        <div className="principle-list"><p><span>01</span>보고서에 기록된 실제 수치만 사용</p><p><span>02</span>평가 조건이 다른 결과는 분리</p><p><span>03</span>실측·재생·시뮬레이션을 명확히 구분</p></div>
      </section>
    </Layout>
  )
}

const electrodes = [
  ['Fp1',32,18],['Fp2',68,18],['F7',17,35],['F3',36,36],['Fz',50,33],['F4',64,36],['F8',83,35],
  ['T7',12,52],['C3',34,52],['Cz',50,50],['C4',66,52],['T8',88,52],
  ['P7',18,70],['P3',36,68],['Pz',50,70],['P4',64,68],['P8',82,70],['O1',38,84],['O2',62,84],
]
const channelPresets = {
  16: new Set(['Fp1','Fp2','F7','F3','F4','F8','C3','Cz','C4','P7','P3','Pz','P4','P8','O1','O2']),
  7: new Set(['FC3','C3','Cz','C4','FC4','P3','P4']),
  5: new Set(['C3','Cz','C4','P3','P4']),
}

function MiniElectrodes() {
  return <div className="mini-electrodes"><div className="head-outline" />{electrodes.filter(([n]) => ['C3','Cz','C4','P3','P4'].includes(n)).map(([n,x,y]) => <i key={n} style={{left:`${x}%`,top:`${y}%`}} title={n} />)}</div>
}

function ElectrodeMap({ channels }) {
  return (
    <div className="electrode-map">
      <div className="map-head"><span className="map-nose" /><span className="map-ear left" /><span className="map-ear right" />
        {electrodes.map(([name,x,y]) => <button key={name} className={channelPresets[channels].has(name) ? 'selected' : ''} style={{left:`${x}%`,top:`${y}%`}} aria-label={`${name} 전극`}><i /><span>{name}</span></button>)}
      </div>
      <div className="map-axis axis-x" /><div className="map-axis axis-y" />
    </div>
  )
}

function ApplicationPage() {
  const [channels, setChannels] = useState(7)
  const [playing, setPlaying] = useState(false)
  const reduction = channels === 16 ? '0%' : channels === 7 ? '56%' : '69%'
  const selectedCount = useMemo(() => [...channelPresets[channels]].filter(name => electrodes.some(([n]) => n === name)).length, [channels])
  return (
    <Layout>
      <section className="page-intro page-shell application-intro">
        <p className="eyebrow">04 / APPLICATION</p>
        <h1>From brain signals<br /><em>to real interaction.</em></h1>
        <p>전극 구성부터 저장 EEG 재생, 게임 제어까지 연구의 확장 가능성을 직접 탐색합니다.</p>
      </section>
      <section className="atlas page-shell section-pad">
        <SectionHeading number="05" eyebrow="INTERACTIVE ELECTRODE ATLAS" title="필요한 신호만 남긴다면?" body="프리셋을 전환해 채널 수에 따른 전극 배치를 비교해보세요. 현재 위치는 UI 검증용이며 최종 연구 채널과 교체됩니다." />
        <div className="atlas-lab">
          <div className="atlas-controls"><small>CHANNEL PRESET</small>{[16,7,5].map(n => <button onClick={() => setChannels(n)} className={channels === n ? 'active' : ''} key={n}><span>{String(n).padStart(2,'0')}</span> CHANNELS <i /></button>)}<div className="atlas-stats"><p><span>SELECTED</span><b>{selectedCount || channels} <small>CH</small></b></p><p><span>REDUCTION</span><b>{reduction}</b></p></div><p className="demo-note"><Sparkles size={14} /> MVP DEMO CONFIGURATION</p></div>
          <ElectrodeMap channels={channels} />
          <div className="atlas-info"><div className="live-chip"><span /> LIVE CONFIG</div><h3>{channels} Channel<br />Configuration</h3><p>{channels === 16 ? '전체 기준 채널 구성을 표시합니다.' : '운동 피질 주변의 저채널 후보 구성을 표시합니다.'}</p><div className="info-rule" /><small>현재 전극 조합은 화면 작동 확인용입니다. 실제 실험에서 확정된 채널 목록으로 교체해야 합니다.</small></div>
        </div>
      </section>
      <section className="wearable page-shell section-pad">
        <div className="wearable-copy"><p className="eyebrow">WEARABLE CONCEPT</p><h2>연구실 밖에서도<br />사용할 수 있도록.</h2><p>전극 감소가 실제 착용 구조에 어떤 가능성을 주는지 보여주는 개념 시뮬레이션입니다. 기기 사양이나 성능을 주장하지 않습니다.</p><div className="concept-labels"><span>CONCEPT ONLY</span><span>NOT A VALIDATED DEVICE</span></div></div>
        <div className="wearable-visual"><div className="head-profile"><i className="strap strap-one" /><i className="strap strap-two" />{[1,2,3,4,5].map(n => <i className={`wearable-node node-${n}`} key={n} />)}<span className="device-module"><Radio /></span></div><div className="wearable-caption"><span>LIGHTWEIGHT EEG</span><b>05 CH CONCEPT</b></div></div>
      </section>
      <section className="replay page-shell section-pad">
        <SectionHeading number="06" eyebrow="RECORDED SIGNAL EXPLORER" title="저장된 EEG를 다시 재생합니다." body="실제 원본 신호가 연결되기 전까지는 UI 동작을 보여주는 시뮬레이션 파형입니다." />
        <div className={playing ? 'replay-console playing' : 'replay-console'}>
          <div className="console-top"><div><span className="record-dot" /> EEG REPLAY</div><span>UI SIMULATION · NO SOURCE EEG</span></div>
          <div className="console-grid"><aside><small>SUBJECT</small><b>WMJ</b><small>SESSION</small><b>—</b><small>TRIAL</small><b>DEMO 01</b></aside><div className="wave-stage"><div className="channel-label"><span>C3</span><span>C4</span></div><SignalLine mode="left" /><SignalLine mode="right" /><div className="playhead" /></div><div className="prediction"><small>PREDICTION MONITOR</small><div><span className="direction">L</span><div><p>OUTPUT</p><b>LEFT</b></div></div><p><span>Source</span><b>UI DEMO</b></p></div></div>
          <div className="console-controls"><button onClick={() => setPlaying(!playing)} aria-label={playing ? '일시정지' : '재생'}>{playing ? <Pause /> : <Play />}</button><span>00:0{playing ? '8' : '0'} / 00:30</span><div className="timeline"><i style={{width: playing ? '28%' : '2%'}} /></div><span>1.0×</span></div>
        </div>
      </section>
      <section className="game-demo page-shell section-pad">
        <div className="game-screen"><div className="game-grid" /><div className="game-avatar"><BrainCircuit /></div><div className="game-target target-left">L</div><div className="game-target target-right">R</div><div className="game-scan" /><span className="screen-label">UNITY / WEB DEMO SLOT</span></div>
        <div className="game-copy"><p className="eyebrow">GAME CONTROLLER</p><h2>분류 결과가<br />게임의 입력으로.</h2><p>LEFT / RIGHT 예측을 게임의 이동이나 선택 명령으로 연결합니다. 현재는 Unity WebGL 또는 실행 영상을 연결할 수 있도록 준비된 데모 영역입니다.</p><div className="game-flow"><span>EEG</span><ArrowRight /><span>CLASSIFIER</span><ArrowRight /><span>GAME</span></div><button className="button disabled" disabled><Gamepad2 size={17} /> DEMO COMING SOON</button></div>
      </section>
    </Layout>
  )
}

function NotFound() {
  return <Layout><section className="not-found page-shell"><p className="eyebrow">404 / SIGNAL LOST</p><h1>페이지를 찾을 수 없습니다.</h1><Link to="/" className="button primary">홈으로 돌아가기 <ArrowRight /></Link></section></Layout>
}

export default function App() {
  return <><ScrollToTop /><Routes><Route path="/" element={<HomePage />} /><Route path="/research" element={<ResearchPage />} /><Route path="/results" element={<ResultsPage />} /><Route path="/application" element={<ApplicationPage />} /><Route path="*" element={<NotFound />} /></Routes></>
}
