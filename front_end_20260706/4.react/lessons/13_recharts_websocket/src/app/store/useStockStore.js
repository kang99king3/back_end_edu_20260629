// 10강 스토어 + 테마 상태(theme/toggleTheme) 추가
// 개념: 다크/라이트 상태도 전역 상태로 두고 persist에 저장 → 새로고침해도 유지.
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStockStore = create(
  persist(
    (set, get) => ({
      // ── 테마 상태 (STEP 2에서 사용)
      theme: 'dark', // 'dark' | 'light'
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

      // ── 앱 상태
      watchlist: ['AAPL', 'TSLA', 'MSFT'],
      selectedSymbol: 'AAPL',
      prices: {},
      loading: false,
      error: null,
      portfolio: { AAPL: { qty: 10, avgPrice: 170.5 } },

      addToWatchlist: (symbol) => {
        const { watchlist, fetchPrice } = get()
        if (watchlist.includes(symbol)) return
        set({ watchlist: [...watchlist, symbol] })
        fetchPrice(symbol)
      },
      removeFromWatchlist: (symbol) =>
        set((state) => ({ watchlist: state.watchlist.filter((s) => s !== symbol) })),
      selectSymbol: (symbol) => set({ selectedSymbol: symbol }),

      // 실시간 차트(StockChart)가 최신 체결가를 스토어에 동기화할 때 사용
      setPrice: (symbol, price) =>
        set((state) => ({ prices: { ...state.prices, [symbol]: price } })),

      fetchPrice: async (symbol) => {
        set({ loading: true, error: null })
        try {
          const res = await fetch(`/api/stock/${symbol}`)
          if (!res.ok) throw new Error(`${symbol} 시세 조회 실패`)
          const data = await res.json()
          set((state) => ({ prices: { ...state.prices, [symbol]: data.price }, loading: false }))
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },
      fetchAllPrices: async () => {
        const { watchlist, fetchPrice } = get()
        await Promise.all(watchlist.map((s) => fetchPrice(s)))
      },

      buyStock: (symbol, qty, price) => {
        const { portfolio } = get()
        const existing = portfolio[symbol]
        if (existing) {
          const totalQty = existing.qty + qty
          const totalCost = existing.qty * existing.avgPrice + qty * price
          set((state) => ({ portfolio: { ...state.portfolio, [symbol]: { qty: totalQty, avgPrice: totalCost / totalQty } } }))
        } else {
          set((state) => ({ portfolio: { ...state.portfolio, [symbol]: { qty, avgPrice: price } } }))
        }
      },
      sellStock: (symbol, qty) => {
        const { portfolio } = get()
        const existing = portfolio[symbol]
        if (!existing) return
        const remain = existing.qty - qty
        if (remain <= 0) {
          set((state) => {
            const next = { ...state.portfolio }
            delete next[symbol]
            return { portfolio: next }
          })
        } else {
          set((state) => ({ portfolio: { ...state.portfolio, [symbol]: { ...existing, qty: remain } } }))
        }
      },
    }),
    {
      name: 'stock-dashboard',
      partialize: (state) => ({
        theme: state.theme, // 테마도 저장
        watchlist: state.watchlist,
        selectedSymbol: state.selectedSymbol,
        portfolio: state.portfolio,
      }),
    }
  )
)

export default useStockStore
