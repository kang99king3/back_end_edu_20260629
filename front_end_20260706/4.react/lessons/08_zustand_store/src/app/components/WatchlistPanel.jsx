// ── STEP 3: 관심종목 목록 (스토어를 조각별로 구독) ── (빈칸 채우기)
// 개념: useStockStore(s => s.일부)로 필요한 조각만 구독 → 그 값 바뀔 때만 리렌더.
// 막히면 정답 참고: lessons_edu/08_zustand_store/app/components/WatchlistPanel.jsx
'use client'
import useStockStore from '@/app/store/useStockStore'

export default function WatchlistPanel() {
    // TODO: STEP 3 — 필요한 상태/액션을 '조각별로' 구독하세요.
    //   필요한 것: watchlist, selectedSymbol, prices, selectSymbol, removeFromWatchlist
    const watchlist = useStockStore((s) => s.watchlist)
    const selectedSymbol = useStockStore((s) => s.selectedSymbol)
    const prices = useStockStore((s) => s.prices)
    const selectSymbol = useStockStore((s) => s.selectSymbol)
    const removeFromWatchlist = useStockStore((s) => s.removeFromWatchlist)

    return (
        <div style={{ padding: '1rem' }}>
            <h2>관심종목</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {watchlist.map((symbol) => (
                    <li
                        key={symbol}
                        onClick={() => selectSymbol(symbol)}
                        style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '12px', marginBottom: '8px', borderRadius: '8px',
                            border: `1px solid ${selectedSymbol === symbol ? '#61dafb' : '#0f3460'}`,
                            cursor: 'pointer', backgroundColor: selectedSymbol === symbol ? '#123a2a' : '#0d2137',
                        }}
                    >
                        <div>
                            <strong style={{ color: '#ccd6f6' }}>{symbol}</strong>
                            <div style={{ fontSize: '12px', color: '#8892b0' }}>
                                {prices[symbol] ? `$${prices[symbol].toFixed(2)}` : '가격 없음'}
                            </div>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation() // li의 선택(onClick)으로 전파 방지
                                removeFromWatchlist(symbol)
                            }}
                            style={{ background: 'none', border: 'none', color: '#e94560', cursor: 'pointer', fontSize: '16px' }}
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
