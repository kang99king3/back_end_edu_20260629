// ── STEP 1: 검색 API Route → GET /api/search?q=... ── (빈칸 채우기)
// 개념: app/api/**/route.js = 백엔드. GET(request) + Response.json(). 쿼리는 searchParams로.
// 막히면 정답 참고: lessons_edu/09_api_routes/app/api/search/route.js
// page.js : 사용자 보게되는 화면(html, UI)을 반환하는 컴포넌트
// route.js : 화면 표현 X , 데이터를 주고받는 API 서버의 역할(JSON 등)을 수행


// 더미 종목 데이터(실제로는 증권사 API 검색해서 데이터를 가져오게 됨)
// fetch -> fecth 보안강화
// 클라이언트(fetch) -> /api/search/route.js(fetch) -> finnhub API 데이터 받아옴
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

// request : 클라이언트 fetch에서 보낸 요청 정보
export async function GET(request) {
    // TODO: STEP 1 — 쿼리스트링 q를 읽으세요. (new URL(request.url).searchParams 사용, 소문자 변환)
    // fetch('/api/search?q=app') 요청
    // URL객체에는 url 정보가 있고 내용은 {pathname, hostname, searchParams}
    // searchParams={q:v}
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')?.toLowerCase() || ''

    //Response객체 : 서버에서 브라우저로 응답하는 기능을 제공하는 표준 자바스크립트 객체
    if (!q) return Response.json({ results: [] }) // json(): 문자열형태(json)


    // symbol 또는 회사명에 검색어가 포함된 항목 최대 5개까지 검색
    const results = STOCKS.filter(
        (s) => s.symbol.toLowerCase().includes(q) ||
            s.name.toLowerCase().includes(q)
    ).slice(0, 5)
    // TODO: STEP 1 — 심볼/회사명에 q가 포함된 항목을 최대 5개 필터링해 Response.json으로 반환하세요.
    // key와 대입할 상수명이 같으면 : 변수명을 생략할 수 있다
    return Response.json({ results })
}
