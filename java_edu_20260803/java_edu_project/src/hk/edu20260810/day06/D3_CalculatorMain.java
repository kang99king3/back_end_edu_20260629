package hk.edu20260810.day06;

import java.util.Scanner;
import java.util.regex.Pattern;

public class D3_CalculatorMain {
    public static void main(String[] args) {
        // D3_Calculator 객체 생성
        D3_Calculator cal = new D3_Calculator();
        // Scanner객체 생성
        Scanner scan = new Scanner(System.in);
        // 계속 입력받아서 실행되도록 while문 이용해서 처리
        while (true) {
            System.out.println("계산 값을 입력하세요(+,-*,/ 연산만 가능)입력은 \"5+10\"");
            String s = scan.next();// next() 한단어를 읽는다. "5+10 5+20" nextLine()
            // ^[0-9].... --> "5+10" ---> 패턴 비교(정규화 표현식 이용)
            if (Pattern.matches("^[0-9][0-9]*[+|\\-|*|/][0-9]*[0-9]$", s)) {
                cal.calcu(s);// 계산실행
            } else {
                // continue;
                if (s.equals("9")) {
                    System.out.println("계산을 종료합니다.");
                    break;
                } else {
                    System.out.println("입력 형식이 잘못 됐어요~");
                }
            }
        }
        // 예시) "5+10" 문자열을 입력받았다면?
        // 객체명.calcu("5+10") 실행해서 결과 출력하기

    }
}
