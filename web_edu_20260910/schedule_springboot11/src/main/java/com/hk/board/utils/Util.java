package com.hk.board.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Component;

// thymeleaf에서 호출할때 "util"불러주면 됨 (알아서 Util util 정의해줌)
@Component("util") // <-- 내가 따로 이름을 정의한다면 
public class Util {

    //mdate:날짜형식으로 변환하는 기능
    // 파라미터내용: mdate, 변경할 문자열 패턴(yyyy-mm-dd)
    public String toDates(String mdate,String p){
        // mdate-> "yyyy-MM-dd hh:mm:ss"
        //1. 입력받을 문자열의 형식을 정의
        DateTimeFormatter inputFormatter=
                        DateTimeFormatter.ofPattern("yyyyMMddHHmm");
        //2. 문자열(mdate)을 파싱해서 실제 날짜/시간 객체로 변환
        LocalDateTime ldt=LocalDateTime.parse(mdate,inputFormatter);

        //3. 출력용 패턴 정의
        DateTimeFormatter outputFormatter = 
                            DateTimeFormatter.ofPattern(p);
        //4. 포맷 처리한 문자열을 반환
        return ldt.format(outputFormatter);
    }

    // 파리미터(list객체, 해당 일(date))
}
