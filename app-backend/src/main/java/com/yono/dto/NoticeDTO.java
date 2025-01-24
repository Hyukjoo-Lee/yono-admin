package com.yono.dto;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class NoticeDTO {

    private int noticeNo;

    private String title;
    private String userId;
    private String content;
    private String imgurl;
    private int viewCount;

    private Timestamp createdAt;
    private Timestamp updatedAt;
}
