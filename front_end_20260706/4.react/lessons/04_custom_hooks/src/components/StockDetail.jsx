// ── STEP 5: 네 개의 커스텀 훅을 '조합'한 컴포넌트 ── (빈칸 채우기)
// 개념: 여러 훅을 레고처럼 끼워 하나의 기능 완성.
// 막히면 정답 참고: lessons_edu/04_custom_hooks/src/components/StockDetail.jsx
import { useState } from 'react'
import { useStockData } from '../hooks/useStockData'
import { useDebounce } from '../hooks/useDebounce'
import { useInterval } from '../hooks/useInterval'
import { useLocalStorage } from '../hooks/useLocalStorage'

// -useLocalStorage : 마지막에 조회한 종목을 저장하고 가져오는 기능
// -useDebounce : 타이핑이 멎은 뒤에만 API를 호출하는 기능
// -useStockData : 데이터, 로딩/에러/refetch(load())관리하는 기능
// -useInterval : 5초마다 자동 갱신하는 기능 
export default function StockDetail() {
    // TODO: STEP 5 — inputSymbol을 useLocalStorage로 관리하세요. (키 'lastSymbol', 기본 'AAPL')
    // const [inputSymbol, setInputSymbol] = useState('AAPL') // ← useLocalStorage로 교체
    const [inputSymbol, setInputSymbol] = useLocalStorage('lastSymbol', 'AAPL')
    const [autoRefresh, setAutoRefresh] = useState(false)

    // TODO: STEP 5 — 입력(inputSymbol)을 300ms 디바운스한 값을 만드세요. (useDebounce)
    // const debouncedSymbol = inputSymbol // ← useDebounce로 교체
    const debouncedSymbol = useDebounce(inputSymbol, 300)

    // TODO: STEP 5 — 디바운스된 종목으로 데이터를 조회하세요. (useStockData → data/loading/error/refetch)
    // const data = null, loading = false, error = null, refetch = () => { } // ← useStockData로 교체
    const { data, loading, error, refetch } = useStockData(debouncedSymbol)

    // TODO: STEP 5 — autoRefresh가 켜지면 5초마다 refetch, 꺼지면 정지(null)로 useInterval을 호출하세요.
    // useInterver(callback, delay)
    useInterval(refetch, autoRefresh ? 5000 : null)
    return (
        <div style={{ padding: '1.5rem', maxWidth: '480px' }}>
            <h2>종목 상세 조회</h2>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                <input
                    value={inputSymbol}
                    onChange={(e) => setInputSymbol(e.target.value.toUpperCase())}
                    placeholder="종목 코드 (ERROR 입력 시 에러)"
                    style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}
                />
                <button onClick={refetch} disabled={loading}>{loading ? '로딩 중...' : '새로고침'}</button>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)} />
                <span style={{ fontSize: '13px' }}>5초마다 자동 갱신</span>
                {autoRefresh && <span style={{ fontSize: '12px', color: '#16a34a' }}>● 활성</span>}
            </label>

            {loading && <div style={{ padding: '2rem', textAlign: 'center', border: '1px solid #eee', borderRadius: '8px', color: '#888' }}>⏳ {debouncedSymbol} 로딩 중...</div>}

            {error && (
                <div style={{ padding: '1rem', borderRadius: '8px', background: '#fff0f0', border: '1px solid #ffcdd2', color: '#c62828' }}>
                    <strong>❌ 오류</strong>
                    <p style={{ margin: '4px 0 0', fontSize: '13px' }}>{error}</p>
                    <button onClick={refetch} style={{ marginTop: '8px', fontSize: '12px' }}>다시 시도</button>
                </div>
            )}

            {data && !loading && (
                <div style={{ padding: '1.25rem', borderRadius: '8px', border: '1px solid #e0e0e0', background: '#fafafa' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '20px' }}>{data.symbol}</h3>
                            <p style={{ margin: '4px 0', fontSize: '12px', color: '#888' }}>업데이트: {data.updatedAt}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>${data.price.toFixed(2)}</div>
                            <div style={{ color: data.change >= 0 ? 'blue' : 'red', fontWeight: 'bold' }}>{data.change >= 0 ? '+' : ''}{data.change}%</div>
                        </div>
                    </div>
                    <div style={{ marginTop: '12px', fontSize: '13px', color: '#666' }}>거래량: {data.volume.toLocaleString()}</div>
                </div>
            )}
        </div>
    )
}
