// ── STEP 2: 관심종목 추가 폼 ── (빈칸 채우기)
// 개념: 스토어에서 액션만 구독해 호출. 'use client' 필요(상태/이벤트).
// 막히면 정답 참고: lessons_edu/08_zustand_store/app/components/AddStockForm.jsx
'use client'
import { useState } from 'react'
import useStockStore from '@/app/store/useStockStore'

export default function AddStockForm() {
    const [input, setInput] = useState('')

    // TODO: STEP 2 — 스토어에서 addToWatchlist 액션을 구독하세요. (셀렉터 사용)
    // store로부터 원하는 상태만 가져온다면 업데이트 함수로 얻어온다.
    const addToWatchlist = useStockStore((s) => s.addToWatchlist)

    const handleAdd = () => {
        if (!input.trim()) return
        // TODO: STEP 2 — 대문자로 변환해 관심종목에 추가하고 입력을 비우세요.
        addToWatchlist(input.toUpperCase()) // 종목코드 대문자 통일
        setInput('')
    }

    return (
        <div style={{ display: 'flex', gap: '8px', padding: '1rem' }}>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                placeholder="종목 코드 입력 (예: NVDA)"
                style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #0f3460', background: '#0d2137', color: '#ccd6f6' }}
            />
            <button onClick={handleAdd} style={{ padding: '8px 16px', borderRadius: '6px', background: '#61dafb', color: '#0a192f', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                추가
            </button>
        </div>
    )
}
