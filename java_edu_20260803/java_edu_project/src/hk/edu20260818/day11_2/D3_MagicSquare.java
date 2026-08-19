package hk.edu20260818.day11_2;

import java.util.Arrays;

public abstract class D3_MagicSquare implements D3_IMagic {

    // 부모에서 공통필드로 사용:현재 클래스의 하위 클래스들은 모두 접근가능
    protected int[][] magic;

    public D3_MagicSquare() {

    }

    public D3_MagicSquare(int n) {
        this.magic = new int[n][n];
    }

    // 부모에서는 make를 구현 못함: 하위클래스 상황에 따라 코드가 다르기 때문
    @Override
    public abstract void make();// 추상메서드

    // 마방진 증명 확인 코드 작성하기
    // 가로의 합 구하는 기능
    // [0][0], [0][1], [0][2]
    public int sumCol(int i) {
        int tot = 0;
        for (int j = 0; j < magic.length; j++) {
            tot += magic[i][j];
        }
        return tot;
    }

    // 세로의 합 구하는 기능
    public int sumRow(int j) {
        int tot = 0;
        for (int i = 0; i < magic.length; i++) {
            tot += magic[i][j];
        }
        return tot;
    }

    // 대각선의 합(왼쪽-> 오른쪽 으로 내려가는 대각선)
    public int sumDia() {
        int tot = 0;
        for (int i = 0; i < magic.length; i++) {
            tot += magic[i][i];
        }
        return tot;
    }

    // 대각선의 합(오른쪽 -> 왼쪽으로 내려가는 대각선)
    public int sumReverseDia() {
        int tot = 0;
        for (int i = 0; i < magic.length; i++) {
            tot += magic[i][magic.length - 1 - i];
        }
        return tot;
    }

    // 각각의 합을 구해서 같은지 확인하는 메서드 구현
    public boolean isCheck() {
        boolean isC = true;
        // 기준은 3X3마방진
        // 합을 구하는 메서드 4개의 결과를 구함-> 가로세로 6개, 대각선 2개
        // 3*2+2= 8, 4*2+2= 10 ....
        int n = magic.length;
        int[] ma = new int[n * 2 + 2];// 배열의 길이 정의(가변적)

        // 각각의 결과를 배열 ma에 저장
        // ma{15,15,15,15,15,15,0,0}
        for (int i = 0; i < n; i++) {
            ma[i] = sumCol(i);// ma[0], ma[1], ma[2] 결과저장
            ma[i + n] = sumRow(i);// ma[3],ma[4],ma[5]
        }
        // ma{15,15,15,15,15,15,15,15} 모든 결과를 담을 수 있다.
        ma[n * 2] = sumDia();// ma[6]
        ma[n * 2 + 1] = sumReverseDia();// ma[7]

        System.out.println("ma결과:" + Arrays.toString(ma));

        // ma 배열에 다른 값이 있는지 확인하기
        // 다른값 하나만 찾아내면 됨
        for (int i = 1; i < ma.length; i++) {
            if (ma[0] != ma[i]) {// 0번째 값 하나와 나머지 값 비교
                isC = false;
                break;
            }
        }

        return isC;
    }

    // 마방진 출력하기
    @Override
    public void magicPrint() {

        for (int i = 0; i < magic.length; i++) {
            for (int j = 0; j < magic.length; j++) {
                System.out.print(magic[i][j] + "\t");
            }
            System.out.print(sumCol(i));
            System.out.println();
        }
        for (int i = 0; i < magic.length; i++) {
            System.out.print(sumRow(i) + "\t");
        }
        // 마방진 증명 확인하기
        System.out.println();
        System.out.println("마방진 증명여부:" + isCheck());

    }

}
