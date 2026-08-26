package hk.edu20260825.day16;

import java.io.BufferedWriter;
import java.io.DataOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;

public class D3_IOTest {

    public static void main(String[] args) {
        // test01();
        // test02();
        // test02_2();
        test03();
    }

    // 파일을 읽고 출력하기
    private static void test01() {
        // InputStream in = null;// 입력 스트림
        // OutputStream out = null;// 출력 스트림

        // try {
        // // FileInputStream("파일경로")
        // in = new FileInputStream(
        // "D:\\back_end_edu_20260629\\back_end_edu_20260629\\java_edu_20260803\\java_edu_project\\src\\hk\\edu20260825\\temp\\test.txt");
        // out = new FileOutputStream(
        // "D:\\back_end_edu_20260629\\back_end_edu_20260629\\java_edu_20260803\\java_edu_project\\src\\hk\\edu20260825\\temp\\test_copy.txt");

        // int i = 0;// byte단위로 읽어서 데이터(실데이터)를 저장하는 변수
        // while ((i = in.read()) != -1) {// 읽어들일 데이터가 없으면 -1리턴
        // System.out.println(i);
        // out.write(i);// 파일 출력(byte단위로)
        // }
        // } catch (FileNotFoundException e) {
        // e.printStackTrace();
        // } catch (IOException e) {
        // e.printStackTrace();
        // } catch (Exception e) {
        // e.printStackTrace();
        // } finally {
        // try {
        // // 마지막에 실행됐던 스트림부터 닫는다
        // if (out != null) {
        // out.close();
        // }
        // if (in != null) {
        // in.close();
        // }
        // } catch (IOException e) {
        // // TODO Auto-generated catch block
        // e.printStackTrace();
        // }
        // }

        // resource 관련 객체들을 편리하게 사용하기위해 추가된 try 문법
        // -> 반드시 닫아줘야하는 작업( close()실행 )이 필요한 객체들에 대해 생략시켜줄 수 있다
        try (
                // FileInputStream("파일경로")
                FileInputStream in = new FileInputStream(
                        "D:\\back_end_edu_20260629\\back_end_edu_20260629\\java_edu_20260803\\java_edu_project\\src\\hk\\edu20260825\\temp\\test.txt");
                FileOutputStream out = new FileOutputStream(
                        "D:\\back_end_edu_20260629\\back_end_edu_20260629\\java_edu_20260803\\java_edu_project\\src\\hk\\edu20260825\\temp\\test_copy.txt");) {

            int i = 0;// byte단위로 읽어서 데이터(실데이터)를 저장하는 변수
            while ((i = in.read()) != -1) {// 읽어들일 데이터가 없으면 -1리턴
                System.out.println(i);
                out.write(i);// 파일 출력(byte단위로)
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // filter: 보조스트림을 이용해서 출력하기
    private static void test02() {
        String s = "파일을 기록합니다.";
        String ss = "파일을 문자단위로 기록합니다.";
        try (
                // data 출력하는 파이프 생성
                OutputStream out = new FileOutputStream(
                        "D:\\back_end_edu_20260629\\back_end_edu_20260629\\java_edu_20260803\\java_edu_project\\src\\hk\\edu20260825\\temp\\test_filter.txt");
                OutputStreamWriter ow = new OutputStreamWriter(out, "utf-8");
                BufferedWriter bw = new BufferedWriter(ow);) {

            // 1단계: 스트림만 사용할 경우
            // out.write(s.getBytes("utf-8")); // 문자열을 byte단위로 쪼개서 처리함

            // 2단계: writer를 사용할 경우
            // - file바이트 출력 스트림 -> 문자기반 출력 필터를 끼우고 실행(알아서 쪼개서 처리함)
            // ow.write(ss);

            // 3단계: 버퍼를 사용할 경우
            // --> 성능향상: 문자하나마다 출력 처리 -> 많은 양의 문자를 모아서 한번에 출력(기본 8kb씩 저장해서 출력)
            bw.write(ss);
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    // filter: 보조스트림사용
    public static void test02_2() {
        String s = "파일을 기록합니다.";
        try (
                OutputStream out = new FileOutputStream(
                        "D:\\back_end_edu_20260629\\back_end_edu_20260629\\java_edu_20260803\\java_edu_project\\src\\hk\\edu20260825\\temp\\test_filter2.txt");
                // filter: 기본 데이터 타입을 이진데이터로 출력(자바프로그램끼리 주고받고 처리할때 사용)
                DataOutputStream ds = new DataOutputStream(out);) {
            // ds.writeUTF(s);// UTF-8형식으로 인코딩된 문자열을 출력한다.
            // ds.writeChars(s);
            // out.write(s.getBytes());
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    // 한번에 읽을 때 크기를 설정해서 읽고 쓰기
    public static void test03() {
        try (
                InputStream in = new FileInputStream(
                        "D:\\back_end_edu_20260629\\back_end_edu_20260629\\java_edu_20260803\\java_edu_project\\src\\hk\\edu20260825\\temp\\test_img.png");
                OutputStream out = new FileOutputStream(
                        "D:\\back_end_edu_20260629\\back_end_edu_20260629\\java_edu_20260803\\java_edu_project\\src\\hk\\edu20260825\\temp\\test_img_copy.png");) {
            // 10byte 단위로 읽기
            byte[] b = new byte[10];
            int i = 0;
            while ((i = in.read(b)) != -1) { // i에 저장되는 값은 읽은 개수
                // out.write(b);// b[11,12,13,14,15,6,7,8,9,10] -> 출력 파일크기 15
                out.write(b, 0, i);// 읽은 개수만큼만 출력 -> 안정적(권장)
            }
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
