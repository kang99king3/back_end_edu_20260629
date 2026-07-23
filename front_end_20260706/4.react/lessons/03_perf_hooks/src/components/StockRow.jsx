// ── STEP 3: React.memo 로 감싼 자식 컴포넌트 ── (빈칸 채우기)
// 개념: props가 같으면 렌더를 스킵. (부모의 useCallback과 함께 동작)
// 막히면 정답 참고: lessons_edu/03_perf_hooks/src/components/StockRow.jsx
import { memo } from 'react'

// TODO: STEP 3 — 아래 함수 컴포넌트를 React.memo로 감싸서 export 하세요.
//   (지금은 memo가 없어 부모가 렌더될 때마다 모든 행이 다시 렌더됩니다)
function StockRow({ stock, isFavorite, onToggleFavorite }) {
    console.log(`${stock.symbol} 렌더링`) // 관전 포인트: 별 클릭 시 그 종목만 찍혀야 정상

    const isUp = stock.change >= 0

    return (
        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', marginBottom: '6px', borderRadius: '8px', border: '1px solid #eee' }}>
            <button onClick={() => onToggleFavorite(stock.symbol)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>
                {isFavorite ? '★' : '☆'}
            </button>
            <strong style={{ width: '60px' }}>{stock.symbol}</strong>
            <span style={{ flex: 1, color: '#666', fontSize: '13px' }}>{stock.name}</span>
            <span style={{ fontWeight: 'bold' }}>${stock.price.toFixed(2)}</span>
            <span style={{ width: '70px', textAlign: 'right', color: isUp ? 'blue' : 'red', fontWeight: 'bold' }}>
                {isUp ? '+' : ''}{stock.change}%
            </span>
        </li>
    )
}

export default StockRow
