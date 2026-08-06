package hk.edu20260806.day04;

public class D1_divisor {

    public static void main(String[] args) {
        divisor(12);
        greateDivisor(10, 20);
    }

    // 약수를 구하는 메서드
    public static void divisor(int number) {
        for (int i = 1; i <= number; i++) {
            if (number % i == 0) {
                System.out.print((i == number) ? i : i + ",");
            }
        }
        System.out.println();
    }

    // 최대공약수
    public static void greateDivisor(int a, int b) {

        // 미리 원본값을 따로 저장해두기-> 나중에 출력용으로 사용하기 위해
        // 값을 복사할때.. 기본타입은 원본을 변경하지 않는다 -> immutable한 특징
        int tempA = a;
        int tempB = b;

        while (true) {

            if (a > b) {
                a = a - b;
            }

            if (a < b) {
                b = b - a;
            }

            // a와 b가 같을 경우
            if (a == b) {
                break;
            }
        }

        System.out.printf("%d와 %d의 최대공약수는 %d입니다.\n", tempA, tempB, a);
    }

}
