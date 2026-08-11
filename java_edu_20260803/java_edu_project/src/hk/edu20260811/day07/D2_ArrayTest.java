package hk.edu20260811.day07;

import java.util.Arrays;

public class D2_ArrayTest {

    // 맴버필드에 선언
    public int[] test;// 선언
    public int[][] test2;

    public D2_ArrayTest() {
        // test = new int[3];// 정의 {0,0,0}
        // test2 = new int[3][3];// {{0,0,0},{0,0,0},{0,0,0}}
        this(3);
    }

    public D2_ArrayTest(int n) {
        test = new int[n];// 정의 {0,0,0}
        test2 = new int[n][n];// {{0,0,0},{0,0,0},{0,0,0}}
    }

    public D2_ArrayTest(int m, int n) {
        test = new int[m];// 정의 {0,0,0}
        test2 = new int[m][n];// {{0,0,0},{0,0,0},{0,0,0}}
    }

    public static void main(String[] args) {

        // 선언 방법
        // 1.리터럴방식: 기본타입처럼 선언
        int[] a = { 1, 2, 3, 4, 5, 6 };// 바로 선언과 동시에 초기화를 해야 함
        int[] b = null;
        // b={1,2,3,4}; //(X)
        b = a;// 주소복사(얕은 복사)
        b[0] = 10;
        System.out.println(Arrays.toString(a));

        // 2. new를 사용하는 정의
        int[] b2;
        b2 = new int[] { 1, 2, 3, 4, 5 };

        // 선언과 정의(자릿수) -> 자동초기화 지원(int면 0으로 초기화됨)
        int[] b3 = new int[5];
        for (int i = 0; i < b3.length; i++) {
            b3[i] = i + 1;
        }
        // sort(): 사전식, 크기순 정렬 모두 지원
        Arrays.sort(b3);// mutable하기 때문에 원본이 바로 바뀜

        String s = "ss";
        s = s.replace("s", "p");// 다시 대입해야 원본이 바뀜

        // 깊은 복사
        int[] e = new int[5];
        for (int i = 0; i < e.length; i++) {
            e[i] = b3[i];
        }

        // 깊은복사 기능: System.arraycopy() 단, 값의 타입이 기본타입일 경우
        int[] f = new int[5];
        // (원본대상배열, 복사할 시작위치, 복사받을 배열, 시작위치, 복사할 길이)
        System.arraycopy(e, 0, f, 0, e.length);

        // 깊은 복사하는 방법 2가지
        // - arraycopy()
        // - clone() : Object클래스의 메서드 -> 나중에 다시 해보기

        // 2차원배열 선언하기
        int[][] aa = { { 1, 2, 3 }, { 4, 5, 6 } };
        int[][] bb = new int[][] { { 1, 2, 3 }, { 4, 5, 6 } };
        int[][] cc = new int[2][3];
        cc[0] = new int[] { 1, 2, 3 };
        cc[1] = new int[] { 4, 5, 6 };
        // 배열의 길이값
        System.out.println("aa의 배열의 길이:" + aa.length);
        System.out.println("aa의 배열의 내부 배열의 길이:" + aa[0].length);
        for (int i = 0; i < aa.length; i++) {
            for (int j = 0; j < aa[0].length; j++) {
                System.out.print(aa[i][j] + "\t");
            }
            System.out.println();
        }

        // 배열 변환
        // 2차원 배열 --> 1차원 배열 변환
        // 공식: [i*col+j]
        int[] dd = new int[bb.length * bb[0].length];
        // i*col+j= 0*3+0 = 0 , 0*3+1 = 1, 0*3+2 = 2
        // 1*3+0 = 3 , 1*3+1 = 4, 1*3+2 = 5 -> 0,1,2,3,4,5
        for (int i = 0; i < bb.length; i++) {
            for (int j = 0; j < bb[0].length; j++) {
                dd[i * bb[0].length + j] = bb[i][j];
            }
        }
        System.out.println(Arrays.toString(dd));

        // 1차원배열 --> 2차원배열
        // 공식: [i/col][i%col]
        // 0/3 0%3 -> [0][0] [0][1] [0][2]
        int[][] ee = new int[2][3];
        int col = ee[0].length;
        for (int i = 0; i < dd.length; i++) {
            ee[i / col][i % col] = dd[i];
        }
        for (int i = 0; i < ee.length; i++) {
            System.out.println(Arrays.toString(ee[i]));
        }
    }
}
