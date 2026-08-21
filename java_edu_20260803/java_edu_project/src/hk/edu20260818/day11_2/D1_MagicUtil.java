package hk.edu20260818.day11_2;

public class D1_MagicUtil {

    // 템플릿 메서드 정의
    public static void magicRun(D3_IMagic magic) {
        magic.make();
        magic.magicPrint();
    }
}
