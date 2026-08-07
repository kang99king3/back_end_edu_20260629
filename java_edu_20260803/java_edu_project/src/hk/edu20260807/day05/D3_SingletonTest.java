package hk.edu20260807.day05;

public class D3_SingletonTest {

    // static을 붙인 이유? getInstance메서드가 static이라서..
    private static D3_SingletonTest st;

    private D3_SingletonTest() {// 외부에서 접근 못함--> new를 못함
    }

    public static D3_SingletonTest getInstance() {
        if (st == null) {// 객체가 생성되지 않았을때만 생성하자
            st = new D3_SingletonTest();
        }
        return st;
    }

}
