package com.yono.dao;

import java.util.List;

import com.yono.entity.CardEntity;

public interface CardDAO {
    List<CardEntity> searchNotice(String keyword);

    boolean existsByCardTitle(String cardTitle);

    void createCard(CardEntity cardEntity);

    void deleteByIds(List<Integer> ids);

    CardEntity findById(Integer id);
}
