package hk.edu20260810.day06;

public class D2_StringMethodTest {

    // String 주요 메서드 연습
    // 1. 문자 하나를 반환
    // "문자열에서 문자 하나를 인덱스로 추출하는 기능"-> "".charAt(6) ->'문'
    // charAt(index)
    public String sTest01(String s, int idx) {
        char c = s.charAt(idx);// char타입의 값 표현 -> ''
        String ss = c + "";// 문자열로 변환
        String ss2 = String.valueOf(c);// 문자열로 변환

        // 예시) 숫자형태의 문자열->숫자형태
        int i = Integer.parseInt("100");// "100"-> 100(정수변환)
        return ss;
    }

    // 2.문자열에서 검색하려는 단어의 인덱스를 반환하는 기능: indexOf()
    // "ABCD" -> "BC" 검색 -> "ABCD".indexOf("BC")
    // 반환값은? 해당 단어의 첫번째 인덱스를 반환
    // 종류: indexOf(), lastIndexOf() --> 차이점: 앞에서부터, 뒤에서부터 검색방향
    // 01234-> <-43210 (X), 01234 <-
    // indexOf("A") --> "ABCACB" --> 0 반환하고 종료
    public void sTest2(String s) {// "ABCDEF"
        int s1 = s.indexOf("AB");
        int s2 = s.indexOf("C", 2);// 검색 시작 인덱스 지정
        int s3 = s.indexOf("DE", 2, 5);// 시작인덱스와 종료 인덱스로 범위 지정해서 검색
        int s4 = s.lastIndexOf("F");

        System.out.printf("%d,%d,%d,%d\n", s1, s2, s3, s4);

        // 해당 단어가 존재하는지 확인하는 용도로도 많이 사용된다.(없으면 -1반환)
        if (s.indexOf("A") != -1) {
            System.out.println("A가 존재합니다.");
        }
    }

    // 3.문자열의 길이 반환: length()

    // 4.문자열의 내용 변환: replace("원본","새로운 내용")
    public void sTest04() {
        String s = "자바프로그래밍자바웹개발자,자바스크립트";
        s.replace("자바", "java");// 원본(s)의 내용이 바뀌지 않는다(immutable)
        s = s.replace("자바", "java");// 다시 대입해야 변경된다.
        System.out.println(s);
    }

    // 5.문자열을 추출하기: substring()
    // substring(idx) , substring(sIdx,eIdx)

    // 예제:
    // 문자열에서 해당 검색어가 존재하는지 판단하여 존재한다면 해당 검색어를 추출하여
    // 출력하고, "###"으로 변경하여 처리하고, 계속 검색어가 존재하는지 확인하여
    // 앞에 작업을 진행한다.
    //
    // 1.해당 검색어가 존재하는 여부 판단해보기,해당검색어가 없으면 "검색어가 존재하지 않습니다."출력
    // 2.해당 검색어의 인덱스를 구해보기: 검색어 인덱스 출력하기
    // 3.해당 검색어를 추출해서 출력해보기: substring()을 사용해서 추출한뒤 출력하기
    // 4.해당 검색어의 검색된 개수 출력하기[indexOf("검색어",검색시작인덱스)]
    // 5.해당 검색어를 문자열에서 ###으로 바꿔주기: replace()사용해서 일괄 처리

    // 파라미터 -> str="KB증권"
    public void search(String str) {
        String s = "KB증권은 10일 삼성전자에 대해 \"연간 주주환원 규모가 KB증권최대 200조원에 달할 것\"이라며 \"확신의 매수 구간\"이라고 판단했다. 목표주가는 60만원을 유지했다.\r\n"
                + //
                "\r\n" + //
                "김동원 KB증권 리서치본부장은 \"조만간 발표될 것으로 예상되는KB증권 연간 " +
                "주주환원 규모는 최소 100조원에서 최대 200조원으로 추정된다\"며 \"기존(9조8000억원)보다 10배 이상 커질 KB증권 것으로 전망된다\"고 강조했다.";
    }
}
