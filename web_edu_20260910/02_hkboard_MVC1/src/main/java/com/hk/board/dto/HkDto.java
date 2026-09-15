package com.hk.board.dto;

import java.util.Date;

//DB: hkboard 테이블에 데이터를 담을 객체
public class HkDto {
	
	//은닉화: 중요한 데이터는 맴버필드에서 바로 접근 못하게 처리
	private int seq;
	private String id;
	private String title;
	private String content;
	private Date regDate;
	
	public HkDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	//맴버필드 전체 초기화용
	public HkDto(int seq, String id, String title, String content, Date regDate) {
		super();
		this.seq = seq;
		this.id = id;
		this.title = title;
		this.content = content;
		this.regDate = regDate;
	}

	//글추가용 초기화
	public HkDto(String id, String title, String content) {
		super();
		this.id = id;
		this.title = title;
		this.content = content;
	}

	//글수정용 초기화
	public HkDto(int seq, String title, String content) {
		super();
		this.seq = seq;
		this.title = title;
		this.content = content;
	}
	
	
}



