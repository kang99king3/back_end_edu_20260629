// ── STEP 5: 두 데모를 한 화면에 조합 ──
// StockSearch(useRef) + StockList(useMemo·useCallback·memo).
// 브라우저 콘솔을 열고 조작하면서 '언제 재계산/리렌더가 일어나는지' 로그로 확인하세요.
import StockSearch from './components/StockSearch'
import StockList from './components/StockList'

function App() {
  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '1.5rem', fontFamily: 'sans-serif' }}>
      <h1>⚡ 성능 훅 실습</h1>

      <h2 style={{ fontSize: '1.1rem', color: '#374151' }}>1) useRef — 검색창 포커스 & 렌더 횟수</h2>
      <StockSearch />

      <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '1.5rem 0' }} />

      <h2 style={{ fontSize: '1.1rem', color: '#374151' }}>2) useMemo · useCallback · memo — 목록 최적화</h2>
      <StockList />
    </div>
  )
}

export default App
