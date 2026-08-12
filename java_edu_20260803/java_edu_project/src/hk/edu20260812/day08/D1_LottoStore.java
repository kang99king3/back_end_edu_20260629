package hk.edu20260812.day08;

public class D1_LottoStore {

    // lottoStore[Lotto,Lotto,Lotto,Lotto,Lotto...]
    private D1_Lotto[] lottoStore;

    public D1_LottoStore() {
        this(5);
    }

    public D1_LottoStore(int n) {
        this.lottoStore = new D1_Lotto[n];
        makeLotto();
    }

    public void makeLotto() {
        for (int i = 0; i < lottoStore.length; i++) {
            this.lottoStore[i] = new D1_Lotto();
        }
    }

    public D1_Lotto[] getLottoStore() {
        return lottoStore;
    }
}
