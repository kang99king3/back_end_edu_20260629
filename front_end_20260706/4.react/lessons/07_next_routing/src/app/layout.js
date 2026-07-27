// ── STEP 1: 루트 레이아웃 (공통 뼈대) ── (빈칸 채우기)
// 개념: layout.js는 하위 페이지 공통 UI. {children} 자리에 각 page.js가 들어감. Link로 이동.
// 막히면 정답 참고: lessons_edu/07_next_routing/app/layout.js
import './globals.css'
import Link from 'next/link'

export const metadata = { title: '나의 블로그' }

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: 'sans-serif' }}>
        <header style={{ borderBottom: '1px solid #eee', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <strong style={{ fontSize: '1.2rem' }}>📝 나의 블로그</strong>
          <nav style={{ display: 'flex', gap: '1.5rem' }}>
            {/* TODO: STEP 1 — Link로 홈(/), 소개(/about), 블로그(/blog) 네비게이션을 만드세요. */}
          </nav>
        </header>

        <main style={{ maxWidth: '780px', margin: '0 auto', padding: '2rem' }}>
          {/* TODO: STEP 1 — 각 페이지 내용이 들어갈 자리에 children을 렌더링하세요. */}
        </main>

        <footer style={{ borderTop: '1px solid #eee', padding: '1.5rem 2rem', textAlign: 'center', color: '#aaa', fontSize: '14px' }}>
          © 2025 나의 블로그
        </footer>
      </body>
    </html>
  )
}
