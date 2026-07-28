// ── STEP 1: 검색 API Route → GET /api/search?q=... ── (빈칸 채우기)
// 개념: app/api/**/route.js = 백엔드. GET(request) + Response.json(). 쿼리는 searchParams로.
// 막히면 정답 참고: lessons_edu/09_api_routes/app/api/search/route.js
const STOCKS = [
    { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ' },
    { symbol: 'TSLA', name: 'Tesla Inc.', exchange: 'NASDAQ' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', exchange: 'NASDAQ' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', exchange: 'NASDAQ' },
    { symbol: 'META', name: 'Meta Platforms Inc.', exchange: 'NASDAQ' },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.', exchange: 'NYSE' },
    { symbol: 'V', name: 'Visa Inc.', exchange: 'NYSE' },
    { symbol: 'JNJ', name: 'Johnson & Johnson', exchange: 'NYSE' },
]

export async function GET(request) {
    // TODO: STEP 1 — 쿼리스트링 q를 읽으세요. (new URL(request.url).searchParams 사용, 소문자 변환)
    const q = ''

    if (!q) return Response.json({ results: [] })

    // TODO: STEP 1 — 심볼/회사명에 q가 포함된 항목을 최대 5개 필터링해 Response.json으로 반환하세요.
    return Response.json({ results: [] })
}
