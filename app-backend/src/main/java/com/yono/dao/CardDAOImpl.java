package com.yono.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.yono.entity.CardEntity;

@Repository
public class CardDAOImpl implements CardDAO {

    @Autowired
    private CardRepository CardRepo;

    @Override
    public List<CardEntity> searchNotice(String keyword) {
        return CardRepo.searchNotice(keyword);
    }

    @Override
    public void createCard(CardEntity cardEntity) {
        CardRepo.save(cardEntity);
    }

    @Override
    public boolean existsByCardTitle(String cardTitle) {
        return CardRepo.existsByCardTitle(cardTitle);
    }

}
