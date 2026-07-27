# 06 · 확장과제 정답 & 해설

> 학생용 문제는 `lessons_edu_starter/06_context_api/README.md` 에 있습니다.

## 과제 1 — 세 번째 Context 추가 (정렬 기준)
`SortContext.jsx`를 새로 만들고 App에서 Provider를 중첩합니다.
```jsx
// src/context/SortContext.jsx
import { createContext, useState, useContext } from 'react'
const SortContext = createContext(null)

export function SortProvider({ children }) {
  const [sortBy, setSortBy] = useState('symbol') // 'symbol' | 'price'
  return <SortContext.Provider value={{ sortBy, setSortBy }}>{children}</SortContext.Provider>
}
export function useSort() {
  const ctx = useContext(SortContext)
  if (!ctx) throw new Error('useSort는 SortProvider 안에서 사용하세요')
  return ctx
}
```
```jsx
// App.jsx — Provider 중첩에 추가
<ThemeProvider>
  <WatchlistProvider>
    <SortProvider>
      <Header />
      <main><StockGrid /></main>
    </SortProvider>
  </WatchlistProvider>
</ThemeProvider>
```
**해설**: Context가 늘면 Provider를 계속 중첩합니다. (중첩이 깊어지면 하나의 `AppProviders` 컴포넌트로 묶어 정리하기도 합니다.) `StockGrid`에서 `useSort()`로 정렬 기준을 읽어 `STOCKS`를 정렬하면 됩니다.

## 과제 2 — Provider 밖에서 훅을 호출하면?
`useWatchlist`를 `WatchlistProvider` 바깥에서 호출하면 던진 에러가 발생합니다:
```
Error: useWatchlist은 WatchlistProvider 안에서 사용하세요
```
**해설**: Provider가 없으면 `useContext(WatchlistContext)`가 **기본값 `null`**을 반환합니다. 그대로 두면 `ctx.addSymbol`에서 "null의 속성 읽기" 같은 **모호한 런타임 에러**가 뒤늦게 터집니다. 그래서 커스텀 훅에서 `if (!ctx) throw ...`로 **일찍, 명확한 메시지로** 실패하게 설계합니다. 이렇게 하면 "Provider로 감싸는 걸 깜빡했다"는 실수를 즉시 알 수 있습니다.
