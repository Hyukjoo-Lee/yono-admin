package com.yono.service;

import java.util.List;

import com.yono.dto.CardBenefitDTO;

public interface CardBenefitService {
    List<CardBenefitDTO> getAllCardBenefitsByCardTitle(String cardTitle);

    List<CardBenefitDTO> registerCardBenefits(List<CardBenefitDTO> cardBenefitDTOs);
}
