package com.hk.board.controller;

import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hk.board.command.InsertCalCommand;
import com.hk.board.service.CalServiceImp;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Slf4j 
@Controller 
@RequiredArgsConstructor 
@RequestMapping("/schedule")
public class CalController {

    private final CalServiceImp calService;

    @GetMapping("/calendar")
    public String calendar(Model model,String year, String month) {
        log.info("calendar페이지 요청");
        Map<String,Object>map=calService.makeCalendar(year, month);
        model.addAttribute("calMap", map);
        return "calboard/calendar";//응답할 페이지 이름
    }

    //일정추가폼 이동
    @GetMapping("/addcalboardform")
    public String addCalBoardForm(InsertCalCommand insertCalCommand,
                                  Model model) {
        log.info("일정추가폼이동");

        //입력폼 이동시 command객체를 보내야 된다.
        model.addAttribute("insertCalCommand", insertCalCommand);
        //현재시간 구하기
        model.addAttribute("now", LocalTime.now());
        return "calboard/addcalboardform";
    }
    
}
