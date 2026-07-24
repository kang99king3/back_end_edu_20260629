// ── STEP 1: 데이터 패칭 커스텀 훅 ── (빈칸 채우기)
// 개념: 종목코드를 넣으면 { data, loading, error, refetch }를 돌려주는 훅.
// 막히면 정답 참고: lessons_edu/04_custom_hooks/src/hooks/useStockData.js
import { useState, useEffect } from 'react'

// (헬퍼는 제공됩니다) 더미 API — Promise로 비동기 결과를 돌려준다.
// 실제 API 요청할때 사용:fetch(요청URL).then((res)=> res.json()).then((data)=>data.symbol)
function fakeFetch(symbol) {
    return new Promise((resolve, reject) => {
        // settimeout(func,ms)
        setTimeout(() => {
            if (symbol === 'ERROR') {
                reject(new Error('종목을 찾을 수 없습니다.'))
                return
            }
            const base = { AAPL: 182.52, TSLA: 248.5, MSFT: 378.85 }
            // JS객체로 데이터를 반환(형식- {key:value,...})
            resolve({
                symbol, // symbol이 key로 사용, 값으로 적용할 변수명이 key와 같다면
                // symbol : symbol,
                price: base[symbol] || Math.random() * 200 + 100,
                change: (Math.random() * 6 - 3).toFixed(2) * 1,
                volume: Math.floor(Math.random() * 10_000_000), //10_000_000 숫자구분기호 ES12
                updatedAt: new Date().toLocaleTimeString(),
            })
        }, 800 + Math.random() * 400) // 400+800 = 1200 -> 0.8~1.2초 지연시간
    })
}

export function useStockData(symbol) {
    // TODO: STEP 1 — data/loading/error를 한 객체로 관리하는 상태를 만드세요. (초기 loading: true)
    const [state, setState] = useState({ data: null, loading: true, error: null })

    // TODO: STEP 1 — 실제 로딩 함수(load)를 작성하세요.
    //   로딩 시작 표시 → fakeFetch(symbol) → 성공 시 data 세팅 / 실패 시 error 세팅.
    const load = () => {
        // 새로고침 될때 loading화면을 보여주기 위해 loading:ture 설정
        setState((prev) => ({ ...prev, loading: ture, error: null }))
        // 로딩중... --> 0.8~1.2초 후에 조회된 데이터가 보여진다.
        fakeFetch(symbol).then((data) => setState({ data, loading: false, error: null }))
            .catch((err) => setState({ data: null, loading: false, error: err.message }))
    }

    // TODO: STEP 1 — symbol이 바뀔 때마다 load()를 호출하는 useEffect를 작성하세요. (의존성 [symbol])
    useEffect(() => {
        if (!symbol) {
            setState({ data: null, loading: false, error: null })
            return
        }
        load()
    }, [symbol])
    // 상태 + 수동 새로고침 함수 반환
    // {data: null, loading: false, error: null,refetch:load}
    return { ...state, refetch: load }
}
