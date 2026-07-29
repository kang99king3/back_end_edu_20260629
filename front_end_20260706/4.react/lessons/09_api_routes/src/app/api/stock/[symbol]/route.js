// ── STEP 2: 동적 API Route → GET /api/stock/[symbol] ── (빈칸 채우기)
// 개념: [symbol]은 { params }로. Next 15+: await params. 키 없으면 더미, 있으면 Finnhub.
// 막히면 정답 참고: lessons_edu/09_api_routes/app/api/stock/[symbol]/route.js

// 여러개의 값을 전달할 경우
//  - 경로구조: /api/stock/[symbol]/[date]
//    - /api/stock/AAPL/2026-07-29
//  - 경로구조: /api/stock/[...symbol]
//    - /api/stock/AAPL/TSLA/MSFT... -> symbol을 배열로 받음
export async function GET(request, { params }) {
    // TODO: STEP 2 — 동적 세그먼트 symbol을 await params로 꺼내세요.
    // /api/stock/AAPL
    const { symbol } = await params // params가 Promise -> await
    // .env.local: 환경설정파일 -> process.env -> 알아서 환경파일을 찾는다
    const apiKey = process.env.FINNHUB_API_KEY

    // TODO: STEP 2 — 키(apiKey)가 없으면 더미 시세를 Response.json으로 반환하세요.
    //   (price/change 등을 랜덤으로, source: 'dummy' 포함)
    if (!apiKey) {
        return Response.json({
            symbol,
            price: parseFloat((Math.random() * 50 + 150).toFixed(2)), //최소 150달러부터 시작하려고
            change: parseFloat((Math.random() * 4 - 2).toFixed(2)),
            changePercent: parseFloat((Math.random() * 2 - 1).toFixed(2)),
            timestamp: Date.now(),
            source: 'dummy',
        })
    }
    // 키가 있으면 실제 Finnhub 호출 (제공됨)
    try {
        const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`, { cache: 'no-store' })
        console.log("finnhub데이터:", res)
        if (!res.ok) throw new Error(`API 호출 실패 (status ${res.status})`)
        const data = await res.json() // js객체로 변환 JSON.parse, JSON.stringify
        return Response.json({ symbol, price: data.c, change: data.d, changePercent: data.dp, timestamp: Date.now(), source: 'finnhub' })
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 })
    }
}
