# 02 · 확장과제 정답 & 해설
## 과제 1 — 우선순위 필드 추가
할 일 객체에 `priority`를 추가하고, 추가 시 지정 + 색으로 구분합니다.
```jsx
// 상태: 입력용 우선순위
const [priority, setPriority] = useState('normal') // 'high' | 'normal' | 'low'

// 추가 시 priority 포함
const addTodo = () => {
  if (!input.trim()) return
  setTodos([...todos, { id: Date.now(), text: input, done: false, priority }])
  setInput('')
}

// 색 매핑
const priorityColor = { high: '#e11d48', normal: '#64748b', low: '#16a34a' }

// 입력 영역에 select 추가
<select value={priority} onChange={(e) => setPriority(e.target.value)}>
  <option value="high">높음</option>
  <option value="normal">보통</option>
  <option value="low">낮음</option>
</select>

// 목록 li 안에 색 점 표시
<span style={{ width: 8, height: 8, borderRadius: '50%', background: priorityColor[todo.priority || 'normal'] }} />
```
**해설**: 상태의 "모양(객체 구조)"을 확장하는 연습입니다. 기존 항목은 `priority`가 없으니 `todo.priority || 'normal'`로 기본값 처리하는 게 안전합니다.

## 과제 2 — "완료 전체 삭제" 버튼
완료된 항목만 걸러내고, 완료가 아닌 것만 남깁니다.
```jsx
const clearCompleted = () => setTodos(todos.filter((t) => !t.done))

// 버튼: some()은 조건에 맞는 내용이 하나라도 있으면 순회를 종료하고 true를 반환한다.
{todos.some((t) => t.done) && (
  <button onClick={clearCompleted}>완료 전체 삭제</button>
)}
```
**해설**: 삭제도 "새 배열로 교체"(불변성)입니다. `filter`로 **남길 것만** 추린 새 배열을 만들면, 완료 항목이 한 번에 제거됩니다. `some`으로 완료 항목이 있을 때만 버튼을 보여줍니다.

## 과제 3 — 입력이 비면 추가 버튼 비활성화
`input` 상태로 버튼의 `disabled`를 제어합니다.
```jsx
<button onClick={addTodo} disabled={!input.trim()}>
  추가
</button>
```
**해설**: 제어 컴포넌트라 `input` 값이 곧 상태입니다. `!input.trim()`이 참(빈 값)일 때 버튼을 비활성화해, 빈 할 일 추가를 UI 단에서도 막습니다.