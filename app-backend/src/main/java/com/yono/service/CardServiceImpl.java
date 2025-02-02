package com.yono.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yono.dao.CardDAO;
import com.yono.dto.CardDTO;
import com.yono.entity.CardEntity;

@Service
public class CardServiceImpl implements CardService {

    @Autowired
    private CardDAO cardDao;

    @Override
    public List<CardDTO> searchNotice(String keyword) {
        // Entity -> DTO 변환
        List<CardEntity> entities = cardDao.searchNotice(keyword);
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public CardDTO createCard(CardDTO cardDTO) {
        if (cardDao.existsByCardTitle(cardDTO.getCardTitle())) {
            throw new IllegalArgumentException("이미 존재하는 카드이름입니다.");
        }

        CardEntity cardEntity = toEntity(cardDTO);
        cardDao.createCard(cardEntity);
        return toDto(cardEntity);
    }

    // Entity -> DTO 변환
    private CardDTO toDto(CardEntity entity) {
        if (entity == null) {
            return null;
        }

        CardDTO dto = new CardDTO();
        dto.setCardId(entity.getCardId());
        dto.setCardTitle(entity.getCardTitle());
        dto.setCardProvider(entity.getCardProvider());
        dto.setOrganizationCode(entity.getOrganizationCode());
        dto.setCardImgUrl(entity.getCardImgUrl());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());

        return dto;
    }

    // DTO -> Entity 변환
    private CardEntity toEntity(CardDTO dto) {
        CardEntity entity = new CardEntity();
        entity.setCardId(dto.getCardId());
        entity.setCardTitle(dto.getCardTitle());
        entity.setCardProvider(dto.getCardProvider());
        entity.setOrganizationCode(dto.getOrganizationCode());
        entity.setCardImgUrl(dto.getCardImgUrl());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        return entity;
    }
}
