// ── STEP 3: 검색 API를 호출하는 클라이언트 ── (빈칸 채우기)
// 개념: 우리 API(/api/search)를 fetch → 드롭다운. 클릭 시 관심종목 추가.
// 막히면 정답 참고: lessons_edu/09_api_routes/app/components/StockSearch.jsx
'use client'
import { useState, useRef } from 'react'
import useStockStore from '@/app/store/useStockStore'

export default function StockSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const inputRef = useRef(null)
  const addToWatchlist = useStockStore((s) => s.addToWatchlist)

  const handleChange = async (e) => {
    const q = e.target.value
    setQuery(q)
    if (!q.trim()) {
      setResults([])
      return
    }
    // TODO: STEP 3 — /api/search?q=... 를 fetch해서 받은 results를 setResults 하세요.
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
    const data = await res.json() //js객체로 변환
    // fetch('url').then((res)=>res.json()).then()

    setResults(data.results || [])
  }

  const handleSelect = (symbol) => {
    // TODO: STEP 3 — 관심종목에 추가하고, 입력/결과를 초기화한 뒤 입력창에 포커스를 복원하세요.
    addToWatchlist(symbol)
    setQuery('')
    setResults([])
    inputRef.current?.focus()
  }

  return (
    <div style={{ position: 'relative', padding: '1rem' }}>
      <input
        ref={inputRef}
        value={query}
        onChange={handleChange}
        placeholder="종목 검색 (예: Apple, AAPL)"
        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #0f3460', background: '#0a192f', color: '#ccd6f6', fontSize: '14px' }}
      />
      {results.length > 0 && (
        <ul style={{ position: 'absolute', top: '100%', left: '1rem', right: '1rem', background: '#0d2137', border: '1px solid #0f3460', borderRadius: '8px', listStyle: 'none', padding: '4px', margin: 0, zIndex: 100 }}>
          {results.map((r) => (
            <li key={r.symbol} onClick={() => handleSelect(r.symbol)} style={{ padding: '10px 12px', cursor: 'pointer', borderRadius: '6px', display: 'flex', justifyContent: 'space-between' }}>
              <span>
                <strong style={{ color: '#61dafb' }}>{r.symbol}</strong>
                <span style={{ color: '#8892b0', marginLeft: '8px', fontSize: '13px' }}>{r.name}</span>
              </span>
              <span style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', background: '#0a192f', color: '#8892b0' }}>{r.exchange}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
