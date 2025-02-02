package com.yono.service;

import java.util.List;

import com.yono.dto.CardDTO;

public interface CardService {
    List<CardDTO> searchNotice(String keyword);

    CardDTO createCard(CardDTO cardDTO);
}
