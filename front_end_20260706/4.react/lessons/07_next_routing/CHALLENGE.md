# 07 · 확장과제 정답 & 해설

> 학생용 문제는 `lessons_edu_starter/07_next_routing/README.md` 에 있습니다.

## 과제 1 — 하위 경로 /about/career 추가
폴더를 만들면 곧 경로가 됩니다. `app/about/career/page.js` 생성:
```jsx
// app/about/career/page.js  →  URL "/about/career"
export default function Career() {
  return (
    <div>
      <h1>경력</h1>
      <ul style={{ lineHeight: 2, color: '#555' }}>
        <li>2024 ~ : 프론트엔드 학습</li>
        <li>2025 : 첫 Next.js 프로젝트</li>
      </ul>
    </div>
  )
}
```
**해설**: App Router는 **폴더 구조 = URL**입니다. `about/` 아래에 `career/` 폴더 + `page.js`만 두면 별도 라우팅 설정 없이 `/about/career`가 생깁니다. (필요하면 `/about` 페이지에 `<Link href="/about/career">경력</Link>`도 추가)

## 과제 2 — 없는 글일 때 404 페이지
Next의 `notFound()`를 호출하면 가장 가까운 `not-found.js`가 렌더됩니다.
```jsx
// app/blog/[id]/page.js
import { notFound } from 'next/navigation'

export default async function BlogPost({ params }) {
  const { id } = await params
  const post = posts.find((p) => p.id === Number(id))
  if (!post) notFound() // ← 조건부 반환 대신 404로 처리
  // ...정상 렌더...
}
```
```jsx
// app/blog/[id]/not-found.js  (또는 app/not-found.js)
import Link from 'next/link'
export default function NotFound() {
  return (
    <div>
      <h1>404 — 글을 찾을 수 없습니다</h1>
      <Link href="/blog">← 목록으로</Link>
    </div>
  )
}
```
**해설**: 직접 "찾을 수 없습니다" JSX를 반환해도 되지만, `notFound()`를 쓰면 **HTTP 404 상태**와 함께 Next 표준 404 처리(전용 `not-found.js`)에 연결됩니다. SEO·상태코드 측면에서 더 올바른 방식입니다.
