// ── STEP 1: Zustand 스토어 (전역 상태) ── (빈칸 채우기)
// 개념: create((set, get) => ({ 상태와 액션 })). set=변경, get=읽기.
// 막히면 정답 참고: lessons_edu/08_zustand_store/app/store/useStockStore.js
import { create } from 'zustand'

const useStockStore = create((set, get) => ({
    // ── 상태 (제공됨)
    watchlist: ['AAPL', 'TSLA', 'MSFT'],
    selectedSymbol: 'AAPL',
    prices: { AAPL: 182.52, TSLA: 248.5, MSFT: 378.85 },

    // ── 액션 (빈칸 — 아래 로직을 채우세요)
    // TODO: STEP 1 — 관심종목 추가 (get()으로 현재 목록 확인, 중복이면 무시, set으로 추가)
    addToWatchlist: (symbol) => { },

    // TODO: STEP 1 — 관심종목 제거 (filter로 해당 종목 제외)
    removeFromWatchlist: (symbol) => { },

    // TODO: STEP 1 — 선택 종목 변경 (set)
    selectSymbol: (symbol) => { },

    // TODO: STEP 1 — 특정 종목 가격 설정 (기존 prices를 복사 후 해당 종목만 갱신)
    setPrice: (symbol, price) => { },
}))

export default useStockStore
