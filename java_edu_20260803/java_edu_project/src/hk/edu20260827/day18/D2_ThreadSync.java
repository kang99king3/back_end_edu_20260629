package hk.edu20260827.day18;

public class D2_ThreadSync {

    // Stringbuffer, Stringbuilder 를 공유하는 스레드 테스트하기
    public static StringBuilder sb = new StringBuilder();
    public static StringBuffer sf = new StringBuffer();

    public void sbTest(String s) {
        for (int i = 0; i < 1000; i++) {
            sb.append(s);// "AAAAAAAAAAAAAAAAAAAAAA.." 문자열길이: 1000
        }
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        // 문자열의 길이 출력해서 1000인지 확인해보려고..
        System.out.println(sb.length());
    }

    public static void main(String[] args) {

        // 공유객체 생성
        ShareObject so = new D2_ThreadSync().new ShareObject();

        // A와 B 스레드가 동시적으로 하나의 객체에 접근하는 상황
        // 동기화 설정하기: A스레드가 작업이 종료되면 B스레드가 실행한다.
        // 설정하는 방법 2가지: synchronized메서드, synchronized블럭
        Thread trA = new Thread() {
            @Override
            public void run() {
                synchronized (so) {
                    so.print("공");
                }
            }
        };

        Thread trB = new Thread() {
            @Override
            public void run() {
                synchronized (so) {
                    so.print("유");
                }
            }
        };
        // trA.start();
        // trB.start();

        // ================================
        // 스레드 2개를 위에서 작성한것처럼 정의해서
        // sbTest() 실행해보기

    }// main 종료

    // 내부클래스
    class ShareObject {
        public void print(String title) {
            // public synchronized void print(String title) {
            for (int i = 0; i < 10; i++) {
                System.out.println(title);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
