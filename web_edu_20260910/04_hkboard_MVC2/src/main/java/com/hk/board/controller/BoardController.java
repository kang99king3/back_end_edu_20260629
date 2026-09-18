package com.hk.board.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("*.board")
public class BoardController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		//요청 주소를 통해 요청내용을 확인하기
		// 그 전에는 command값을 통해 요청을 구별
		// 클라이언트에서 boardlist.board 요청 --> "boardlist.board"
		// 요청 주소를 구해야함 --> request.getRequestURI()
		// command.equals("boardlist.board") 비교하는건 동일
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doGet(request, response);
	}

}
