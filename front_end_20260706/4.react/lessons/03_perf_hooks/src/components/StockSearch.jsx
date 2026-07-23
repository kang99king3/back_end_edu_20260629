// ── STEP 2: useRef — DOM 접근 & 렌더와 무관한 값 보존 ── (빈칸 채우기)
// 개념: useRef로 ① input DOM 접근(포커스) ② 렌더 횟수 추적(리렌더 유발 X)
// 막히면 정답 참고: lessons_edu/03_perf_hooks/src/components/StockSearch.jsx
import { useState, useRef } from 'react'
import { STOCKS } from '../data/stocks'

export default function StockSearch() {
    const [query, setQuery] = useState('') //검색어
    const [results, setResults] = useState([]) //검색 결과

    // TODO: STEP 2 — input DOM에 접근할 ref(inputRef)를 useRef로 만드세요.
    const inputRef = useRef(null)
    // document.querySelector("input").focus(); (X)
    // inputRef.current.focus() (O)

    // TODO: STEP 2 — 렌더 횟수를 셀 ref(renderCount)를 useRef로 만들고, 렌더마다 1 증가시키세요.
    //   (state로 세면 무한 리렌더가 나므로 ref로 셉니다)
    // const renderCount = useState(0) -> 무한 렌더링 발생
    const renderCount = useRef(0)
    renderCount.current += 1 // 1씩 증가시키자

    const handleSearch = (e) => {
        const q = e.target.value
        setQuery(q)
        setResults(
            q.trim()
                ? STOCKS.filter(
                    (s) =>
                        s.symbol.toLowerCase().includes(q.toLowerCase()) ||
                        s.name.toLowerCase().includes(q.toLowerCase())
                )
                : []
        )
    }

    //초기화 기능
    const handleClear = () => {
        setQuery('')
        setResults([])
        // TODO: STEP 2 — ref로 실제 input에 포커스를 주세요.
        inputRef.current.focus()
    }

    return (
        <div style={{ padding: '1rem', maxWidth: '500px' }}>
            {/* TODO: STEP 2 — 렌더 횟수(renderCount의 현재값)를 화면에 표시하세요. */}
            <p style={{ fontSize: '12px', color: '#888' }}>렌더링 횟수: ({renderCount.current})</p>

            <div style={{ display: 'flex', gap: '8px' }}>
                {/* TODO: STEP 2 — 아래 input에 위에서 만든 ref를 연결하세요. */}
                <input
                    ref={inputRef}  // ref를 DOM요소와 연결
                    value={query}
                    onChange={handleSearch}
                    placeholder="종목 검색..."
                    style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}
                    autoFocus
                />
                <button onClick={handleClear}>지우기</button>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, marginTop: '8px' }}>
                {results.map((s) => (
                    <li key={s.id} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #eee', marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
                        <span><strong>{s.symbol}</strong> — {s.name}</span>
                        <span style={{ color: s.change >= 0 ? 'blue' : 'red' }}>{s.change >= 0 ? '+' : ''}{s.change}%</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
