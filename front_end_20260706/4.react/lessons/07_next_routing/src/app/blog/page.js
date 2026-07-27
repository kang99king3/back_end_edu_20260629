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
            </ul>
        </div>
    )
}
