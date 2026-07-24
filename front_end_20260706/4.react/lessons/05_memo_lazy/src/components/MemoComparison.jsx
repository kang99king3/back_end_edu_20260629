// ── STEP 1: React.memo 있음/없음 비교 ── (빈칸 채우기)
// 개념: memo는 props가 같으면 렌더 스킵. useCallback으로 함수 참조를 고정해야 memo가 유효.
// 막히면 정답 참고: lessons_edu/05_memo_lazy/src/components/MemoComparison.jsx
import { useState, memo, useCallback } from 'react'

// ❌ memo 없음 — 부모 렌더마다 함께 렌더 (그대로 둡니다)
function RowWithoutMemo({ symbol, price, change, onToggle }) {
    console.log(`[memo없음] ${symbol} 렌더링`)
    const isUp = change >= 0
    return (
        <div style={{ padding: '10px', marginBottom: '4px', border: '1px solid #ffcdd2', borderRadius: '6px' }}>
            <strong>{symbol}</strong> ${price.toFixed(2)}
            <span style={{ color: isUp ? 'blue' : 'red', marginLeft: '8px' }}>{isUp ? '+' : ''}{change}%</span>
            <button onClick={() => onToggle(symbol)} style={{ marginLeft: '8px' }}>★</button>
        </div>
    )
}

// TODO: STEP 1 — 아래 컴포넌트를 React.memo로 감싸세요.
function RowWithMemo({ symbol, price, change, onToggle }) {
    console.log(`[memo있음] ${symbol} 렌더링`)
    const isUp = change >= 0
    return (
        <div style={{ padding: '10px', marginBottom: '4px', border: '1px solid #c8e6c9', borderRadius: '6px' }}>
            <strong>{symbol}</strong> ${price.toFixed(2)}
            <span style={{ color: isUp ? 'blue' : 'red', marginLeft: '8px' }}>{isUp ? '+' : ''}{change}%</span>
            <button onClick={() => onToggle(symbol)} style={{ marginLeft: '8px' }}>★</button>
        </div>
    )
}

const stocks = [
    { symbol: 'AAPL', price: 182.52, change: 1.24 },
    { symbol: 'TSLA', price: 248.5, change: -2.15 },
    { symbol: 'MSFT', price: 378.85, change: 0.87 },
]

export default function MemoComparison() {
    const [tick, setTick] = useState(0)

    // TODO: STEP 1 — onToggle을 useCallback으로 감싸 참조를 고정하세요. (의존성 [])
    //   (고정하지 않으면 RowWithMemo를 memo로 감싸도 무력화됩니다)
    const onToggle = (symbol) => {
        console.log('토글:', symbol)
    }

    return (
        <div style={{ padding: '1.5rem', maxWidth: '500px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1rem' }}>
                <button onClick={() => setTick((t) => t + 1)} style={{ padding: '8px 16px' }}>부모 리렌더 유발 (tick: {tick})</button>
                <span style={{ fontSize: '12px', color: '#888' }}>콘솔을 열고 눌러보세요</span>
            </div>

            <h4 style={{ color: '#c62828' }}>❌ React.memo 없음</h4>
            {stocks.map((s) => (
                <RowWithoutMemo key={s.symbol} {...s} onToggle={onToggle} />
            ))}

            <h4 style={{ color: '#2e7d32', marginTop: '1rem' }}>✅ React.memo + useCallback (빈칸 채우면 렌더 스킵)</h4>
            {stocks.map((s) => (
                <RowWithMemo key={s.symbol} {...s} onToggle={onToggle} />
            ))}
        </div>
    )
}
