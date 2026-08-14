package hk.edu20260814.day10;

public class D1_AnimalMain {

    public static void main(String[] args) {
        // 부모의 타입으로 자식을 생성
        D1_Animal human = new D1_Human();
        human.move();// 자식에서 구현한 메서드가 실행(오버라이딩)
        // human.eat();// 설계도에 공개된 메서드만 사용가능

        // 자식에서 단독으로구현한 메서드를 사용하려면 자식타입으로 형변환해야 된다.
        D1_Human humanEat = (D1_Human) human;
        humanEat.eat();// 자식에서 단독으로 구현한 메서드
        humanEat.move();// 오버라이딩한 메서드

        System.out.println("=========================");
        // 다형성 발생원리 3가지
        // 1.부모의 타입으로 자식을 생성한다.
        D1_Animal animalH = new D1_Human();
        D1_Animal animalT = new D1_Tiger();
        D1_Animal animalE = new D1_Eagle();

        // 2.부모의 타입으로 자식을 참조한다.
        D1_Tiger tiger = new D1_Tiger();
        D1_Animal animalTT = tiger;
    }
}
