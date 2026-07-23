// ── STEP 4: useMemo(연산 캐싱) + useCallback(함수 캐싱) ── (빈칸 채우기)
// 개념: useMemo로 무거운 필터/정렬 캐싱, useCallback으로 함수 참조 고정(memo 자식 최적화)
// 막히면 정답 참고: lessons_edu/03_perf_hooks/src/components/StockList.jsx
import { useState, useMemo, useCallback } from 'react'
import { STOCKS } from '../data/stocks'
import StockRow from './StockRow'

export default function StockList() {
    const [filter, setFilter] = useState('all')  // all | up | down 
    const [sortBy, setSortBy] = useState('symbol') // symbol | price | change
    const [favorites, setFavorites] = useState([]) // ['AAPL',...]

    // TODO: STEP 4 — 아래 '즉시실행 함수'를 useMemo로 바꿔, [filter, sortBy]일 때만 재계산되게 하세요.
    //   (지금은 매 렌더마다 실행되어 즐겨찾기 클릭에도 '재계산' 로그가 찍힙니다)
    const processedStocks = useMemo(() => {
        console.log('정렬/필터 재계산!')
        let result = [...STOCKS] // 배열 복사
        if (filter === 'up') result = result.filter((s) => s.change >= 0)
        if (filter === 'down') result = result.filter((s) => s.change < 0)
        result.sort((a, b) => {
            if (sortBy === 'price') return b.price - a.price
            if (sortBy === 'change') return b.change - a.change
            return a.symbol.localeCompare(b.symbol) //사전식 정렬할때 localCompare사용
        })
        return result
        // })() // ← 이 즉시실행을 useMemo로 교체하세요
    }, [filter, sortBy]) // useMemo(func,[filter,sortBy]) 설정함

    // TODO: STEP 4 — 이 함수를 useCallback으로 감싸 참조를 고정하세요. (의존성 [])
    //   (고정하지 않으면 매 렌더마다 새 함수가 되어 StockRow의 memo가 무력화됩니다)
    const toggleFavorite = useCallback((symbol) => {
        setFavorites((prev) =>
            prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
        )
    }, [])

    const chipStyle = (active) => ({
        marginLeft: '4px', padding: '4px 10px', borderRadius: '12px', border: '1px solid #ddd', cursor: 'pointer',
        background: active ? '#1a1a18' : '#fff', color: active ? '#fff' : '#333',
    })

    return (
        <div style={{ padding: '1rem', maxWidth: '600px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <div>
                    <label style={{ fontSize: '12px', color: '#666' }}>필터: </label>
                    {['all', 'up', 'down'].map((f) => (
                        <button key={f} onClick={() => setFilter(f)} style={chipStyle(filter === f)}>
                            {f === 'all' ? '전체' : f === 'up' ? '▲ 상승' : '▼ 하락'}
                        </button>
                    ))}
                </div>
                <div>
                    <label style={{ fontSize: '12px', color: '#666' }}>정렬: </label>
                    {[['symbol', '종목명'], ['price', '가격'], ['change', '등락률']].map(([val, label]) => (
                        <button key={val} onClick={() => setSortBy(val)} style={chipStyle(sortBy === val)}>
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                표시 중: {processedStocks.length}개 종목
            </p>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {processedStocks.map((stock) => (
                    <StockRow
                        key={stock.id}
                        stock={stock}
                        isFavorite={favorites.includes(stock.symbol)}
                        onToggleFavorite={toggleFavorite}
                    />
                ))}
            </ul>
        </div>
    )
}
