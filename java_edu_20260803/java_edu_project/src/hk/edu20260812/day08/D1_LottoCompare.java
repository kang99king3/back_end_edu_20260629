package hk.edu20260812.day08;

// 추첨번호 -> D1_Lotto 객체 생성
// 구매번호 -> D1_LottoStore 객체 생성
public class D1_LottoCompare {

    // 추첨번호
    public D1_Lotto lottoBall;

    // 구매한 번호(사용자 번호)
    public D1_LottoStore userBall;

    public D1_LottoCompare() {
        this.lottoBall = new D1_Lotto();// 기본 숫자6개 생성
        this.userBall = new D1_LottoStore();// 기본 5장
    }

    public D1_LottoCompare(int n) {
        this.lottoBall = new D1_Lotto();
        this.userBall = new D1_LottoStore(n);// n장
    }

    public D1_LottoCompare(int m, int n) {
        this.lottoBall = new D1_Lotto(m);// 숫자 m개
        this.userBall = new D1_LottoStore(n);// n장
    }

    // 당첨번호를 확인하는 메서드 구현(각각의 로또별 당첨번호,당첨개수,등수)
    // [1,2,3,4,5,6] --> [2,3,4,6,7,8]
    // __________________[2,13,24,16,37,18]
}
