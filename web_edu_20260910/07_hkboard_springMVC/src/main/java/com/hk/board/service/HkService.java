package com.hk.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hk.board.daos.IHkDao;
import com.hk.board.dtos.HkDto;

// controller ---> service ---> dao
@Service
public class HkService implements IHkService{

	//선언 타입이 IHkDao <-- HkDao
	//                 <-- IHkDao를 구현한 HkDao2
//                     <-- IHkDao를 구현한 HkDao3
	@Autowired
	private IHkDao hkDao;
	
	@Override
	public List<HkDto> getAllList() {
		//필요한 로직을 작성 
		return hkDao.getAllList();
	}

	@Override
	public boolean insertBoard(HkDto dto) {

		return hkDao.insertBoard(dto);
	}

	@Override
	public HkDto getBoard(int seq) {

		return hkDao.getBoard(seq);
	}

	@Override
	public boolean updateBoard(HkDto dto) {

		return hkDao.updateBoard(dto);
	}

	@Override
	public boolean deleteBoard(HkDto dto) {

		return hkDao.deleteBoard(dto);
	}

	@Override
	public boolean mulDel(String[] seqs) {

		return hkDao.mulDel(seqs);
	}

}
