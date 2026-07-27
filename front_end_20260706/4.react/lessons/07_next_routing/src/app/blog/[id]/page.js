// ── STEP 5: 동적 라우트 → "/blog/[id]" ── (빈칸 채우기)
// 개념: [id] 동적 세그먼트. Next 15+ 에서 params는 Promise → async + await params.
// 막히면 정답 참고: lessons_edu/07_next_routing/app/blog/[id]/page.js
import Link from 'next/link'
import { posts, tagStyle } from '../posts'

// TODO: STEP 5 — 이 컴포넌트를 async 함수로 만드세요. (params는 Promise라 await가 필요)
export default async function BlogPost({ params }) {
    // TODO: STEP 5 — params를 await로 풀어 id를 꺼내세요.
    console.log(params)
    //params={id:"1"} 객체형태로 저장하고 있어서 
    // --> params.id 또는 구조분해할당 {id}로 꺼내서 받아야 함
    const { id } = await params // ← await params에서 꺼내도록 교체

    // TODO: STEP 5 — id로 해당 글을 찾으세요. (URL의 id는 문자열이므로 숫자로 변환해 비교)
    const post = posts.find((p) => p.id === Number(id))

    if (!post) {
        return (
            <div>
                <p>❌ 포스트를 찾을 수 없습니다. (id: {id})</p>
                <Link href="/blog">← 목록으로</Link>
            </div>
        )
    }

    return (
        <article>
            <Link href="/blog" style={{ color: '#888', textDecoration: 'none', fontSize: '14px' }}>← 목록으로</Link>
            <span style={{ ...tagStyle(post.tag), marginTop: '1rem', display: 'block', width: 'fit-content' }}>{post.tag}</span>
            <h1 style={{ margin: '0.75rem 0 0.25rem' }}>{post.title}</h1>
            <p style={{ color: '#aaa', fontSize: '13px', marginBottom: '2rem' }}>{post.date}</p>
            <p style={{ lineHeight: 1.9, color: '#444', whiteSpace: 'pre-line' }}>{post.content}</p>
        </article>
    )
}
