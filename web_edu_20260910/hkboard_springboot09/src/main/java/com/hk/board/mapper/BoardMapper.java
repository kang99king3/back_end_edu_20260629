package com.hk.board.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.hk.board.dtos.HkDto;

@Mapper 
public interface BoardMapper {
    //BoardMapper.xml에 쿼리 id명과 메서드명이 같아야 함
    public List<HkDto> getAllList();
    public boolean insertBoard(HkDto dto);
    public HkDto getBoard(int seq);
    public boolean updateBoard(HkDto dto);
    public boolean mulDel(Map<String,String[]>map);
}
