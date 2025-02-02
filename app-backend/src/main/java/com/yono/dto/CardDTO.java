package com.yono.dto;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CardDTO {
    private int cardId;

    private String cardTitle;
    private String cardProvider;
    private String organizationCode;
    private String cardImgUrl;

    private Timestamp createdAt;
    private Timestamp updatedAt;
}
