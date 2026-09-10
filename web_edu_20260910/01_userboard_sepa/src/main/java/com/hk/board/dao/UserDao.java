package com.hk.board.dao;

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
	
	
	
}
