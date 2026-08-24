package hk.edu20260824.day15;

public class D1_ExceptionTest {

    public static void main(String[] args) {
        exTest1("오");
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

}
