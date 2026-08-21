package hk.edu20260821.day14;

import hk.edu20260814.day10.D3_OddMagicSquare;

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
        int n = magic.length;//
        for (int i = 0; i < n / 2; i++) {
            for (int j = 0; j < n / 4; j++) {
                if (i == n / 4) {
                    magic[i][j + 1] = 3;
                } else {
                    magic[i][j] = 3;
                }
            }
        }
    }

    // B영역
    // 개념: 2로 채우다가 마지막 열에만 1로 채운다.
    // 먼저 1로 모두 채우고 그리고 해당 범위만큼 2로 채우자
    private void makeB() {
        int n = magic.length;
        // 1을 먼저 채우자
        for (int i = 0; i < n / 2; i++) {
            for (int j = 0; j < n / 2; j++) {
                magic[i][j + n / 2] = 1;
            }
        }
        // 2를 채우자
        for (int i = 0; i < n / 2; i++) {
            for (int j = 0; j < n / 2 - (n / 4 - 1); j++) {
                magic[i][j + n / 2] = 2;
            }
        }
    }

    // A,B영역의 값들을 C,D영역에 반전시켜서 넣어주세요
    private void makeCD() {
        int n = magic.length;
        for (int i = 0; i < n / 2; i++) {
            for (int j = 0; j < n / 2; j++) {
                // A영역 -> C영역에 값 추가
                if (magic[i][j] == 3) {// A영역의 값 확인
                    magic[i + n / 2][j] = 0;// C영역에 값 넣기
                } else {
                    magic[i + n / 2][j] = 3;// C영역에 값 넣기
                }
                // B영역 -> D영역에 값 추가
                if (magic[i][j + n / 2] == 1) {// B영역의 값 확인
                    magic[i + n / 2][j + n / 2] = 2;// D영역에 값 넣기
                } else {
                    magic[i + n / 2][j + n / 2] = 1;// D영역에 값 넣기
                }
            }
        }
    }

    // 각 자리에 값에, (n/2)*(n/2)계산 결과를 각각 곱한다.
    private void multi() {
        int n = magic.length;
        int m = (n / 2) * (n / 2);

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                // magic[i][j]=magic[i][j]*m;
                magic[i][j] *= m;
            }
        }
    }

    // 각각의 영역에 대해 홀수 마방진의 값을 더하자
    // 4개의 영역 --> 10마방진의 경우 5홀수마방진을 더해야 된다.
    // 홀수마방진 다시 구현할 필요 없음 --> OddMagicsquare구현했음
    private void makeAdd() {
        int n = magic.length;
        // 홀수 마방진 구하기
        D3_OddMagicSquare odd = new D3_OddMagicSquare(n / 2);
        odd.make();
        int[][] oddMagic = odd.magic;// 생성된 홀수 마방진 가져오기
        // 구해온 홀수 마방진을 10마방진에 각각 더하기

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
