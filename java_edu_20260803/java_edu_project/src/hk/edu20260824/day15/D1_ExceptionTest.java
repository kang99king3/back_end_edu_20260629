package hk.edu20260824.day15;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.PreparedStatement;

public class D1_ExceptionTest {

    public static void main(String[] args) {
        // exTest1("오");
        // exTest2("5");

        // 예외를 던지면 사용하는 쪽 어디선가는 직접 처리해야 된다 (try catch)
        try {
            userExceptionTest(12);
        } catch (D1_UserException e) {
            e.printStackTrace();
        }
    }

    public static void exTest1(String s) {
        int a = 0;

        try {
            a = Integer.parseInt(s);// <----예외가 발생될 여지가 있는 코드
        } catch (NumberFormatException e) {
            e.printStackTrace();
        } catch (Exception ee) {
            ee.printStackTrace();
        }
        System.out.println(a);
    }

    public static void exTest2(String s) {
        int i = 0;
        String ss = "스트링";
        int[] array = { 1, 2, 3, 4, 5 };

        try {
            i = Integer.parseInt(s);
            int a = array[5];
        } catch (NumberFormatException e) {
            System.out.println("숫자형태인지 확인하세요");
            e.printStackTrace();
        } catch (StringIndexOutOfBoundsException e) {
            System.out.println("문자열의 길이를 확인하세요");
            e.printStackTrace();
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("배열의 길이를 확인하세요");
            e.printStackTrace();
        } catch (Exception e) {
            System.out.println("나머지 모든 예외를 처리한다.");
        } finally {
            ss = ss.substring(0, 2);
            System.out.println(ss);
        }
        System.out.println("오류발생해도 프로그램은 종료되지 않는다.");

        // try() {
        // } catch (Exception e) {
        // // TODO: handle exception
        // }
    }

    // 사용자 예외처리 및 throws 문법
    public static void userExceptionTest(int a) throws D1_UserException {
        // 숫자를 받아서 1~10까지의 숫자만 받을 수 있다
        if (!(a > 0 && a < 11)) {// 1~10의 범위를 벗어난 숫자를 받는다면
            throw new D1_UserException("1부터 10까지의 숫자만 입력가능");
        }
    }

    public void exTest3() {
        InputStreamReader in = new InputStreamReader(System.in);
        try {
            in.read();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

}
