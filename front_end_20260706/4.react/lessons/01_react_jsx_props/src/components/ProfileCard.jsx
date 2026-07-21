// ── STEP 2: props를 받는 재사용 컴포넌트 ── (빈칸 채우기)
// 개념: props 구조분해 + 조건부 렌더링(&&, 삼항연산자)
// 막히면 정답 참고: lessons_edu/01_react_jsx_props/src/components/ProfileCard.jsx

// TODO: STEP 2 — 아래 함수의 매개변수에서 props를 '구조분해'로 받으세요.
//   (name, job, emoji, bgColor, isOnline, isLead — 채워야 아래 JSX가 동작합니다)
function ProfileCard(props) {
    return (
        <div
            style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '20px',
                margin: '10px',
                display: 'inline-block',
                backgroundColor: bgColor || '#fff',
                minWidth: '160px',
                textAlign: 'center',
                verticalAlign: 'top',
            }}
        >
            {/* TODO: STEP 2 — isLead가 true일 때만 '⭐ 팀 리더'를 표시하세요. (조건부 렌더링: && 사용) */}

            <div style={{ fontSize: '2.5rem' }}>{emoji}</div>
            <h2 style={{ margin: '10px 0 4px', fontSize: '1.1rem' }}>{name}</h2>
            <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>{job}</p>

            {/* TODO: STEP 2 — isOnline이면 '🟢 온라인', 아니면 '⚪ 오프라인'을 표시하세요. (삼항연산자) */}
            <p style={{ margin: '8px 0 0', fontSize: '0.8rem' }}>{/* 여기에 조건부 렌더링 */}</p>
        </div>
    )
}

export default ProfileCard
