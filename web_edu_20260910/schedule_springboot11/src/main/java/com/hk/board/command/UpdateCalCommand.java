package com.hk.board.command;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor 
@AllArgsConstructor 
public class UpdateCalCommand {
    private int seq;
    private String id;
    @NotBlank(message = "제목을 입력하세요") 
    private String title;
    @NotBlank(message = "일정내용을 입력하세요") 
    private String content;

    //mdate 컬럼에 저장할 값-> 12자리로 변환해서 처리
    @NotNull(message = "년도를 입력하세요") 
    private Integer year;
    @NotNull(message = "월을 입력하세요") 
    private Integer month;
    @NotNull(message = "일을 입력하세요") 
    private Integer date;
    @NotNull(message = "시간을 입력하세요") 
    private Integer hour;
    @NotNull(message = "분 입력하세요") 
    private Integer min;
}
