package hk.edu20260814.day10;

import java.util.Arrays;

public class D3_OddMagicSquare {

    public int[][] magic;

    public D3_OddMagicSquare() {
        this.magic = new int[3][3];
    }

    public D3_OddMagicSquare(int n) {
        this.magic = new int[n][n];
    }

    public void make() {
        int n = magic.length;
        int x = 0;
        int y = n / 2;// y의 중간 값을 구할 수 있다.
        magic[x][y] = 1;// 3X3마방진일 경우 (0,1) 위치에 1을 넣고 시작

        for (int i = 2; i <= n * n; i++) {

            // 값 변경전에 원본값을 저장
            int tempX = x;
            int tempY = y;

            if (x - 1 < 0) {// x-1했을때 음수이면
                x = n - 1;// x인덱스의 최대값으로 이동
            } else {
                x--;
            }

            if (y - 1 < 0) {// x-1했을때 음수이면
                y = n - 1;// x인덱스의 최대값으로 이동
            } else {
                y--;
            }

            if (magic[x][y] != 0) {// 이동한 위치에 값이 존재한다면
                // 원래 위치로 이동해서 x+1
                x = tempX + 1;
                y = tempY;
            }

            magic[x][y] = i;
        }
    }

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

}
