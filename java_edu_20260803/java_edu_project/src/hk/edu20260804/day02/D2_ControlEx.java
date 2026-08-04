package hk.edu20260804.day02;

import java.util.Random;
import java.util.Scanner;
import java.util.Base64.Encoder;

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

        // Scanner 클래스: 키보드로 입력받는 기능에 활용해 볼 수 있는 객체
        // Scanner scan = new Scanner(System.in, "EUC-KR");
        // System.out.println(scan.next());
        // int num = 0;
        // System.out.print("입력하세요:");
        // num = Integer.parseInt(scan.nextLine());// 이 코드가 실행되면 콘솔에서 입력을 대기한다.
        // System.out.println("입력결과값:" + num);
        // System.out.println("또 입력받기:");
        // int num2 = Integer.parseInt(scan.nextLine());
        // hasNextInt()... 확인하는 기능

        Scanner scan = new Scanner(System.in);
        int balance = 0;// 금액 저장할 변수
        while (true) {
            System.out.println("-------------------------");
            System.out.println("1.예금|2.출금|3.잔고|4.종료");
            System.out.println("-------------------------");
            System.out.print("선택>");

            int num = 0;
            if (scan.hasNextInt()) {// 줄바꿈을 읽지 않음 "문자입력\n"
                num = Integer.parseInt(scan.nextLine());
            } else {
                System.out.println("숫자만 입력하세요");
                scan.nextLine();// 남아 있는 한줄에 대해 읽고 제거
                continue;
            }

            if (num == 1) {// 예금
                System.out.print("예금액>");
                int a = Integer.parseInt(scan.nextLine());// "10000"
                balance += a;
                System.out.println(a + "원 입금을 완료했습니다.");
            } else if (num == 2) {// 출금
                System.out.print("출금액>");
                int a = Integer.parseInt(scan.nextLine());
                if (balance > a) {// 잔액이 부족한지 충분한지 확인
                    balance -= a;
                } else {
                    System.out.println("잔액이 부족합니다.");
                    continue;
                }
            } else if (num == 3) { // 조회
                System.out.printf("잔고:%d원입니다.\n", balance);
            } else if (num == 4) {
                System.out.println("프로그램 종료");
                break;
            } else {
                System.out.println("1~4까지만 입력하세요");
            }
        }
    }
}
