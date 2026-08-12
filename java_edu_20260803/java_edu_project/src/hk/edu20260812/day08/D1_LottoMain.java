package hk.edu20260812.day08;

import java.util.Arrays;

public class D1_LottoMain {
    public static void main(String[] args) {
        D1_Lotto lotto = new D1_Lotto();
        // lotto.makeLotto();
        System.out.println(Arrays.toString(lotto.getLots()));

        // 별도에 클래스를 만들어서.. 로또를 여러장 관리하는 기능 구현
        D1_Lotto[] lottoStore = new D1_Lotto[5];
        D1_Lotto[] lottoStore2 = new D1_Lotto[] {
                new D1_Lotto(), new D1_Lotto(),
                new D1_Lotto(), new D1_Lotto(),
                new D1_Lotto()
        };
        for (int i = 0; i < lottoStore2.length; i++) {
            System.out.println(Arrays.toString(lottoStore2[i].getLots()));
        }

        for (int i = 0; i < lottoStore.length; i++) {
            lottoStore[i] = new D1_Lotto();
        }

        // 추첨번호 67회 생성
        D1_Lotto lot = new D1_Lotto();
        int[] lottoNum = lot.getLots();// 번호6개짜리 배열

        D1_LottoStore store = new D1_LottoStore();
        D1_Lotto[] lottoStoreNum = store.getLottoStore();// 구매한 로또 5장

        // 추첨번호와 구매번호를 비교해서 결과 출력 :
        // 각각 구매번호마다 당첨된 번호와 당첨번호 개수--> 1등,2등
    }
}
