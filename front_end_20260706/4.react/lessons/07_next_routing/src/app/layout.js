// ── STEP 1: 루트 레이아웃 (공통 뼈대) ── (빈칸 채우기)
// 개념: layout.js는 하위 페이지 공통 UI. {children} 자리에 각 page.js가 들어감. Link로 이동.
//    - Link: 새로고침 없는 클라이언트 네비게이션(<a> 대체)
//    - NextJS는 컴포넌트 기본작성방식이 '서버 컴포넌트'다
//    - 만약 클라이언트 컴포넌트를 사용한다면 가장 상단에 'use client' 선언해야함
//    - * 서버컴포넌트에서 사용할 수 없는 기능
//         - 전역상태공유(Context API, Zustand, Redux 등)를 사용할 수 없어
//         - Hooks(useState....)를 사용할 수 없다.(사용자와 브라우저간 이벤트 처리작업등)
//    - * 클라이언트 컴포넌트에서 사용할 수 없는 기능
//         - async / await 비동기 처리 : 리액트가 어떻게 그려야 할지 모름
//         - effect 등 함수에 비동기 선언해서 사용할 수 있음
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
            <Link href="/">홈</Link>
            <Link href="/about">소개</Link>
            <Link href="/blog">블로그</Link>
            {/* <a href="/about">소개</a> */}
          </nav>
        </header>

        <main style={{ maxWidth: '780px', margin: '0 auto', padding: '2rem' }}>
          {/* TODO: STEP 1 — 각 페이지 내용이 들어갈 자리에 children을 렌더링하세요. */}
          {children}
        </main>

        <footer style={{ borderTop: '1px solid #eee', padding: '1.5rem 2rem', textAlign: 'center', color: '#aaa', fontSize: '14px' }}>
          © 2025 나의 블로그
        </footer>
      </body>
    </html>
  )
}
