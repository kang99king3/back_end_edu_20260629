// ── STEP 2: 마운트 시 시세 조회 + 1주 매수 ── (빈칸 채우기)
// 개념: useEffect로 fetchAllPrices 1회, buyStock으로 매수.
// 막히면 정답 참고: lessons_edu/10_zustand_async_persist/app/components/WatchlistPanel.jsx
'use client'
import { useEffect } from 'react'
import useStockStore from '@/app/store/useStockStore'

export default function WatchlistPanel() {
  const watchlist = useStockStore((s) => s.watchlist)
  const selectedSymbol = useStockStore((s) => s.selectedSymbol)
  const prices = useStockStore((s) => s.prices)
  const selectSymbol = useStockStore((s) => s.selectSymbol)
  const removeFromWatchlist = useStockStore((s) => s.removeFromWatchlist)
  const fetchAllPrices = useStockStore((s) => s.fetchAllPrices)
  const buyStock = useStockStore((s) => s.buyStock)

  // TODO: STEP 2 — 최초 마운트 시 관심종목 전체 시세를 조회하세요. (useEffect + fetchAllPrices)
  //  -> 가격정보는 localStorage에 저장하지 않기때문에 일괄적으로 가격을 구한다.
  useEffect(() => {
    fetchAllPrices()
  }, [fetchAllPrices])

  return (
    <div style={{ padding: '1rem' }}>
      <h2>관심종목</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {watchlist.map((symbol) => {
          const price = prices[symbol]
          return (
            <li
              key={symbol}
              onClick={() => selectSymbol(symbol)}
              style={{
                padding: '12px', marginBottom: '8px', borderRadius: '8px',
                border: `1px solid ${selectedSymbol === symbol ? '#61dafb' : '#0f3460'}`,
                cursor: 'pointer', backgroundColor: selectedSymbol === symbol ? '#123a2a' : '#0d2137',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: '#ccd6f6' }}>{symbol}</strong>
                  <div style={{ fontSize: '12px', color: '#8892b0' }}>{price ? `$${price.toFixed(2)}` : '로딩 중...'}</div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeFromWatchlist(symbol) }}
                  style={{ background: 'none', border: 'none', color: '#e94560', cursor: 'pointer', fontSize: '16px' }}
                >
                  ✕
                </button>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  // TODO: STEP 2 — 현재가(price)가 있으면 1주 매수하세요. (buyStock)
                }}
                disabled={!price}
                style={{ marginTop: '8px', width: '100%', padding: '5px', fontSize: '12px', borderRadius: '6px', background: '#61dafb22', color: '#61dafb', border: '1px solid #61dafb55', cursor: price ? 'pointer' : 'not-allowed' }}
              >
                ＋1주 매수
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
