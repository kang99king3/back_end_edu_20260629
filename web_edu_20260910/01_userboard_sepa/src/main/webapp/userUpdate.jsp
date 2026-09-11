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
	//파라미터 받기
	String userId=request.getParameter("userid");
	String addr=request.getParameter("addr");
	String mobile1=request.getParameter("mobile1");
	String mobile2=request.getParameter("mobile2");
	String pheight=request.getParameter("height");
	int height = Integer.parseInt(pheight);//String -> int로 형변환
	
	UserDao dao = new UserDao();
	boolean isS=dao.updateUser(new UserDto(userId,addr,mobile1,mobile2,height));

	if(isS){
		response.sendRedirect("index.jsp");
	}
%>
</body>
</html>





