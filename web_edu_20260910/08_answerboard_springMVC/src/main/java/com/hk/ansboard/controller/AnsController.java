package com.hk.ansboard.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.hk.ansboard.dtos.AnsDto;
import com.hk.ansboard.service.AnsService;

@Controller
public class AnsController {

//	@Autowired
	private AnsService ansService;
	
	public AnsController(AnsService ansService) {
		this.ansService=ansService;
	}
	
	//log 출력을 위한 선언: slf4j(로그출력할 준비작업), log4j(실제 출력 작업)
	private static final Logger logger=
		LoggerFactory.getLogger(AnsController.class);
	
	@RequestMapping(value = "/home.do",
			       method = RequestMethod.GET)
	public String home() {
		logger.info("HOME페이지로 이동");
		logger.debug("Working Directory:{}", System.getProperty("user.dir"));
		return "home";
	}
	
	@RequestMapping(value = "/boardList.do",
			       method = RequestMethod.GET)
	public String boardList(Model model, 
			               @RequestParam(value="pnum",
			                         required = false) String pnum) {
		if(pnum==null||pnum=="") {
			pnum="1";
		}
		List<AnsDto>list=ansService.getAllList(pnum);
		model.addAttribute("list", list);
		return "boardList";
	}
	
	@RequestMapping(value = "/boardInsertForm.do",
		           method = RequestMethod.GET)
	public String boardInsertForm() {
		logger.info("글추가폼으로 이동");
		return "boardInsertForm";
	}
	
	@RequestMapping(value = "/boardInsert.do",
	           method = RequestMethod.POST)
	public String boardInsert(AnsDto dto) {
		logger.info("글추가하기");
		boolean isS=ansService.boardInsert(dto);
		
		return "redirect:boardList.do";
	}
}




