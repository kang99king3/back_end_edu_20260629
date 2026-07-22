// ── STEP 2·3: 배열 상태·불변성 업데이트 + useEffect·localStorage ── (빈칸 채우기)
// 개념: 배열 불변성 업데이트(스프레드/filter/map), useEffect 의존성, localStorage
// 막히면 정답 참고: lessons_edu/02_state_events_todo/src/components/TodoApp.jsx
import { useState, useEffect } from 'react'

function TodoApp() {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')
    const [filter, setFilter] = useState('all')

    // TODO: STEP 3-1 — 최초 마운트 시 localStorage('todos')에서 복원하세요. (useEffect, 의존성 [])

    // TODO: STEP 3-2 — todos가 바뀔 때마다 localStorage에 저장하세요. (useEffect, 의존성 [todos])

    // TODO: STEP 2 — 추가: 기존 배열을 복사(스프레드)하고 새 항목을 붙인 '새 배열'로 교체하세요.
    //   (새 항목: { id, text, done: false }) 그리고 입력창 비우기
    const addTodo = () => {
        if (!input.trim()) return
        // 여기에 추가 로직
    }

    // TODO: STEP 2 — 삭제: id가 다른 항목만 남긴 새 배열로 교체 (filter)
    const removeTodo = (id) => {
        // 삭제 로직
    }

    // TODO: STEP 2 — 완료 토글: 해당 id만 done을 뒤집은 새 객체로 교체 (map + 스프레드)
    const toggleTodo = (id) => {
        // 토글 로직
    }

    // (파생값은 제공됩니다) 화면에 보여줄 목록
    const filtered = todos.filter((t) => {
        if (filter === 'active') return !t.done
        if (filter === 'done') return t.done
        return true
    })

    const chipStyle = (active) => ({
        padding: '6px 14px', borderRadius: '20px', border: '1px solid #ddd', cursor: 'pointer',
        backgroundColor: active ? '#1a1a18' : '#fff', color: active ? '#fff' : '#333',
        fontSize: '13px', marginRight: '6px',
    })

    return (
        <div style={{ maxWidth: '480px', margin: '2rem auto', padding: '1.5rem' }}>
            <h1 style={{ marginBottom: '1rem' }}>📝 할 일 목록</h1>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="할 일을 입력하세요..."
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px' }}
                />
                <button onClick={addTodo} style={{ padding: '10px 18px', borderRadius: '8px', background: '#1a1a18', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    추가
                </button>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <button style={chipStyle(filter === 'all')} onClick={() => setFilter('all')}>전체</button>
                <button style={chipStyle(filter === 'active')} onClick={() => setFilter('active')}>진행중</button>
                <button style={chipStyle(filter === 'done')} onClick={() => setFilter('done')}>완료</button>
            </div>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {filtered.map((todo) => (
                    <li key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', marginBottom: '8px', borderRadius: '8px', border: '1px solid #eee', backgroundColor: todo.done ? '#f9f9f9' : '#fff' }}>
                        <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                        <span style={{ flex: 1, textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? '#aaa' : '#333' }}>
                            {todo.text}
                        </span>
                        <button onClick={() => removeTodo(todo.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', fontSize: '18px' }}>✕</button>
                    </li>
                ))}
            </ul>

            {todos.length > 0 && (
                <p style={{ color: '#aaa', fontSize: '13px', textAlign: 'right' }}>
                    전체 {todos.length}개 | 완료 {todos.filter((t) => t.done).length}개
                </p>
            )}
        </div>
    )
}

export default TodoApp
