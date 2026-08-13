package hk.edu20260813.day09;

import java.time.LocalDate;

public class D2_Calendar {

    // 윤년일때 달의 마지막 날
    private static final int[] leap = { 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
    // 평년일때 달의 마지막 날
    private static final int[] plain = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };

    // 윤년을 판단하는 메서드
    public boolean isLeapYear(int year) {
        boolean isS = false;
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            isS = true;
        }
        return isS;
    }
    // 1년1월1일~2026년8월1일까지의 경과일 구하기-> 공백수를 구하기 위함
    // 1년은 365일, 366일 1년~2025년 -> 윤년만 판단해서 계속 합을 구해감
    // 해당 년도의 8월 전월까지 31+28+31 ....

    // 전년도까지의 경과일
    public int dates(int year) {
        int tot = 0;
        for (int i = 1; i < year; i++) {
            if (isLeapYear(i)) {
                tot += 366;
            } else {
                tot += 365;
            }
        }
        return tot;
    }

    // 전년도경과일+전월까지의 경과일
    public int dates(int year, int month) {
        int tot = dates(year);
        for (int i = 1; i < month; i++) {
            if (isLeapYear(year)) {
                tot += leap[i - 1];
            } else {
                tot += plain[i - 1];
            }
        }
        return tot;
    }

    // 전년도 경과일+전달까지 경과일+현재일 1일
    public int dates(int year, int month, int date) {
        return dates(year, month) + date;
    }

    // 해당 달의 마지막 날
    public int lastDay(int year, int month) {
        return isLeapYear(year) ? leap[month - 1] : plain[month - 1];
    }

    // 한달을 출력하는 메서드
    public void calendarPrint(int year, int month) {
        System.out.println(year + "년\t" + month + "월");
        System.out.println("일\t월\t화\t수\t목\t금\t토");

        // 1일의 요일 -> 0~6 -> 해당 달력의 앞쪽 공백수와 일치
        int dayOfWeek = dates(year, month, 1) % 7;

        // 공백을 출력
        for (int i = 0; i < dayOfWeek; i++) {
            System.out.print("\t");
        }
        // 날짜 출력
        for (int i = 1; i <= lastDay(year, month); i++) {
            System.out.print(i + "\t");
            if ((i + dayOfWeek) % 7 == 0) {
                System.out.println();
            }
        }
    }

    public static void main(String[] args) {
        D2_Calendar cal = new D2_Calendar();
        cal.calendarPrint(2026, 8);

        // 실습: 1. 2026년도 1월~12까지 출력하기

        // 실습: 2.나의 살아온 일수 구하기 --> 경과일 구하는 기능 구현

        // 실습: 3. JAVA API를 활용해서 구현해보기
        // -- 관련 클래스: java.util.Calendar, java.time.LocalDate
    }
}
