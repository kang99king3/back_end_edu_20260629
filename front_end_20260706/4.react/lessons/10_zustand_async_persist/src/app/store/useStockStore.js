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
          const data = await res.json() // js객체로 변환
          set((state) => ({ prices: { ...state.prices, [symbol]: data.price }, loading: false }))
        } catch (err) {
          set({ error: err.message, loading: false })
        }
      },

      // TODO: STEP 1 — 관심종목 전체 병렬 조회: watchlist를 돌며 fetchPrice를 Promise.all로.
      fetchAllPrices: async () => {
        const { watchlist, fetchPrice } = get()
        //관심종목 여러개를 가져와 각각 가격정보를 업데이트하는 fetchPrice를 병렬로 호출
        //직렬로 실행할 경우 fetchPrice(s) 하나하나 끝날때까지 기다려야 하므로 비효율적(f->f->f)
        await Promise.all(watchlist.map((s) => fetchPrice(s)))
      },

      // TODO: STEP 1 — 매수: 이미 보유 중이면 평단가 재계산(총비용/총수량), 없으면 신규 등록.
      //        종목코드, 수량, 가격
      buyStock: (symbol, qty, price) => {
        const { portfolio } = get()
        const existing = portfolio[symbol]
        if (existing) {
          //총 수량 = 기존 수량 + 매수 수량
          const totalQty = existing.qty + qty
          //총 매입원가 = 기존 매입원가 + 신규 매입원가
          const totalCost = existing.qty * existing.avgPrice + qty * price
          set((state) => ({
            portfolio: { ...state.portfolio, [symbol]: { qty: totalQty, avgPrice: totalCost / totalQty } },
          }))
        } else {
          set((state) => ({ portfolio: { ...state.portfolio, [symbol]: { qty, avgPrice: price } } }))
        }
      },//buystock종료

      // TODO: STEP 1 — 매도: 남은 수량이 0 이하면 종목 제거, 아니면 수량만 차감.
      sellStock: (symbol, qty) => {
        const { portfolio } = get()
        const existing = portfolio[symbol] //매도 종목의 가격정보 가져오기
        if (!existing) return //없으면 종료
        const remain = existing.qty - qty //보유수량 - 매도수량
        if (remain <= 0) {//0이하라면 모두 매도했다는 의미
          set((state) => {
            const next = { ...state.portfolio } //기존 포트폴리오 복사
            delete next[symbol] //모두 매도했다면 포트폴리오에서 종목 제거
            return { portfolio: next } //제거한 객체로 업데이트
          })
        } else {
          //매수량이 남아있으면, 보유수량에서 매도수량의 차를 구해 다시 업데이트
          set((state) => ({ portfolio: { ...state.portfolio, [symbol]: { ...existing, qty: remain } } }))
        }
      },//sellstock종료
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
