package hk.edu20260806.day04;

public class D2_ClassTestMain {

    public static void main(String[] args) {
        // 참조타입 ______객체명________ 생성자
        D2_ClassTest classTest = new D2_ClassTest();// Heap 메모리에 생성
        classTest.methodTest();// 객체명.메서드로 호출 -> 인스턴스 메서드
        classTest.number = 20;// 객체명.맴버필드로 호출 -> 인스턴스 변수

        D2_ClassTest.stMethodTest();// 클래스명.메서드로 호출 -> 정적 메서드

        // 객체 생성을 또 할 수 있다.
        D2_ClassTest classTest2 = new D2_ClassTest(30);
        classTest2.number = 40;

        // 인스턴스변수는 각각의 해당 객체에서 관리됨
        System.out.println("classTest.number:" + classTest.number);
        System.out.println("classTest2.number:" + classTest2.number);

        // 클래스 변수(static으로 선언된 맴버필드): 각각의 객체들이 공유하고 있음
        D2_ClassTest.staticNumber = 50;
        System.out.println(classTest.staticNumber + ":" +
                classTest2.staticNumber);
    }
}
