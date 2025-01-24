package com.yono.dto;

import java.sql.Timestamp;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class CommunityDTO {
    private int no;
    private String title;
    private String category;
    private String userId;
    private String content;

    @JsonFormat(pattern = "yyyy-MM-dd")  // 날짜 포맷 지정
    private LocalDate regdate;
    
    private int viewcnt=0;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String imgurl;
    private String file;
}
