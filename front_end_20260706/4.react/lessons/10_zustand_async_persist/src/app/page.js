// ── STEP 4: 검색 + 관심종목 + 포트폴리오 조합 ──
import StockSearch from './components/StockSearch'
import WatchlistPanel from './components/WatchlistPanel'
import PortfolioPanel from './components/PortfolioPanel'

export default function Home() {
  return (
    <div style={{ maxWidth: 420, margin: '0 auto', padding: '1rem' }}>
      <h1 style={{ padding: '0 1rem' }}>📈 StockDash</h1>
      <StockSearch />
      <WatchlistPanel />
      <PortfolioPanel />
    </div>
  )
}
