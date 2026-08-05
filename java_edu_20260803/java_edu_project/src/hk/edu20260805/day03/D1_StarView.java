package hk.edu20260805.day03;

public class D1_StarView {

    public static void main(String[] args) {
        // i ★
        // i ★★
        // i ★★★
        // i ★★★★
        // i ★★★★★
        // a1+(n-1)*d -> a0+n*d -> 1+i*1 -> 1+i
        int num = 5;
        for (int i = 0; i < num; i++) {
            for (int j = 0; j < 1 + i; j++) {
                System.out.print("★ ");
            }
            System.out.println();
        }
        System.out.println("======================");
        // i ☆☆☆☆★
        // i ☆☆☆★★
        // i ☆☆★★★
        // i ☆★★★★
        // i ★★★★★
        // 공백출력: 4 3 2 1 0 , 시작값은 4, 공차는 -1 -> 4+i*-1 = 4-i
        // 별출력: 1 2 3 4 5
        for (int i = 0; i < num; i++) {
            for (int j = 0; j < 4 - i; j++) {// 공백용
                System.out.print("  ");
            }
            for (int j = 0; j < 1 + i; j++) {// 별출력용
                System.out.print("★ ");
            }
            System.out.println();
        }
        System.out.println("======================");
        // i ☆☆☆☆★
        // i ☆☆☆★★★
        // i ☆☆★★★★★
        // i ☆★★★★★★★
        // i ★★★★★★★★★
        // 별 출력: 1 3 5 7 9.. a0+n*d -> 1+i*2
        for (int i = 0; i < num; i++) {
            for (int j = 0; j < 4 - i; j++) {
                System.out.print("  ");
            }
            for (int j = 0; j < 1 + i * 2; j++) {
                System.out.print("★ ");
            }
            System.out.println();
        }
        System.out.println("==================");

        // ★★★★★★★★★
        // ☆★★★★★★★
        // ☆☆★★★★★
        // ☆☆☆★★★
        // ☆☆☆☆★
        // 9 7 5 3 1 -> 9+i*-2 -> 9-i*2
        // 0 1 2 3 4 -> 0+i*1 -> i
        for (int i = 0; i < num; i++) {
            for (int j = 0; j < i; j++) {
                System.out.print("  ");
            }
            for (int j = 0; j < (num * 2 - 1) - i * 2; j++) {
                System.out.print("★ ");
            }
            System.out.println();
        }
    }
}
