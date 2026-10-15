package com.hk.board.handler;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j 
@ControllerAdvice // @Controller가 적용된 클래스에서 발생되는 예외를 catch함
public class Exceptionhandle {

     // 비즈니스/입력값 관련 예외 처리 (선택 사항)
    @ExceptionHandler(IllegalArgumentException.class)
    public String handleIllegalArgumentException(IllegalArgumentException e, Model model) {
        log.warn("잘못된 요청 파라미터 발생: {}", e.getMessage());
        model.addAttribute("msg", e.getMessage());
        return "error";
    }
    // 그 외 모든 예외 처리
    @ExceptionHandler(Exception.class)
    public String handleException(Exception e, Model model) {
        // e를 마지막 인자로 넘겨 전체 StackTrace를 로그에 기록
        log.error("Exception 발생: ", e);
        
        model.addAttribute("msg", "오류가 발생하여 확인 중입니다. 잠시 후 다시 시도해 주세요.");
        model.addAttribute("detail", e.getMessage()); // 개발 단계 확인용
        return "error";
    }
}
