package com.hk.board.test;

import java.util.List;

import com.hk.board.dao.HkDao;
import com.hk.board.dto.HkDto;

public class MainTest {
//	jUnit : test 도구를 이용하면 편리하게 테스트 관리할 수 있다.
	
	public static void main(String[] args) {
		// 메서드 호출
		MainTest test=new MainTest();
		//test.BoardInsertTest();
		
		test.BoardListTest();
	}
	
	//글목록조회하기 TEST CASE
	public void BoardListTest() {
		HkDao dao=new HkDao();
		List<HkDto> list=dao.getAllList();
		for (HkDto hkDto : list) {
			System.out.println(hkDto);
		}
	}
	
	//글추가하기 TEST CASE
	public void BoardInsertTest() {
		HkDao dao=new HkDao();
		boolean isS=dao.insertBoard(new HkDto("hk","제목","내용"));
		System.out.println(isS);
	}

}






