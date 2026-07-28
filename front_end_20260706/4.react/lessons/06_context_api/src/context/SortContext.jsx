import { createContext, useContext, useState } from "react";

const SortContext = createContext(null)

export default function SortProvider({ children }) {

    const [sortBy, setSortBy] = useState("symbol") //symbol, price

    return (
        <SortContext.Provider value={[sortBy, setSortBy]}>
            {children}
        </SortContext.Provider>
    )
}

export function useSort() {
    const ctx = useContext(SortContext)
    if (!ctx) throw new Error("sort context 범위를 벗어났습니다.")
    return ctx
}