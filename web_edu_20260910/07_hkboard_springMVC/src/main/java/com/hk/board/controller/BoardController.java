package com.hk.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.hk.board.dtos.HkDto;
import com.hk.board.service.IHkService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class BoardController {
	
	@Autowired
	private IHkService hkService;
	
	@RequestMapping(value = "/home.do",
	               method = RequestMethod.GET )
	public String home(Model model,
					   String param,//"param"이라는 이름의 값이 넘어오면
					   HkDto dto,// dto에 맴버필드명과 일치하는 값이 넘어오면
			           HttpServletRequest request) {
//		request.setAttribute("param", "파람");
		model.addAttribute("param", "파람");
//		String param=request.getParameter("param");
		return "home";//forward
	}
	
	//메서드별로 url 맵핑을 함
	@RequestMapping(value = "/boardlist.do",
			        method = RequestMethod.GET )
	public String boardList(Model model) {
		List<HkDto> list=hkService.getAllList();
		model.addAttribute("list", list);
		return "boardlist";//forward
//		return "redirect:boardlist.do";// sendRedirect방식임
	}
	//boardlist.jsp와 BoardController.java
	@RequestMapping(value = "/boardInsertForm.do",
					method = RequestMethod.GET)
	public String boardInsertForm() {
		return "boardInsertForm";
	}
	
	@RequestMapping(value = "/boardInsert.do",
			        method = RequestMethod.POST)
	public String boardInsert(HkDto dto) {
		// 파라미터: HkDto가 받아준다(id,title,content)
		boolean isS=hkService.insertBoard(dto);
		if(isS) {
			return "redirect:boardlist.do";
		}else {
			return "redirect:error.jsp";
		}

	}
	
	
	
}








