// ── STEP 4: localStorage 연동 커스텀 훅 ── (빈칸 채우기)
// 개념: useState와 같은 [값, setter]를 돌려주되 자동 저장/복원. 초기값은 함수형 초기화로 1회만 읽기.
// 막히면 정답 참고: lessons_edu/04_custom_hooks/src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
    // TODO: STEP 4 — 함수형 초기화(useState(() => ...))로 localStorage에서 복원하세요.
    //   저장된 값이 있으면 JSON.parse해서 쓰고, 없거나 에러면 initialValue 사용.
    const [value, setValue] = useState(() => {
        try {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (err) { // log 레벨 : warn , info , error .. 
            console.warn('localStorage 읽기 실패:', err)
            return initialValue
        }
    }) // ← 함수형 초기화로 교체하세요

    // TODO: STEP 4 — value/key가 바뀔 때 localStorage에 저장(JSON.stringify)하는 useEffect를 작성하세요.
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (err) {
            console.warn('localStorage 저장 실패 : ', err)
        }
    }, [key, value])

    return [value, setValue] // useState와 동일한 구조 만들어서 리턴
}
