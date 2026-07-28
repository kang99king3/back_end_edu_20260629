// 08강과 동일 (관심종목 목록)
'use client'
import useStockStore from '@/app/store/useStockStore'

export default function WatchlistPanel() {
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
              cursor: 'pointer',
              backgroundColor: selectedSymbol === symbol ? '#123a2a' : '#0d2137',
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
                e.stopPropagation()
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
