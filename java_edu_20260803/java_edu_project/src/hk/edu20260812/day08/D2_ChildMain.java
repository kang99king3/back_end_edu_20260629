package hk.edu20260812.day08;

public class D2_ChildMain {

    public static void main(String[] args) {
        D2_Child child = new D2_Child();// 자식의 타입으로 자식을 생성
        child.childMethod();// 자식클래스에서 구현한 메서드호출

        D2_Parent child2 = new D2_Child();// 부모의 타입으로 자식을 생성
        // child2.childMethod();//(X)
        child2.parentMethod();// 오버라이딩한 메서드(자식에서 구현한 메서드가 실행됨)
        D2_Child child3 = (D2_Child) child2;// 큰타입을 작은타입으로 변환
        child3.childMethod();
    }
}
