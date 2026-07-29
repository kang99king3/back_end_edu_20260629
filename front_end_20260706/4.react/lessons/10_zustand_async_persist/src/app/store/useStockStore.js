// ── STEP 1: persist + async 액션 + 포트폴리오 ── (빈칸 채우기)
// 개념: persist(저장/복원) + partialize(선별), async fetch → set, get()으로 다른 액션 호출.
// 막히면 정답 참고: lessons_edu/10_zustand_async_persist/app/store/useStockStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// TODO: STEP 1 — 스토어 전체를 persist(...)로 감싸세요.
//   (create의 인자를 persist(만들기함수, 설정)로 래핑. 설정은 파일 하단 TODO 참고)
const useStockStore = create(
  persist(
    (set, get) => ({
      // ── 상태
      watchlist: ['AAPL', 'TSLA', 'MSFT'],
      selectedSymbol: 'AAPL',
      prices: {},
      loading: false,
      error: null,
      portfolio: { AAPL: { qty: 10, avgPrice: 170.5 } },

      // ── 관심종목 (add는 fetchPrice까지 호출!)
      addToWatchlist: (symbol) => {
        const { watchlist, fetchPrice } = get()
        if (watchlist.includes(symbol)) return
        set({ watchlist: [...watchlist, symbol] })
        // TODO: STEP 1 — 추가한 종목의 시세를 바로 조회하세요. (fetchPrice 호출)
        fetchPrice(symbol) //관심종목 추가할때 가격 정보도 추가
      },
      removeFromWatchlist: (symbol) =>
        set((state) => ({ watchlist: state.watchlist.filter((s) => s !== symbol) })),
      selectSymbol: (symbol) => set({ selectedSymbol: symbol }),

      // TODO: STEP 1 — 단일 종목 시세 조회 (async): /api/stock/[symbol]을 fetch해 prices 갱신.
      //   로딩을 켜고, 성공 시 해당 종목 가격 반영, 실패 시 error 세팅.
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

      // TODO: STEP 1 — 관심종목 전체 병렬 조회: watchlist를 돌며 fetchPrice를 Promise.all로.
      fetchAllPrices: async () => { },

      // TODO: STEP 1 — 매수: 이미 보유 중이면 평단가 재계산(총비용/총수량), 없으면 신규 등록.
      buyStock: (symbol, qty, price) => { },

      // TODO: STEP 1 — 매도: 남은 수량이 0 이하면 종목 제거, 아니면 수량만 차감.
      sellStock: (symbol, qty) => { },
    }),
    // TODO: STEP 1 — persist 두 번째 인자(설정)를 추가하세요.
    //   name(localStorage 키)과 partialize(watchlist/selectedSymbol/portfolio만 저장)를 지정.
    // 저장할 상태만 선별해서 선언
    // 상태가 변경될때마다 자동으로 저장된다.
    {
      name: 'stock-dashboard', //localStorage의 키 이름
      partialize: (state) => ({
        watchlist: state.watchlist,
        selectedSymbol: state.selectedSymbol,
        portfolio: state.portfolio,
      })
    }
  )//persist 종료괄호
)//create 종료괄호

export default useStockStore
