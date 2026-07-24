# 04 · 확장과제 정답 & 해설

> 학생용 문제는 `lessons_edu_starter/04_custom_hooks/README.md` 에 있습니다.

## 과제 1 — autoRefresh도 useLocalStorage로 기억
`StockDetail.jsx`에서 `autoRefresh`를 `useState` 대신 `useLocalStorage`로 바꿉니다.
```jsx
// 변경 전
const [autoRefresh, setAutoRefresh] = useState(false)
// 변경 후
const [autoRefresh, setAutoRefresh] = useLocalStorage('autoRefresh', false)
```
**해설**: `useLocalStorage`는 `useState`와 **인터페이스가 같아서**(`[값, setter]`) 한 줄만 바꾸면 됩니다. 이제 자동 갱신 on/off도 새로고침 후 유지됩니다. 이것이 "인터페이스를 useState와 똑같이 맞춘" 커스텀 훅의 장점입니다.

## 과제 2 — load를 useCallback으로 감싸 의존성 경고 제거
`useStockData.js`에서 `load`를 `useCallback`으로 고정하고 useEffect 의존성에 넣습니다.
```jsx
import { useState, useEffect, useCallback } from 'react'

export function useStockData(symbol) {
  const [state, setState] = useState({ data: null, loading: true, error: null })

  // symbol이 바뀔 때만 새로 만들어지는 안정적인 load
  const load = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    fakeFetch(symbol)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) => setState({ data: null, loading: false, error: err.message }))
  }, [symbol])

  useEffect(() => {
    load()
  }, [load]) // 이제 load를 의존성에 넣어도 안전 (symbol이 바뀔 때만 재실행)

  return { ...state, refetch: load }
}
```
**해설**: `load`가 매 렌더 새로 만들어지면 `useEffect([load])`가 매번 실행됩니다. `useCallback(fn, [symbol])`로 **symbol이 바뀔 때만** load가 재생성되게 하면, 의존성 배열에 `load`를 정직하게 넣어도 무한 실행 없이 lint 경고(react-hooks/exhaustive-deps)까지 사라집니다.
