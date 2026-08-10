package hk.edu20260810.day06;

public class D1_CalculatorMain {

    public static void main(String[] args) {
        int num1 = 50;
        int num2 = 20;
        String cal = "*";

        D1_CalculatorCompare calcu = new D1_CalculatorCompare();
        calcu.calculator(num1, num2, cal);
        System.out.printf("%d와%d의 %s 계산 결과는 %d\n", num1, num2, cal, calcu.getResult());
    }
}
