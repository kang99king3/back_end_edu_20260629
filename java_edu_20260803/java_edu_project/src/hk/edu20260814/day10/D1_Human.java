package hk.edu20260814.day10;

public class D1_Human extends D1_Animal {

    @Override
    public void move() {
        System.out.println("사람은 두발로 걷습니다.");
    }

    public void eat() {
        System.out.println("다 잘먹어요");
    }
}
