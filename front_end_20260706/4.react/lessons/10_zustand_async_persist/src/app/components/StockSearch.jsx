// 09강과 동일 — 검색해서 관심종목 추가
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
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
    const data = await res.json()
    setResults(data.results || [])
  }

  const handleSelect = (symbol) => {
    addToWatchlist(symbol) // 스토어에서 추가 + 시세 fetch까지 처리 (10강 스토어)
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
