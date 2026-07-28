# 08 · 확장과제 정답 & 해설

## 과제 1 — 중복 추가 시 안내 메시지
`addToWatchlist`는 이미 있는 종목이면 `if (watchlist.includes(symbol)) return`으로 **조용히 무시**합니다. 그래서 화면엔 아무 변화가 없죠. 폼에서 성공/중복을 구분해 안내하려면:
```jsx
// AddStockForm.jsx
'use client'
import { useState } from 'react'
import useStockStore from '@/app/store/useStockStore'

export default function AddStockForm() {
  const [input, setInput] = useState('')
  const [msg, setMsg] = useState('')
  const watchlist = useStockStore((s) => s.watchlist)
  const addToWatchlist = useStockStore((s) => s.addToWatchlist)

  const handleAdd = () => {
    const symbol = input.trim().toUpperCase()
    if (!symbol) return
    if (watchlist.includes(symbol)) { setMsg(`이미 있는 종목입니다: ${symbol}`); return }
    addToWatchlist(symbol)
    setMsg('')
    setInput('')
  }
  // ...input... {msg && <p style={{ color: '#e94560', fontSize: 12 }}>{msg}</p>}
}
```
**해설**: 스토어의 중복 방지 로직(`includes` 체크)은 그대로 두고, **UI 피드백은 컴포넌트에서** 처리합니다. 현재 watchlist를 구독해 미리 검사한 뒤 메시지를 띄웁니다.

## 과제 2 — 관심종목 개수 표시
셀렉터에서 length만 구독하면 됩니다.
```jsx
// WatchlistPanel.jsx
const count = useStockStore((s) => s.watchlist.length)
// ...
<h2>관심종목 ({count})</h2>
```
**해설**: `useStockStore((s) => s.watchlist.length)`처럼 **원하는 값만 파생해 구독**할 수 있습니다. 이러면 length가 바뀔 때만 이 부분이 리렌더됩니다. (Zustand의 셀렉터 구독 장점)
