package hk.edu20260813.day09;

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
}
