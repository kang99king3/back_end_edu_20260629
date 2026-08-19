package hk.edu20260818.day11_2;

public class D3_MagicSquareMain {

    // IMagic : make(), magicPrint()
    // MagicSquare : make()만 추상메서드
    // OddMagicSquare : make() 구현

    public static void main(String[] args) {
        // D3_OddMagicSquare odd = new D3_OddMagicSquare(11);
        // odd.make();
        // odd.magicPrint();
        D3_IMagic odd = new D3_OddMagicSquare(9);
        odd.make();
        odd.magicPrint();
    }
}
