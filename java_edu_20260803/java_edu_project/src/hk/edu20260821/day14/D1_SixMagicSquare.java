package hk.edu20260821.day14;

public class D1_SixMagicSquare {

    private int[][] magic;

    public D1_SixMagicSquare() {
        this(6);
    }

    public D1_SixMagicSquare(int n) {
        this.magic = new int[n][n];
    }

    public void make() {
        makeA();
        makeB();
        makeCD();
        multi();
        makeAdd();
    }

    // A영역구현하기
    // n : 배열의 길이
    // j인덱스의 n/4이 되는 영역을 3으로 채우는 기능
    // i인덱스의 n/4이 되는 위치에서 j+1을 해서 3을 채우자
    private void makeA() {
        int n = magic.length;
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 2; j++) {
                magic[i][j] = 3;
            }
        }
    }

    private void makeB() {

    }

    private void makeCD() {

    }

    private void makeAdd() {

    }

    private void multi() {

    }

    public static void main(String[] args) {
        D1_SixMagicSquare six = new D1_SixMagicSquare(10);
        six.make();
        for (int i = 0; i < six.magic.length; i++) {
            for (int j = 0; j < six.magic.length; j++) {
                System.out.print(six.magic[i][j] + "\t");
            }
            System.out.println();
        }
    }
}
