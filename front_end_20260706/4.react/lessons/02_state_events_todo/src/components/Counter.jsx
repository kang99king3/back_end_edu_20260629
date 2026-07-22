// ── STEP 1: useState 로 '상태' 다루기 ── (빈칸 채우기)
// 개념: useState, 이벤트 핸들러
// 막히면 정답 참고: lessons_edu/02_state_events_todo/src/components/Counter.jsx
import { useState } from 'react'

function Counter() {
    // TODO: STEP 1 — count 상태와 setCount 함수를 useState로 만드세요. (초기값 0)
    // const count = 0 // ← useState로 교체하세요
    // count : 현재 값, setCount함수: count값을 바꾸는 함수
    const [count, setCount] = useState(0)
    // const [test,setTest] = useState([])
    // const [func, setFunc] = useState(() => { code }) // 함수정의: 마운트시 최초 1회실행

    // 값에 따라서 글자 색을 변경하게 하는 기능(양수/음수/0)
    const getColor = () => {
        if (count > 0) return '#185fa5'
        if (count < 0) return '#a32d2d'
        return '#1a1a18'
    }

    //스타일 적용을 위해 따로 js객체로 만들어서 사용해보려고
    const btnStyle = {
        padding: '10px 24px', fontSize: '1.2rem',
        margin: '0 8px', cursor: 'pointer',
        borderRadius: '8px', border: '1px solid #ddd',
        background: '#fff',
    }
    // * 구분 잘하기
    // json데이터 ---> {"padding":"10px 24px"}
    // js객체 변환 --> {padding:"10px 24px"}

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1 style={{ fontSize: '4rem', color: getColor(), margin: '0 0 1rem', transition: 'color .2s' }}>
                {count}
            </h1>
            <div>
                {/* TODO: STEP 1 — 각 버튼의 onClick을 채우세요. (감소 / 0으로 초기화 / 증가 — setCount 사용) */}
                {/* 이벤트에 의한 함수 실행은 반드시 함수로 한번 더 정의해서 넘겨야 한다. */}
                <button style={btnStyle} onClick={() => setCount(count - 1)}>−</button>
                <button style={btnStyle} onClick={() => setCount(0)}>초기화</button>
                <button style={btnStyle} onClick={() => setCount(count + 1)}>+</button>
            </div>
            <p style={{ marginTop: '1.2rem', color: '#888' }}>
                {count > 0 ? '양수입니다 😊' : count < 0 ? '음수입니다 😅' : '0입니다 😐'}
            </p>
        </div>
    )
}

export default Counter
