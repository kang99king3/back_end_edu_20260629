package hk.edu20260803.day01;//파일의 폴더 구조(경로), 최상단에 위치

import hk.edu20260806.day04.D1_divisor;

//명명법
// 클래스명: 파스칼
public class HelloJava {

    // 맴버필드
    // 상수선언: 대문자
    public static final int NUMBER = 10;
    public int number = 10;

    // main메서드: java코드를 실행시켜줌
    // public, static(static메모리에 저장된다)
    // 메서명: 카멜
    public static void main(String[] args) {
        System.out.println("Hello java!!");
        testMethod();
    }

    // 메서드 선언: 카멜
    public static void testMethod() {
        // 변수명: 카멜
        boolean isS = true;
        int i = 100;
        i = 200;
        final int TEST = 10;
        System.out.println("메서드 실행결과:" + i);
    }

}
