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
  const selectedSymbol = useStockStore((s) => s.selectedSymbol)
  const setPrice = useStockStore((s) => s.setPrice)

  const [chartData, setChartData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const lastPriceRef = useRef(0)

  // TODO: STEP 3 — 종목(selectedSymbol)이 바뀔 때마다 /api/stock/[symbol]/chart 로 초기 데이터를 로드하세요.
  //   받은 data로 setChartData, 마지막 가격을 lastPriceRef에 저장, setIsLoading(false).
  //   (언마운트 시 stale 응답을 무시하도록 정리하면 더 좋습니다)

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
