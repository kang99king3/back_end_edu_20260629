// ── STEP 2a: 스토어 theme → <html>.dark 반영 ── (빈칸 채우기)
// 개념: Tailwind dark:는 <html>.dark일 때만 동작. theme 값에 따라 클래스를 add/remove.
// 막히면 정답 참고: lessons_edu/12_tailwind_darkmode/app/components/ThemeWrapper.jsx
'use client'
import { useEffect } from 'react'
import useStockStore from '@/app/store/useStockStore'

export default function ThemeWrapper({ children }) {
  const theme = useStockStore((s) => s.theme)

  // TODO: STEP 2 — theme가 바뀔 때 <html>(document.documentElement)에 'dark' 클래스를 add/remove 하세요.
  //   (theme === 'dark'이면 add, 아니면 remove — useEffect 의존성 [theme])

  return children
}
