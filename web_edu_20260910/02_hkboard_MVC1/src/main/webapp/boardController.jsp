<%@page import="com.hk.board.dto.HkDto"%>
<%@page import="java.util.List"%>
<%@page import="com.hk.board.dao.HkDao"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<%
	//1단계:command값 받기 -> 어떤 요청인지 확인하기 위한 값을 받는다
	String command=request.getParameter("command");
	
	//2단계: DAO 객체 생성
	HkDao dao=new HkDao();
	
	//3단계: 요청분기(요청확인하기)
	if(command.equalsIgnoreCase("boardlist")){//글목록요청확인
		//4단계: 파라미터 받기 생략
		//5단계:dao메서드 실행
		List<HkDto>list=dao.getAllList();
		//6단계:Scope객체에 담기
		request.setAttribute("list", list);
// 		response.sendRedirect("boardlist.jsp");// 객체 전달 못함 (X)
		//7단계: 페이지 이동
		pageContext.forward("boardlist.jsp");
	}else if(command.equalsIgnoreCase("boardinsertform")){
		//글쓰기 폼으로 이동 요청
	}else if(command.equalsIgnoreCase("boardinsert")){
		//글추가 요청
	}
	
	
%>
</body>
</html>







