package hk.edu20260818.day11;

//D2_Calc 인터페이스를 구현하기
public abstract class D2_Calculator implements D2_Calc {

    // add메서드 구현
    @Override
    public int add(int num1, int num2) {
        return num1 + num2;
    }

    // substract 구현
    @Override
    public int substract(int num1, int num2) {
        return num1 - num2;
    }

    // 나머지 2개 기능은 현재 클래스에서 구현하기 힘든 상황...

    @Override
    public abstract int times(int num1, int num2);

    @Override
    public abstract int divide(int num1, int num2);

    public void showInfoParent() {
        System.out.println("부모클래스에서만 정의한 메서드");
    }

}
