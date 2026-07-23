# 03 · 확장과제 정답 & 해설

## 과제 1 — useCallback을 제거하면?
`StockList.jsx`에서 `toggleFavorite`를 `useCallback` 없이 일반 함수로 두면:
```jsx
const toggleFavorite = (symbol) => { setFavorites(/* ... */) } // useCallback 제거
```
**관찰 결과**: 즐겨찾기 별을 하나 누르면 콘솔에 **모든 종목의 `렌더링` 로그**가 찍힙니다.

**해설**: 부모(StockList)가 리렌더될 때마다 `toggleFavorite`가 **새 함수(새 참조)**로 만들어집니다. `StockRow`는 `memo`로 감싸져 있지만, props로 받는 `onToggleFavorite`의 참조가 매번 달라지니 "props가 바뀌었다"고 판단해 **memo가 무력화**됩니다. → `useCallback(fn, [])`로 참조를 고정해야 memo가 실제로 렌더를 스킵합니다.

## 과제 2 — renderCount를 useState로 바꾸면?
```jsx
const [renderCount, setRenderCount] = useState(0)
setRenderCount(renderCount + 1) // 렌더 중 호출 → 무한 루프!
```
**관찰 결과**: 렌더 도중 `setState`를 호출 → 리렌더 → 또 `setState` → **무한 리렌더**(에러/멈춤).

**해설**: `useState`는 값이 바뀌면 리렌더를 유발합니다. "렌더 횟수 세기"처럼 **렌더마다 값을 올리되 리렌더는 유발하면 안 되는** 경우엔 `useRef`가 맞습니다. `ref.current += 1`은 리렌더를 일으키지 않으므로 안전하게 횟수만 셉니다. → **"화면에 반영돼야 하는 값 = state, 렌더와 무관하게 유지만 하는 값 = ref"** 가 판단 기준입니다.
