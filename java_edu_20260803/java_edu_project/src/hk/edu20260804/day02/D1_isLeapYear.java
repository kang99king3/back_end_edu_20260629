package hk.edu20260804.day02;

//파일명이 클래스명과 동일해야 함
public class D1_isLeapYear {

    public static void main(String[] args) {
        // 윤년: 1년은 365일 ----> 366일인 해, 2월달의 마지막날이 29일
        // 윤년을 판단하는 조건을 확인
        // - 년도가 4의 배수이면서, 100으로 나누어 떨어지지 않는 수
        // - 또는 400으로 나누어 떨어지는 수
        // 2026년도가 윤년인지 아닌지 확인해서 출력해보기: "2026년은 윤년이다."
        // "2026년은 평년이다."

        // 코드 작성해보기
        int year = 2027;
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            System.out.println(year + "년 윤년이다");
        } else {
            System.out.println(year + "년은 평년이다.");
        }

        // 년도의 범위로 윤년여부 확인하기: 2000년~2030년 사이에 윤년
        int sYear = 2000;
        int eYear = 2030;
        // for (int i = sYear; i <= eYear; i++) {
        // if ((i % 4 == 0 && i % 100 != 0) || i % 400 == 0) {
        // System.out.println(i + "년 윤년이다");
        // } else {
        // System.out.println(i + "년은 평년이다.");
        // }
        // }
        // 윤년을 판단하는 메서드를 활용해서 조건 확인
        for (int i = sYear; i <= eYear; i++) {
            if (isLeapYear(i)) {
                System.out.println(i + "년 윤년이다");
            } else {
                System.out.println(i + "년은 평년이다.");
            }
        }
    }// main종료

    // 윤년을 판단하는 메서드: 반환타입은 true/false
    public static boolean isLeapYear(int year) {
        boolean isS = false;
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            isS = true;
        }
        return isS;
    }

}// class종료
