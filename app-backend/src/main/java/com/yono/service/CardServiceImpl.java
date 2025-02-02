package com.yono.service;

import java.sql.Timestamp;
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
}
