package hk.edu20260818.day11_2;

public class D3_MagicSquareMain {

    // IMagic : make(), magicPrint()
    // MagicSquare : make()만 추상메서드
    // OddMagicSquare : make() 구현

    public static void main(String[] args) {
        // D3_OddMagicSquare odd = new D3_OddMagicSquare(11);
        // odd.make();
        // odd.magicPrint();
        // D3_IMagic odd = new D3_OddMagicSquare(9);
        // odd.make();
        // odd.magicPrint();

        // D3_IMagic even = new D2_EvenMagicSquare(8);
        // even.make();
        // even.magicPrint();

        // 메서드를 통해 객체 얻어옴: new X
        D2_MagicFactory fac = D2_MagicFactory.getInstance();
        D3_IMagic magic = fac.factory();
        if (magic == null) {
            System.out.println("다시입력하세요");
        } else {
            // 템플릿 메서드로 구현 따로 클래스에 정의해서 실행
            // magic.make();
            // magic.magicPrint();
            D1_MagicUtil.magicRun(magic);
        }

    }

}
