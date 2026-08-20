package hk.edu20260820.day13;

//Card클래스 -> 카드 한장을 의미
public class D2_Card {

    // 카드를 만들기 위해 필요한 값들 정의
    public static final String[] DECK = { "◆", "♠", "♥", "♣" };
    public static final String[] STECK = { "A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K" };

    // 카드 한장을 저장할 필드 정의: "그림+숫자"
    private String card;// "◆2"

    public D2_Card() {

    }

    // 카드 한장을 만드는 기능: 카드 한장을 랜덤하게 생성해서 card필드에 저장하기
    public void init() {

    }
}
