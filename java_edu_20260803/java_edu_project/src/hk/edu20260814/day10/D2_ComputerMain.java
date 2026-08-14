package hk.edu20260814.day10;

public class D2_ComputerMain {

    public static void main(String[] args) {
        // 추상클래스라 객체 생성 할 수 없다
        // D2_Computer com = new D2_Computer();
        D2_Computer deskTop = new D2_DeskTop();
        deskTop.turnOn();
        deskTop.turnOff();
        deskTop.display();
        deskTop.typing();

        // D2_Computer noteBook = new D2_NoteBook();//(X)
        D2_Computer myNoteBook = new D2_MyNoteBook();
        myNoteBook.turnOn();
        myNoteBook.turnOff();
        myNoteBook.display();
        myNoteBook.typing();
    }
}
