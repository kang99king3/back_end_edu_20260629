// ── STEP 3: Recharts 라인 차트 + 실시간 갱신 ── (빈칸 채우기)
// 개념: 초기 데이터(REST) 로드 → 실시간(WebSocket 또는 폴링)으로 점 추가.
//   ⚠️ setPrice(스토어 갱신)는 setChartData 업데이터 '밖'에서 호출! (pushPrice 참고)
// 막히면 정답 참고: lessons_edu/13_recharts_websocket/app/components/StockChart.jsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import useStockStore from '@/app/store/useStockStore'

function nowLabel() {
  return new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export default function StockChart() {
  // 현재 선택된 종목코드
  const selectedSymbol = useStockStore((s) => s.selectedSymbol)
  // 현재 선택된 종목의 가격
  const setPrice = useStockStore((s) => s.setPrice)
  //차트를 그리기 위한 과거부터 현재 데이터 (분봉)
  const [chartData, setChartData] = useState([])
  // 로딩여부(로딩화면을 보여줄지 여부)
  const [isLoading, setIsLoading] = useState(true)
  // 직전 가격 (렌더와 무관하게 관리)
  const lastPriceRef = useRef(0)

  // TODO: STEP 3 — 종목(selectedSymbol)이 바뀔 때마다 /api/stock/[symbol]/chart 로 초기 데이터를 로드하세요.
  //   받은 data로 setChartData, 마지막 가격을 lastPriceRef에 저장, setIsLoading(false).
  //   (언마운트 시 stale 응답을 무시하도록 정리하면 더 좋습니다)
  useEffect(() => {
    let alive = true //최신 요청을 확인하는 표시용
    setIsLoading(true)
    fetch(`/api/stock/${selectedSymbol}/chart`)
      .then((r) => r.json()) //js객체변환
      .then(({ data }) => {  // 응답받은 값 r = symbol,data[]
        if (!alive) return
        setChartData(data) //가격정보 저장
        if (data.length) lastPriceRef.current = data[data.length - 1].price
        setIsLoading(false)
      })
    return () => { alive = false }//진행중이던 작업을 취소
  }, [selectedSymbol])

  useEffect(() => {
    if (isLoading) return

    // 새 가격이 올 때마다 실행할 공통 처리 (제공됨 — setPrice가 업데이터 '밖'에 있음에 주목)
    const pushPrice = (price) => {
      const newPrice = parseFloat(price.toFixed(2))
      lastPriceRef.current = newPrice
      const point = { time: nowLabel(), price: newPrice }
      setChartData((prev) => [...prev.slice(-59), point]) // 업데이터는 배열 추가만(순수)
      setPrice(selectedSymbol, newPrice) // 스토어 동기화는 업데이터 밖에서
    }

    // TODO: STEP 3 — 실시간 갱신을 구현하세요. (의존성 [selectedSymbol, isLoading, setPrice])
    //   · NEXT_PUBLIC_FINNHUB_API_KEY 가 있으면 WebSocket(wss://ws.finnhub.io)으로 구독 → onmessage에서 pushPrice
    //     (cleanup에서 unsubscribe + close)
    //   · 키가 없으면 2초마다 /api/stock/[symbol]을 폴링해 pushPrice (학습용 폴백, cleanup에서 clearInterval)

    //env.local key가져오기
    //webSocket은 외부 API연결할때 클라이언트에서 바로 연결해야 함
    // 클라이언트 컴포넌트에서 가져오려면 public 선언된 이름의 키로 가져와야 함
    // 보안에는 취약하다. 
    const token = process.env.NEXT_PUBLIC_FINNHUB_API_KEY

    // 1번 방식:WebSocket 방식 구현 (실제로 실시간 처리, 키 필요)
    if (token) {
      const ws = new WebSocket(`wss://ws.finnhub.io?token=${token}`)
      ws.onopen = () => ws.send(JSON.stringify({ type: 'subscribe', symbol: selectedSymbol }))
      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data)
        console.log("data", msg.p)
        if (msg.type !== 'trade' || !msg.data?.length) return
        pushPrice(msg.data[msg.data.length - 1].p)//마지막 체결가
      }
      ws.onerror = (err) => console.log('websocket 오류:', err)
      return () => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'unsubscribe', symbol: selectedSymbol }))
        }
        ws.close() // 이전 작업에서 연결된 socket 닫기
      }
    }

    //2번 방식:폴링 폴백 (키 없을때)
    const id = setInterval(async () => {
      try {
        const res = await fetch(`/api/stock/${selectedSymbol}`, { cache: 'no-store' })
        const q = await res.json()
        if (typeof q.price === 'number' && q.price !== 0) pushPrice(q.price)
      } catch (err) {
        console.warn('[StockChart] 폴링 실패:', err.message)
      }
    }, 2000)
    return () => clearInterval(id)

  }, [selectedSymbol, isLoading, setPrice])// useEffect 종료

  const last = chartData[chartData.length - 1]?.price || 0
  const first = chartData[0]?.price || 0
  const isUp = last >= first

  return (
    <div className="p-4 rounded-xl border border-gray-200 bg-white dark:border-stock-border dark:bg-stock-card">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-stock-cyan">{selectedSymbol}</h3>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">${last.toFixed(2)}</span>
        </div>
        <span className="flex items-center gap-2 text-xs text-gray-500 dark:text-stock-muted">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 실시간
        </span>
      </div>

      {isLoading ? (
        <div className="h-60 flex items-center justify-center text-gray-500 dark:text-stock-muted">차트 로딩 중...</div>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#0f346055" />
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#8892b0' }} interval="preserveStartEnd" />
            <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10, fill: '#8892b0' }} tickFormatter={(v) => `$${v.toFixed(0)}`} />
            <Tooltip contentStyle={{ background: '#0d2137', border: '1px solid #0f3460', borderRadius: 8, fontSize: 13 }} labelStyle={{ color: '#8892b0' }} />
            <Line type="monotone" dataKey="price" stroke={isUp ? '#64ffda' : '#e94560'} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
