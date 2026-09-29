package com.hk.ansboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hk.ansboard.dao.AnsDao;
import com.hk.ansboard.dtos.AnsDto;

@Service
public class AnsService {

	@Autowired
	private AnsDao ansDao;
	
	public List<AnsDto> getAllList(String pnum){
		return ansDao.getAllList(pnum);
	}
	
	public boolean boardInsert(AnsDto dto) {
		return ansDao.boardInsert(dto);
	}
}







