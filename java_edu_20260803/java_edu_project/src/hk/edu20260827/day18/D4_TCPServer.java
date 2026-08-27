package hk.edu20260827.day18;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class D4_TCPServer {

    public static void main(String[] args) {

        Socket clientSocket = null;// 클라이언트 소켓
        PrintWriter out = null;// 클라이언트로 출력할때 사용할 객체
        ServerSocket serverScoket = null;// 클라이언트와 연결하는 Socket을 생성
        BufferedReader in = null;// 클라이언트에서 전달된 메시지 읽어들일 객체

        try {
            serverScoket = new ServerSocket(9595);
            System.out.println("Server is running~~~");
            while (true) {
                clientSocket = serverScoket.accept();
                System.out.println("클라이언트 연결됨:"
                        + clientSocket.getInetAddress().getHostName());

                out = new PrintWriter(clientSocket.getOutputStream(), true);

                in = new BufferedReader(
                        new InputStreamReader(clientSocket.getInputStream()));

                String inputLine;
                while ((inputLine = in.readLine()) != null) {
                    System.out.println("클라이언트로부터 전달받은 메시지:" + inputLine);
                    // 클라이언트에서 출력될 메시지
                    out.println("보낸 메시지:" + inputLine);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
                if (in != null) {
                    in.close();
                }
                if (clientSocket != null) {
                    clientSocket.close();
                }
                if (serverScoket != null) {
                    serverScoket.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }
}
