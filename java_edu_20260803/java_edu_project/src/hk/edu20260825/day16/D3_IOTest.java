package hk.edu20260825.day16;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class D3_IOTest {

    public static void main(String[] args) {
        test01();
    }

    // 파일을 읽고 출력하기
    private static void test01() {
        InputStream in = null;// 입력 스트림
        OutputStream out = null;// 출력 스트림

        try {
            // FileInputStream("파일경로")
            in = new FileInputStream(
                    "D:\\back_end_edu_20260629\\back_end_edu_20260629\\java_edu_20260803\\java_edu_project\\src\\hk\\edu20260825\\temp\\test.txt");
            out = new FileOutputStream(
                    "D:\\back_end_edu_20260629\\back_end_edu_20260629\\java_edu_20260803\\java_edu_project\\src\\hk\\edu20260825\\temp\\test_copy.txt");

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
        } finally {
            try {
                // 마지막에 실행됐던 스트림부터 닫는다
                if (out != null) {
                    out.close();
                }
                if (in != null) {
                    in.close();
                }
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }
}
