package hk.edu20260825.day16;

public class D4_ThreadTest {
    public static void main(String[] args) {
        // "안", "녕" 번갈아 가며 출력하기
        for (int i = 0; i < 5; i++) {
            System.out.println("안");
        }

        for (int i = 0; i < 5; i++) {
            System.out.println("녕");
        }

        System.out.println("==============");

        // 작업단위1
        Thread t1 = new Thread() {// 익명클래스 방식으로..
            @Override
            public void run() {
                for (int i = 0; i < 5; i++) {
                    System.out.println("안");
                    try {
                        Thread.sleep(500);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        };

        // 작업단위2
        Thread t2 = new Thread() {// 익명클래스 방식으로..
            @Override
            public void run() {
                for (int i = 0; i < 5; i++) {
                    System.out.println("녕");
                    try {
                        Thread.sleep(500);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        };

        // Thread의 run()을 실행시켜주는 메서드: start()
        t1.start();// 실행단위 --> 독립적으로 실행
        t2.start();// 실행단위 --> 독립적으로 실행
    }
}
