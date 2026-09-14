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
	//UserDto 생성자 이용해서 값을 초기화하면 매우 편하다
	boolean isS=dao.updateUser(new UserDto(userId,addr,mobile1,mobile2,height));

	if(isS){
		//response객체(HttpServletResponse)
        //response.sendRedirect("index.jsp");
		//javascript 코드도 작성 가능함
		//-> html과 java를 같이 사용할 수 있기 때문에
		%>
		<script type="text/javascript">
			alert("회원정보를 수정했습니다.!!");
// 			location.href="index.jsp";
			location.href="userDetail.jsp?userid=<%=userId%>";
		</script>
		<%
	}else{
		response.sendRedirect("error.jsp");
	}
%>
</body>
</html>





