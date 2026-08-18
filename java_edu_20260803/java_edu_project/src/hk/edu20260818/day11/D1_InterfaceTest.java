package hk.edu20260818.day11;

public interface D1_InterfaceTest {

    // 맴버필드 선언 -> 자동으로 상수가 됨
    public int B = 50;
    public static final int A = 30;

    // 추상메서드: 그냥 작성해도 자동 추상메서드가 된다.
    public void test1();

    public abstract int test2();

    public int test3();

    // public int test3_1();//인터페이스에서만 추가하면 하위 클래스들 모두 오류

    // default메서드
    public default void test5() {
        System.out.println("인터페이스에서 기능을 구현할 수 있는 메서드");
    }

}
