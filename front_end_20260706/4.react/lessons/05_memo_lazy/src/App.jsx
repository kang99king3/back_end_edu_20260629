// ── STEP 3: lazy + Suspense 로 코드 분할 & 로딩 처리 ── (빈칸 채우기)
// 개념: lazy(() => import(...))로 필요할 때 로드, Suspense fallback으로 로딩 UI.
// 막히면 정답 참고: lessons_edu/05_memo_lazy/src/App.jsx
import { lazy, Suspense, useState } from 'react'
import MemoComparison from './components/MemoComparison'

// (헬퍼는 제공됩니다) fallback을 눈으로 보려고 1초 지연을 넣은 lazy import
const lazyWithDelay = (factory) =>
  lazy(() => new Promise((resolve) => setTimeout(() => resolve(factory()), 1000)))

// TODO: STEP 3 — HeavyChart / HeavyReport를 lazyWithDelay(또는 lazy)로 불러오세요.
//   (경로: './components/HeavyChart', './components/HeavyReport')
const HeavyChart = () => <p>TODO: lazy로 불러오세요</p>
const HeavyReport = () => <p>TODO: lazy로 불러오세요</p>

function LoadingSpinner({ label }) {
  return <div style={{ padding: '3rem', textAlign: 'center', border: '1px dashed #ddd', borderRadius: '8px', color: '#888' }}>⏳ {label || '로딩 중'}...</div>
}

export default function App() {
  const [tab, setTab] = useState('memo')
  const tabs = [
    { id: 'memo', label: '⚡ memo 비교' },
    { id: 'chart', label: '📈 차트 (lazy)' },
    { id: 'report', label: '📑 리포트 (lazy)' },
  ]

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '1.5rem', fontFamily: 'sans-serif' }}>
      <h1>🧩 React.memo · lazy/Suspense 실습</h1>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #ddd', cursor: 'pointer', background: tab === t.id ? '#1a1a18' : '#fff', color: tab === t.id ? '#fff' : '#333' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* TODO: STEP 3 — 아래 영역을 <Suspense fallback={<LoadingSpinner .../>}>로 감싸세요.
          (lazy 컴포넌트가 로드되는 동안 fallback이 보입니다) */}
      <div>
        {tab === 'memo' && <MemoComparison />}
        {tab === 'chart' && <HeavyChart />}
        {tab === 'report' && <HeavyReport />}
      </div>
    </div>
  )
}
