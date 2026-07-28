// ── STEP 2: 동적 API Route → GET /api/stock/[symbol] ── (빈칸 채우기)
// 개념: [symbol]은 { params }로. Next 15+: await params. 키 없으면 더미, 있으면 Finnhub.
// 막히면 정답 참고: lessons_edu/09_api_routes/app/api/stock/[symbol]/route.js
export async function GET(request, { params }) {
    // TODO: STEP 2 — 동적 세그먼트 symbol을 await params로 꺼내세요.
    const symbol = 'AAPL'
    const apiKey = process.env.FINNHUB_API_KEY

    // TODO: STEP 2 — 키(apiKey)가 없으면 더미 시세를 Response.json으로 반환하세요.
    //   (price/change 등을 랜덤으로, source: 'dummy' 포함)

    // 키가 있으면 실제 Finnhub 호출 (제공됨)
    try {
        const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`, { cache: 'no-store' })
        if (!res.ok) throw new Error(`API 호출 실패 (status ${res.status})`)
        const data = await res.json()
        return Response.json({ symbol, price: data.c, change: data.d, changePercent: data.dp, timestamp: Date.now(), source: 'finnhub' })
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 })
    }
}
