package com.hk.ansboard.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hk.ansboard.dao.AnsDao;
import com.hk.ansboard.dtos.AnsDto;
import com.hk.ansboard.util.Paging;

@Service
public class AnsService {

	@Autowired
	private AnsDao ansDao;
	
	public List<AnsDto> getAllList(String pnum){
		return ansDao.getAllList(pnum);
	}
	
	public Map<String, Object> getBoardListWithPaging(String pnum){
		Map<String, Object> resultMap=new HashMap<>();
		
		// 글목록
		List<AnsDto> list=ansDao.getAllList(pnum);
		// 페이지 개수
		int pCount = ansDao.getPcount();
		// 페이징 처리
		Map<String, Integer>pMap = Paging.pagingValue(pCount, pnum, 5);
		
		resultMap.put("list", list);
		resultMap.put("pCount", pCount);
		resultMap.put("pMap", pMap);
		
		return resultMap;
	}
	
	public int getPcount() {
		return ansDao.getPcount();
	}
	
	public boolean boardInsert(AnsDto dto) {
		return ansDao.boardInsert(dto);
	}
	
	public AnsDto boardDetail(int seq) {
		return ansDao.boardDetail(seq);
	}
	
	public boolean boardUpdate(AnsDto dto) {
		return ansDao.boardUpdate(dto);
	}
	
	public boolean mulDel(String[] seqs) {
		return ansDao.mulDel(seqs);
	}
	
	public boolean readCount(int seq) {
		return ansDao.readCount(seq);
	}
}







