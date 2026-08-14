package hk.edu20260814.day10;

public abstract class D2_NoteBook extends D2_Computer {

    @Override
    public void display() {
        System.out.println("NoteBook display 기능입니다.");
    }

    // notebook마다 키보드 유형이 다르기때문에 여기서 명확하게 구현할 수 없다.
    @Override
    public abstract void typing();
}
