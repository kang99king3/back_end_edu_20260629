package hk.edu20260811.day07;

public class AntQuiz {

    public static void main(String[] args) {
        AntQuiz ant = new AntQuiz();
        // String antVal = ant.antMake("1121");
        // System.out.println(antVal);
        ant.antPrint(15);
    }

    // 파라미터 s에 "11"이라는 문자열이 전달됐을때
    // "12"가 반환되게 한다면?
    // public String antMake(String s) {
    // char c = s.charAt(0);// 처음숫자
    // char d = s.charAt(1);// 다음 숫자부터는 반복해서 다음 숫자 가져오고
    // // 같은 숫자를 세려면
    // int count = 0;// 초기값 0? , 1?,
    // // 숫자가 달라질때 중간 결과를 저장하려면
    // String t = "";// "12"->"11"->"11"+"21"->"1121"
    // // 반복문으로 계속 확인하면서 처리해야 될것 같고 같은지 다른지 비교하면서
    // if (c == d) {
    // // ???
    // count++;
    // t = "" + c + count;
    // }
    // return t;
    // }
    // "11" -> "12" 기능 구현
    public String antMake(String s) {
        char c = s.charAt(0);// 문자열의 0번째 값 가져오기
        int count = 1;// 연속되는 숫자가 최소한 1개는 존재 -> 초기값은 1로 정의
        String t = "";// 중간 결과 저장 및 최종 결과 값

        // 문자열이 같은지 확인
        for (int i = 1; i < s.length(); i++) {
            if (c == s.charAt(i)) {// true라면 "111122"
                count++;
            } else {
                t = t + c + count;// "14"+"21"-> "1421"
                count = 1;// 1로 초기화 -> 다음값을 세야되니깐
                c = s.charAt(i);// 달라지는 값의 위치로 c를 초기화
            }
        }
        t = t + c + count;// 최종결과 마무리 해야 함
        return t;
    }

    public void antPrint(int num) {
        String s = "1";
        for (int i = 0; i < num; i++) {
            s = antMake(s);
            System.out.println(s);
        }
    }
}
