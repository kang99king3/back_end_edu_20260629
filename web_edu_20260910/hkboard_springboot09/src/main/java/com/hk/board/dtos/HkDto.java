package com.hk.board.dtos;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// @Data 
@Setter //setSeq()....자동으로 생성해줌
@Getter //getSeq()....자동으로 생성해줌
@ToString 
@NoArgsConstructor 
@AllArgsConstructor 
@Builder //원하는 맴버필드만 초기화 제공
//dto객체에서는 잘 안씀 -> 객체 주입할때 주로 사용함
// @RequiredArgsConstructor 
public class HkDto {

    private int seq;
	private String id;
	private String title;
	private String content;
	private Date regDate;
}
