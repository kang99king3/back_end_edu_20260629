# 05 · 확장과제 정답 & 해설

> 학생용 문제는 `lessons_edu_starter/05_memo_lazy/README.md` 에 있습니다.

## 과제 1 — onToggle에서 useCallback을 제거하면?
`MemoComparison.jsx`에서 `onToggle`을 일반 함수로 두면:
```jsx
const onToggle = (symbol) => { console.log('토글:', symbol) } // useCallback 제거
```
**관찰 결과**: '부모 리렌더 유발' 버튼을 누르면 `[memo있음]` 로그도 **매번 함께 찍힙니다** (memo가 무력화됨).

**해설**: `RowWithMemo`를 `memo`로 감쌌어도, 부모가 리렌더될 때마다 `onToggle`이 **새 함수(새 참조)**로 만들어져 props로 내려갑니다. memo는 props를 얕게 비교하는데 `onToggle` 참조가 매번 달라지니 "props가 바뀌었다"고 보고 다시 렌더합니다. → **memo와 useCallback은 한 세트**입니다. 함수 props를 넘길 땐 useCallback으로 참조를 고정해야 memo가 실제 효과를 냅니다.

## 과제 2 — 느린 네트워크에서 lazy 청크 관찰
브라우저 DevTools → Network 탭 → Throttling을 'Slow 3G'로 설정 후, 차트/리포트 탭을 처음 클릭.

**관찰 결과**: 탭을 처음 누르는 **그 순간** `HeavyChart-xxxx.js` 같은 **별도 청크 파일**이 네트워크에 새로 요청됩니다. 그동안 Suspense fallback(⏳)이 보이고, 다운로드가 끝나면 컴포넌트가 나타납니다. 한 번 로드된 뒤 다시 누르면 재요청하지 않습니다(캐시).

**해설**: `lazy(() => import('./X'))`는 X를 **초기 번들에서 분리**해 별도 청크로 만듭니다. 그 컴포넌트가 **실제로 필요한 시점**에만 네트워크로 받아오므로 초기 로딩이 가벼워집니다. `npm run build` 결과의 `dist/assets/`에서도 `HeavyChart`, `HeavyReport`가 별도 `.js`로 분리된 것을 확인할 수 있습니다.
