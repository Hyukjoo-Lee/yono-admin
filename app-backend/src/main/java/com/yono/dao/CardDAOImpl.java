package com.yono.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.yono.entity.CardEntity;

@Repository
public class CardDAOImpl implements CardDAO {

    @Autowired
    private CardRepository cardRepo;

    @Override
    public List<CardEntity> searchCard(String keyword) {
        return cardRepo.searchCard(keyword);
    }

    @Override
    public void createCard(CardEntity cardEntity) {
        cardRepo.save(cardEntity);
    }

    @Override
    public boolean existsByCardTitle(String cardTitle) {
        return cardRepo.existsByCardTitle(cardTitle);
    }

    @Override
    public void deleteByIds(List<Integer> ids) {
        cardRepo.deleteByIds(ids);
    }

    @Override
    public CardEntity findById(Integer id) {
        return cardRepo.findById(id).orElse(null);
    }

}
