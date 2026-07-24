// ── STEP 2a: lazy로 '나중에' 불러올 무거운 컴포넌트 (예시 1) ──
// 이런 컴포넌트를 lazy()로 감싸면, 이 탭을 처음 열 때만 코드가 다운로드된다(코드 분할).
export default function HeavyChart() {
    return (
        <div style={{ padding: '1.5rem', border: '1px solid #dbeafe', borderRadius: '8px', background: '#eff6ff' }}>
            <h3 style={{ marginTop: 0 }}>📈 차트 패널 (무겁다고 가정)</h3>
            <p style={{ color: '#555', fontSize: '14px' }}>
                이 컴포넌트는 lazy로 분할되어, 이 탭을 처음 눌렀을 때만 로드됩니다. (첫 로드 시 Suspense fallback이 잠깐 보임)
            </p>
        </div>
    )
}
