package hk.edu20260804.day02;

import java.util.Random;

public class D2_ControlEx {
    public static void main(String[] args) {

        // 구구단
        // 2단을 출력하는 코드
        for (int i = 1; i < 10; i++) {
            System.out.printf("\"2X%d=%d\"", i, (2 * i));
            System.out.println();// 기본 줄바꿈기능을 제공
        }

        // 2~9단 출력
        for (int i = 2; i < 10; i++) {
            for (int j = 1; j < 10; j++) {
                System.out.printf("\"%dX%d=%d\"\n", i, j, (i * j));
            }
            System.out.println("-------------------");
        }
        // 2~9단 출력하는데 짝수단만 출력
        for (int i = 2; i < 10; i++) {
            if (i % 2 == 0) {
                for (int j = 1; j < 10; j++) {
                    System.out.printf("\"%dX%d=%d\"\n", i, j, (i * j));
                }
            }
            System.out.println("-------------------");
        }
        // 2~9단 출력하는데 홀수단만 출력
        for (int i = 2; i < 10; i++) {
            if (i % 2 != 0) {
                for (int j = 1; j < 10; j++) {
                    System.out.printf("\"%dX%d=%d\"\n", i, j, (i * j));
                }
            }
            System.out.println("-------------------");
        }
        // 1~100까지의 수의 합을 출력
        int sum = 0;
        for (int i = 1; i <= 100; i++) {
            sum += i;// 단축연산자
        }
        System.out.println("1~100까지의 총합:" + sum);
        // 1~100까지의 수 중에 4의 배수의 총합 출력
        int sum2 = 0;
        for (int i = 1; i <= 100; i++) {
            if (i % 4 == 0) {
                sum2 += i;// 단축연산자
            }
        }
        System.out.println("1~100까지의 수 중 4의 배수의 총합:" + sum2);

        // 주사위 두개의 합이 5이면 실행을 멈추고,
        // 5가 아니면 계속 실행되게 코드를 작성하자
        // 주사위 두수를 생성할때마다 콘솔에 출력도 하자
        // 합이 5가 나오면 "합이 5가되어 종료합니다."라고도 출력하자

        // 1~6까지의 숫자로 구성, 랜덤하게 숫자 생성하는 기능
        // ---> Math객체를 활용, Random객체를 활용
        // for문, while문 ????
        // 코드작성
        while (true) {
            int num1 = (int) (Math.random() * 6) + 1;// 1~6
            int num2 = (int) (Math.random() * 6) + 1;// 1~6
            System.out.printf("(%d,%d)\n", num1, num2);
            if (num1 + num2 == 5) {
                System.out.println("합이 5가되어 종료합니다.!~");
                break;
            }
        }

        // Random random = new Random();
        // System.out.println(random.nextInt(6));
    }
}
