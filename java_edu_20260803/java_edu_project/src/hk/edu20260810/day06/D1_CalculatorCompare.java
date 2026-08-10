package hk.edu20260810.day06;

public class D1_CalculatorCompare {

    // 은닉화(캡슐화)
    private int result;// 연산결과

    public int getResult() {
        return result;
    }

    // 연산할 때 필요한 값: 연산할 숫자 2개, 연산자: "+, -, /, *"
    public void calculator(int num1, int num2, String cal) {
        // 분기형대로 실행 -> if문 ~ else
        // 문자열 비교는 equals()를 사용하자
        if (cal.equals("+")) {
            D1_CalculatorA calA = new D1_CalculatorA(num1, num2);
            // calA.num1 = num1;//초기화 코드 중복 사용하는 문제점..
            // calA.num2 = num2;//생성자를 통해 초기화 작업하는 이유
            calA.a();// 덧셈연산 실행 --> result 맴버필드에 저장
            this.result = calA.getResult();// 은닉화: getter메서드통해 결과 가져오기
        } else if (cal.equals("-")) {
            D1_CalculatorB calB = new D1_CalculatorB(num1, num2);
            calB.a();
            this.result = calB.getResult();
        } else if (cal.equals("/")) {
            D1_CalculatorC calC = new D1_CalculatorC(num1, num2);
            calC.a();
            this.result = calC.getResult();
        } else if (cal.equals("*")) {
            D1_CalculatorD calD = new D1_CalculatorD(num1, num2);
            calD.a();
            this.result = calD.getResult();
        } else {
            System.out.println("입력된 연산자는 지원하지 않습니다.!");
        }
    }
}
