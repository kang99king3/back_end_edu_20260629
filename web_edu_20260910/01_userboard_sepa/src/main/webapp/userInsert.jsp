<%@page import="java.sql.Connection"%>
<%@page import="com.hk.board.dto.UserDto"%>
<%@page import="com.hk.board.dao.UserDao"%>
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
	//파라미터 받기: 전송되는 값들이 모두 텍스트이다(문자열)
	String userId=request.getParameter("userid");
	String name=request.getParameter("name");
	String addr=request.getParameter("addr");
	
	//파라미터는 문자열로 전송되기 때문에 int형으로 변환해야 함
	String pbirthYear=request.getParameter("birthyear");
	int birthYear=Integer.parseInt(pbirthYear);
	
	String mobile1=request.getParameter("mobile1");
	String mobile2=request.getParameter("mobile2");
	
	//파라미터는 문자열로 전송되기 때문에 int형으로 변환해야 함
	String pheight=request.getParameter("height");
	int height = Integer.parseInt(pheight);
	//dao 생성
	UserDao dao = new UserDao();
	//메서드 실행
	boolean isS = dao.insertUser(new UserDto(userId, name, birthYear,addr
			                                ,mobile1, mobile2, height,null));
	//페이지 이동
	if(isS){
		response.sendRedirect("userList.jsp");
	}else{
		response.sendRedirect("error.jsp");
	}
%>
</body>
</html>



