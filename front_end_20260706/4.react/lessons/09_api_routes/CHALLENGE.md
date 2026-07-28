# 09 · 확장과제 정답 & 해설

## 과제 1 — 검색 결과 없음 표시
`StockSearch.jsx`에서 query가 있는데 결과가 비었을 때 안내 문구를 띄웁니다.
```jsx
{query.trim() && results.length === 0 && (
  <p style={{ padding: '0 1rem', color: '#8892b0', fontSize: 13 }}>검색 결과가 없습니다</p>
)}
```
**해설**: "검색어는 있는데(`query.trim()`) 결과가 0개(`results.length === 0`)"라는 **두 조건이 모두 참일 때만** 표시합니다. query가 비었을 때(처음 상태)는 문구를 숨겨야 자연스럽습니다.

## 과제 2 — 더미/실제 데이터 구분 표시
시세 API는 `source: 'dummy' | 'finnhub'`를 함께 반환합니다. 이를 화면에 배지로:
```jsx
// 시세를 받아 쓰는 곳에서
const res = await fetch(`/api/stock/${symbol}`)
const data = await res.json()
// data.source === 'dummy' ? '더미' : '실시간'
<span style={{ fontSize: 11, color: data.source === 'dummy' ? '#e94560' : '#64ffda' }}>
  {data.source === 'dummy' ? '더미 데이터' : '실시간'}
</span>
```
**해설**: 응답에 `source` 메타 필드를 넣어두면, 프론트에서 **지금 데이터가 진짜인지 개발용 더미인지**를 사용자/개발자에게 명확히 보여줄 수 있습니다. (`.env.local`에 `FINNHUB_API_KEY`가 있으면 `finnhub`, 없으면 `dummy`)
