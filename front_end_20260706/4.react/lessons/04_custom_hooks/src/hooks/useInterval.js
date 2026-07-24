// ── STEP 3: 인터벌(주기 실행) 커스텀 훅 ── (빈칸 채우기)
// 개념: delay마다 callback 실행. 최신 callback을 ref에 담아 참조, delay가 null이면 정지.
// 막히면 정답 참고: lessons_edu/04_custom_hooks/src/hooks/useInterval.js
import { useEffect, useRef } from 'react'

export function useInterval(callback, delay) {
    const savedCallback = useRef(callback)

    // TODO: STEP 3 — 최신 callback을 savedCallback.current에 보관하는 useEffect를 작성하세요. (의존성 [callback])

    // TODO: STEP 3 — delay마다 savedCallback.current()를 실행하는 useEffect를 작성하세요.
    //   delay가 null이면 실행하지 말고(정지), cleanup으로 타이머를 정리하세요. (의존성 [delay])
}
