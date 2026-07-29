// ── STEP 3: 포트폴리오 (보유 자산 + 손익 + 매도) ── (빈칸 채우기)
// 개념: Object.entries로 순회, reduce로 집계, sellStock으로 매도.
// 막히면 정답 참고: lessons_edu/10_zustand_async_persist/app/components/PortfolioPanel.jsx
'use client'
import useStockStore from '@/app/store/useStockStore'

export default function PortfolioPanel() {
  const portfolio = useStockStore((s) => s.portfolio)
  const prices = useStockStore((s) => s.prices)
  const sellStock = useStockStore((s) => s.sellStock)

  //ES8에서 추가된 객체: JS객체는 {k:v,k:v..} -> [k,v,k,v...] -> js객체를 배열객체로 변환
  const holdings = Object.entries(portfolio) // [ [symbol, {qty, avgPrice}], ... ]

  // TODO: STEP 3 — 총 평가금액/총 원금을 reduce로 계산하세요.
  //   (평가금액: 각 종목의 현재가(없으면 평단가) × 수량 합 / 원금: 평단가 × 수량 합)
  //현재가격 기준 총 평가 금액   .reduce(func,초기값) : 합을 구하는 기능
  const totalValue = holdings.reduce((sum, [symbol, h]) => sum + (prices[symbol] || h.avgPrice) * h.qty, 0)
  //나의 총 매입원가 = 평균단가 * 수량
  const totalCost = holdings.reduce((sum, [, h]) => sum + h.avgPrice * h.qty, 0)
  //총 손익 = 평가금액 - 총 원금
  const totalPnl = totalValue - totalCost
  //총 손익률 - 총 손익/총 원금
  const totalPnlPct = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0

  return (
    <div style={{ padding: '1rem' }}>
      <h2>내 포트폴리오</h2>

      <div style={{ padding: '12px', marginBottom: '1rem', borderRadius: '8px', background: '#0d2137', border: '1px solid #0f3460' }}>
        <div style={{ fontSize: '12px', color: '#8892b0' }}>총 평가금액</div>
        <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#ccd6f6' }}>${totalValue.toFixed(2)}</div>
        <div style={{ fontSize: '13px', color: totalPnl >= 0 ? '#64ffda' : '#e94560' }}>
          {totalPnl >= 0 ? '+' : ''}{totalPnl.toFixed(2)} ({totalPnlPct.toFixed(2)}%)
        </div>
      </div>

      {holdings.length === 0 && <p style={{ color: '#8892b0', fontSize: '13px' }}>보유 종목이 없습니다.</p>}

      {holdings.map(([symbol, h]) => {
        //현재가격 또는 평단가
        const cur = prices[symbol] || h.avgPrice
        //손익금액
        const pnl = (cur - h.avgPrice) * h.qty
        // 손익률
        const pnlPct = ((cur - h.avgPrice) / h.avgPrice) * 100
        // 손익 금액이 0 이상이면 true ... 
        const isUp = pnl >= 0
        return (
          <div key={symbol} style={{ padding: '12px', marginBottom: '8px', borderRadius: '8px', background: '#0d2137', border: `1px solid ${isUp ? '#64ffda33' : '#e9456033'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong style={{ color: '#ccd6f6' }}>{symbol}</strong>
              <span style={{ color: isUp ? '#64ffda' : '#e94560', fontSize: '13px' }}>{isUp ? '+' : ''}{pnlPct.toFixed(2)}%</span>
            </div>
            <div style={{ fontSize: '12px', color: '#8892b0', marginTop: '4px' }}>
              {h.qty}주 · 평균 ${h.avgPrice.toFixed(2)} · 현재 ${cur.toFixed(2)}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ color: isUp ? '#64ffda' : '#e94560', fontSize: '13px' }}>{isUp ? '+' : ''}${pnl.toFixed(2)}</span>
              {/* TODO: STEP 3 — 전량 매도 버튼의 onClick을 채우세요. (sellStock에 종목과 보유수량 전달) */}
              <button style={{ padding: '3px 10px', fontSize: '11px', borderRadius: '4px', border: '1px solid #e94560', background: 'none', color: '#e94560', cursor: 'pointer' }}
                onClick={() => sellStock(symbol, h.qty)}
              >
                전량 매도
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
