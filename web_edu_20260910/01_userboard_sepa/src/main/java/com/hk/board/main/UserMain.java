package com.hk.board.main;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.hk.board.dao.UserDao;
import com.hk.board.dto.UserDto;

public class UserMain {

	public static void main(String[] args) {
		getAllListTest();
	}
	
	//회원목록 조회 Test Case
	public static void getAllListTest() {
		
		UserDao dao = new UserDao();
		
		List<UserDto> list = dao.getAllUser();
		for (UserDto userDto : list) {
			System.out.println(userDto.toString());
		}
	}
}





