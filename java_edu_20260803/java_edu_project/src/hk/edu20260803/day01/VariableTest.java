package hk.edu20260803.day01;

public class VariableTest {

    public static void main(String[] args) {
        // 기본 타입의 특징
        // 1.정수타입
        // : 기본형은 int
        byte b = 1;
        // b = 128;// -128~127 표현범위
        short sh = 128;// 2byte 크기
        int i = 50000000;// 4byte 크기
        long l = 5000000000L;// 리터럴 정수는 기본 int형으로 인식함->L을 붙여준다
        byte bb = (byte) i;// byte -> int : 원본 손실

        int ii = 126;
        byte bbb = (byte) ii;// 원본값 손실 없음
        System.out.println("bb:" + bb + "," + "bbb:" + bbb);
        System.out.println("================================");

        // 2.실수타입
        // 기본형은 double(8byte)
        double d = 15.7;
        float f = 15.77f;// 8byte크기라 f를 붙여줌
        float ff = (float) (d + f);// 큰값을 작은 상자에 담는다(down casting)

        // 3.다른 타입끼리 연산
        int iii = (int) (i + d);// int+double-> double+double => double타입
        int iiii = i + (int) d;

        // 4. 정수끼리 연산
        byte b1 = 10;
        byte b2 = 20;
        byte b3 = (byte) (b1 + b2);// 변수끼리 연산 -> 변하는 값이기 때문에 127의 범위를 벗어날 수 있다
        byte b4 = 10 + 20;// 리터럴 값-> 상수의 개념
    }

}
