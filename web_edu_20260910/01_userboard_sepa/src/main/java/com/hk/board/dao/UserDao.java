package com.hk.board.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.hk.board.dto.UserDto;

//DAO객체: 데이터베이스에 접근해서 CRUD작업하는 객체
// --> JDBC를 구현함: 6단계로 구성
public class UserDao {
	
	//1단계: 드라이버 로딩
	public UserDao() {
		try {
			Class.forName("org.mariadb.jdbc.Driver");
			System.out.println("1단계:드라이버 로딩 성공");
		} catch (ClassNotFoundException e) {
			System.out.println("1단계:드라이버 로딩 실패");
			e.printStackTrace();
		}
	}

	//메서드 구현: 2~6단계 구현
	
	//회원 목록 조회 기능: select문 (반환타입: List[Dto, Dto...])
	public List<UserDto> getAllUser(){
		List<UserDto> list = new ArrayList<>();
		
		//DB 연결을 위한 정보 정의
		String url="jdbc:maridb://localhost:3306/hk";
		String user = "root";
		String password= "manager";
		
		//실행할 쿼리 정의
		String sql = " SELECT "
				   + " USERID, NAME, BIRTHYEAR,"
				   + " ADDR, MOBILE1, MOBILE2, HEIGHT,"
				   + " MDATE "
				   + " FROM USERTBL "
				   + " ORDER BY MDATE DESC ";
		
		Connection conn = null;//DB연결을 위한 객체 
		PreparedStatement psmt = null;//쿼리 준비를 위한 객체
		ResultSet rs = null;// 쿼리 결과 받기 위한 객체
		
		try {
			conn=DriverManager.getConnection(url, user, password);
			System.out.println("2단계:DB연결 성공");
			
			psmt=conn.prepareStatement(sql);
			System.out.println("3단계:쿼리준비 성공");
			
			rs=psmt.executeQuery();
			System.out.println("4단계:쿼리실행 성공");
			
			//ResultSet은 
			while(rs.next()) {// next()는 값이 있는지 확인
				UserDto dto = new UserDto();//행단위로 저장할 객체
				//행단위로 가져온뒤 열단위로 꺼낸다
				dto.setUserId(rs.getString(1)); 
				dto.setName(rs.getString(2));
				dto.setBirthYear(rs.getInt(3));
				dto.setAddr(rs.getString(4));
				dto.setMobile1(rs.getString(5));
				dto.setMobile2(rs.getString(6));
				dto.setHeight(rs.getInt(7));
				dto.setmDate(rs.getDate(8));
				
				list.add(dto);//마지막에 완성된 DTO를 담아야 한다.
			}
			System.out.println("5단계:쿼리결과 받기 성공");
		} catch (SQLException e) {
			System.out.println("JDBC실패");
			e.printStackTrace();
		}finally {
			try {
				if(rs!=null) {
					rs.close();
				}
				if(psmt!=null) {
					psmt.close();
				}
				if(conn!=null) {
					conn.close();
				}
				System.out.println("6단계:DB닫기 성공");
			} catch (SQLException e) {
				System.out.println("6단계:DB닫기 실패");
				e.printStackTrace();
			}
		}
		
		return list;
	}
	
}








