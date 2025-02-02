package com.yono.dto;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * DTO: 데이터 전송 객체
 * 데이터를 다른 계층으로 전송할 때 여러 데이터를 하나로 캡슐화한 객체
 * 클라이언트 -> 컨트롤러 -> 서비스 계층 사이에 전달 된다.
 */
@Getter
@Setter
@ToString
public class UserDTO {
    private int userNum;

    private String userId;
    private String password;
    private String email;
    private String name;

    private int spendingTarget = 0;
    private String profile = "temp_profile";

    private int state;
    private int userRole;

    private Timestamp createdAt;
    private Timestamp updatedAt;
}