// ── STEP 4: 블로그 목록 → "/blog" ── (빈칸 채우기)
// 개념: posts 배열을 map으로 렌더, 각 글을 동적 경로(/blog/1)로 Link 연결.
// 막히면 정답 참고: lessons_edu/07_next_routing/app/blog/page.js
import Link from 'next/link'
import { posts, tagStyle } from './posts'

export default function BlogList() {
    return (
        <div>
            <h1>블로그 ({posts.length}개)</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {/* TODO: STEP 4 — posts를 map으로 순회하며 각 글을 렌더링하세요.
            - 각 항목에 고유 key
            - 제목을 <Link href={`/blog/${post.id}`}>로 감싸 동적 경로로 이동
            - 태그는 <span style={tagStyle(post.tag)}>로 표시 */}
                {posts.map((post) => (
                    <li key={post.id} style={{ borderBottom: '1px solid #eee', padding: '1.25rem 0' }}>
                        <span style={tagStyle(post.tag)}>
                            {post.tag}
                        </span>
                        <h2 style={{ margin: '6px 0 4px', fontSize: '1.1rem' }}>
                            {/* 동적시그먼트 : /blog/1 , /blog/2 , /blog/3 */}
                            <Link href={`/blog/${post.id}`}
                                style={{ textDecoration: 'none', color: '#1a1a18' }}>
                                {post.title}
                            </Link>
                        </h2>
                        <p sytle={{ color: '#aaa', fontSize: '13px', margin: 0 }}>{post.date}</p>
                    </li>))}
            </ul>
        </div >
    )
}
