package hk.edu20260818.day11;

//나머지 2개 기능을 모두 구현하기
public class D2_CalculatorChild extends D2_Calculator {

    @Override
    public int times(int num1, int num2) {
        return num1 * num2;
    }

    @Override
    public int divide(int num1, int num2) {
        // 어떤 수를 0으로 나누면 에러가 발생
        if (num2 != 0) {
            return num1 / num2;
        } else {
            return D2_Calc.ERROR;
        }
    }

    public void showInfoChild() {
        System.out.println("자식클래스에서만 정의한 메서드");
    }

}
