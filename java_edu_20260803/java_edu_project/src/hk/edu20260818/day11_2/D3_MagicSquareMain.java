package hk.edu20260818.day11_2;

public class D3_MagicSquareMain {

    public static void main(String[] args) {
        D3_OddMagicSquare odd = new D3_OddMagicSquare(11);
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
        // 마방진 증명 확인하기
        System.out.println();
        System.out.println("마방진 증명여부:" + odd.isCheck());

    }
}
