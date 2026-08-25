package hk.edu20260825.day16;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

public class D2_StreamTest {

    public static void main(String[] args) {
        // List객체 -> Stream 객체 생성 -> 중간연산 -> 최종연산

        // asList()->값을 한꺼번에 정의할때 편리함(단, 길이는 고정됨)
        List<String> list = Arrays.asList("김태경", "김상원", "임종서");
        // 기존 list와 조금 다름: add(),remove()사용 X -> 수정가능 set()
        // list.set(2,"aaa");//기존 내용을 수정하는 건 가능

        Stream<String> streamList = list.stream();// Stream객체 생성
        streamList.filter(s -> s.contains("김")).sorted()
                .forEach(s -> System.out.println(s));

        // Stream객체는 한번 사용하면 끝남-> 다시 못씀
        // -> 데이터를 연결하는 파이프 개념이라 한번 소비하면 종료
        // streamList.filter(s -> s.startsWith("임"))
        // .forEach(s -> System.out.println(s));

        // 그래서 list를 계속 사용하는 경우라면 Stream객체를 바로 생성해서 사용
        list.stream().filter(s -> s.startsWith("임"))
                // .forEach(s -> System.out.println(s));
                .forEach(System.out::println);
        // 람다식이 단순히 기존 메서드에 값을 전달하기만 한다면
        // --> "메서드 참조 문법"이라고 함

        // 람다식을 사용하지 않고 구현한다면?
        List<String> list2 = new ArrayList<>();
        for (String s : list) {
            if (s.contains("김")) {
                list2.add(s);
            }
        }
        Collections.sort(list2);// 정렬
        for (String s : list2) {
            System.out.println(s);
        }

    }
}
