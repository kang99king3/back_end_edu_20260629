// ── STEP 1: 데이터 패칭 커스텀 훅 ── (빈칸 채우기)
// 개념: 종목코드를 넣으면 { data, loading, error, refetch }를 돌려주는 훅.
// 막히면 정답 참고: lessons_edu/04_custom_hooks/src/hooks/useStockData.js
import { useState, useEffect } from 'react'

// (헬퍼는 제공됩니다) 더미 API — Promise로 비동기 결과를 돌려준다.
function fakeFetch(symbol) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (symbol === 'ERROR') {
                reject(new Error('종목을 찾을 수 없습니다.'))
                return
            }
            const base = { AAPL: 182.52, TSLA: 248.5, MSFT: 378.85 }
            resolve({
                symbol,
                price: base[symbol] || Math.random() * 200 + 100,
                change: (Math.random() * 6 - 3).toFixed(2) * 1,
                volume: Math.floor(Math.random() * 10_000_000),
                updatedAt: new Date().toLocaleTimeString(),
            })
        }, 800 + Math.random() * 400)
    })
}

export function useStockData(symbol) {
    // TODO: STEP 1 — data/loading/error를 한 객체로 관리하는 상태를 만드세요. (초기 loading: true)
    const [state, setState] = useState({ data: null, loading: true, error: null })

    // TODO: STEP 1 — 실제 로딩 함수(load)를 작성하세요.
    //   로딩 시작 표시 → fakeFetch(symbol) → 성공 시 data 세팅 / 실패 시 error 세팅.
    const load = () => { }

    // TODO: STEP 1 — symbol이 바뀔 때마다 load()를 호출하는 useEffect를 작성하세요. (의존성 [symbol])

    // 상태 + 수동 새로고침 함수 반환
    return { ...state, refetch: load }
}
