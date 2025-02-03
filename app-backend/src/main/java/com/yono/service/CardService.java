package com.yono.service;

import java.util.List;

import com.yono.dto.CardDTO;

public interface CardService {
    List<CardDTO> searchCard(String keyword);

    CardDTO createCard(CardDTO cardDTO);

    CardDTO getCardById(Integer id);

    void deleteByIds(List<Integer> ids);
}
