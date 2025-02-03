package com.yono.service;

import java.util.List;

import com.yono.dto.CardBenefitDTO;
import com.yono.dto.CardDTO;

public interface CardService {
    List<CardDTO> searchCard(String keyword);

    CardDTO createCard(CardDTO cardDTO, List<CardBenefitDTO> benefitsDTOs);

    CardDTO getCardById(Integer id);

    void deleteByIds(List<Integer> ids);

}
