package com.hk.ansboard.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AnsController {

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
}




