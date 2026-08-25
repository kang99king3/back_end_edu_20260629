package hk.edu20260825.day16;

public class D1_LambdaTest {

    public static void main(String[] args) {
        // 익명클래스방식
        D1_ILambda lam = new D1_ILambda() {
            @Override
            public int add(int a, int b) {
                return a + b;
            }
        };
        System.out.println(lam.add(10, 20));

        // 람다식으로 구현: 코드를 간결하게 정의한다.
        D1_ILambda lamFunc1 = (a, b) -> {
            return a + b;
        };
        D1_ILambda lamFunc2 = (a, b) -> a + b;// 중괄호,return 생략
        D1_ILambda lamFunc3 = (a, b) -> { // 여러줄의코드가 들어가면 생략X
            System.out.println(a + ":" + b);
            return a + b;
        };
        lamFunc3.add(10, 15);
    }
}
