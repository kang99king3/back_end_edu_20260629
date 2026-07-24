// ── STEP 2: 디바운스 커스텀 훅 ── (빈칸 채우기)
// 개념: 값이 '멈춘 뒤' delay가 지나야 반영. cleanup으로 이전 타이머 취소가 핵심.
// 막히면 정답 참고: lessons_edu/04_custom_hooks/src/hooks/useDebounce.js
import { useState, useEffect } from 'react'

export function useDebounce(value, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    // TODO: STEP 2 — value/delay가 바뀔 때, delay 후에 debouncedValue를 갱신하는 useEffect를 작성하세요.
    //   반드시 cleanup(return () => ...)으로 이전 타이머를 취소해야 '마지막 값'만 반영됩니다.
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay)
        //return 코드-> 다음번에 effect가 실행할때 동작함
        // effect실행->return 기능 준비만하고 -> effect실행할때 return기능 먼저 실행
        return () => clearTimeout(timer)
    }, [value, delay])
    return debouncedValue
}
