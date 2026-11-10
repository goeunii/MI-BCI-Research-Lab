# MI—BCI Research Lab

운동상상(Motor Imagery) EEG 기반 BCI 캡스톤디자인 프로젝트를 소개하는 인터랙티브 웹사이트 MVP입니다.

## 구현 범위

- **HOME** — 프로젝트 문제 정의, 운동상상 뇌 시각화, 연구 A/B 소개, 전체 파이프라인
- **RESEARCH** — 저채널·신호 안정화 연구와 TTT 온라인 적응 연구 탭
- **RESULTS** — 연구·참가자·지표 선택이 가능한 결과 대시보드 구조
- **APPLICATION** — 채널 프리셋 전극 맵, 웨어러블 콘셉트, EEG Replay, Unity 데모 영역
- 데스크톱과 모바일 반응형 레이아웃
- 키보드 접근이 가능한 주요 버튼과 `prefers-reduced-motion` 대응

## 데이터 표기 원칙

현재 저장소에는 확정된 연구 결과표와 원본 EEG가 포함되어 있지 않습니다. 따라서 MVP에는 임의 성능 수치를 넣지 않았습니다.

- 결과 그래프: `DATA PENDING` 상태로 표시
- 전극 프리셋: 인터랙션 검증용 구성으로 표시
- EEG Replay: `UI SIMULATION · NO SOURCE EEG`로 표시
- 웨어러블: 검증된 기기가 아닌 콘셉트로 표시

실제 데이터를 연결할 때는 평가 조건이 다른 연구 A와 B를 분리하고, 보고서에 기록된 수치만 사용해야 합니다.

## 실행 방법

http://localhost:5173/

## 기술 스택

- React
- Vite
- Tailwind CSS
- React Router
- Lucide React

## 실제 데이터 연동 위치

현재 화면 데이터는 [`src/App.jsx`](src/App.jsx)에 모여 있습니다. 다음 단계에서는 별도 `src/data/` 디렉터리로 데이터를 분리하는 것을 권장합니다.

1. 참가자별 BA·AUC와 평가 조건
2. 연구 A의 확정 16/7/5채널 목록
3. 연구 B의 모델별 TTT OFF/ON 결과
4. 웹 공개가 가능한 저장 EEG 시계열과 예측 로그
5. Unity WebGL 빌드 또는 시연 영상

## 배포

SPA 경로 새로고침을 지원하도록 `vercel.json`을 포함했습니다. Vercel에서 이 저장소를 연결하면 기본 Vite 설정으로 배포할 수 있습니다.

