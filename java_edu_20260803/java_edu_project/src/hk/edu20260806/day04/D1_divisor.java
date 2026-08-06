package hk.edu20260806.day04;

public class D1_divisor {

    // Default 생성자: 생성자가 생략되어 있다
    public D1_divisor() {
        // 기본적으로 생성자 호출은 맨 윗줄에 작성
        super();// 부모생성자를 호출 -> Object 클래스가 부모임
        // this();// 같이 작성할 수 없다.
    }

    public static void main(String[] args) {
        divisor(12);
        greateDivisor(10, 20);
        lowestMultiple(2, 4);

        // amicable은 non-static메서드이기때문에 객체 생성해서
        // 객체명.메서드로 호출한다.
        D1_divisor divisor = new D1_divisor();
        divisor.amicable(1, 5000);
        divisor.perfectNumber(1, 5000);
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
    public static int greateDivisor(int a, int b) {

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
        return a;// 다른 곳에서 사용해야 되니깐 최대공약수를 반환하게 만들자
    }

    // 최소공배수: (a*b)/두수의 최대공약수
    public static void lowestMultiple(int a, int b) {
        int number = greateDivisor(a, b);
        int result = (a * b) / number;
        System.out.printf("%d와 %d의 최소공배수는 %d입니다.\n", a, b, result);
    }

    // 진약수의 합을 구하는 메서드
    public int sumDivisor(int a) {
        int sum = 0;
        for (int i = 1; i < a; i++) {
            if (a % i == 0) {
                sum += i;
            }
        }
        return sum;
    }

    // 친화수 구하기
    public void amicable(int s, int e) {
        for (int i = s; i <= e; i++) {
            // 220 == 284 , 6완전수 : 1 2 3 6 6==6
            if (i != sumDivisor(i) && i == sumDivisor(sumDivisor(i))) {
                System.out.printf("%d와 %d는 친화수 관계입니다.\n", i, sumDivisor(i));
            }
        }
    }

    // 완전수
    public void perfectNumber(int s, int e) {
        for (int i = s; i <= e; i++) {
            if (i == sumDivisor(i)) {
                System.out.println(i + "는 완전수입니다.");
            }
        }
    }
}
