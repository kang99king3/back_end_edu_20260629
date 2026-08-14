package hk.edu20260814.day10;

public class D3_MagicSquareMain {

    public static void main(String[] args) {
        D3_OddMagicSquare odd = new D3_OddMagicSquare(3);
        odd.make();

        int[][] magic = odd.magic;
        for (int i = 0; i < magic.length; i++) {
            for (int j = 0; j < magic.length; j++) {
                System.out.print(magic[i][j] + "\t");
            }
            System.out.print(odd.sumCol(i));
            System.out.println();
        }
        for (int i = 0; i < magic.length; i++) {
            System.out.print(odd.sumRow(i) + "\t");
        }
    }
}
