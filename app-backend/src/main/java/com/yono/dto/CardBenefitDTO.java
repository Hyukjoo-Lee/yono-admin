package com.yono.dto;

import java.sql.Timestamp;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CardBenefitDTO {
    private int benefitId;
    private String benefitTitle;
    private String benefitValue;
    private String benefitType;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String cardTitle;
    private int cardId;

    public CardBenefitDTO(String benefitTitle, String benefitValue, String benefitType) {
        this.benefitTitle = benefitTitle;
        this.benefitValue = benefitValue;
        this.benefitType = benefitType;
    }
}
