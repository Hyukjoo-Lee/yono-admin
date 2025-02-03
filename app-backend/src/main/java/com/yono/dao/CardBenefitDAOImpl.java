package com.yono.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.yono.entity.CardBenefitEntity;
import com.yono.entity.CardEntity;

@Repository
public class CardBenefitDAOImpl implements CardBenefitDAO {

    @Autowired
    private CardBenefitRepository cardBenefitRepository;

    @Override
    public boolean existsByBenefitTitle(String benefitTitle) {
        return cardBenefitRepository.existsByBenefitTitle(benefitTitle);
    }

    @Override
    public CardBenefitEntity getCardBenefitByBenefitId(int benefitId) {
        CardBenefitEntity cardBenefitEntity = cardBenefitRepository.findByBenefitId(benefitId);
        return cardBenefitEntity;
    }

    @Override
    public List<CardBenefitEntity> getAllCardBenefitsByCardTitle(String cardTitle) {
        return cardBenefitRepository.findByCardEntityCardTitle(cardTitle);
    }

    @Override
    public boolean existsByBenefitTitleAndCard(String benefitTitle, CardEntity cardEntity) {
        return cardBenefitRepository.existsByBenefitTitleAndCardEntity(benefitTitle, cardEntity);
    }

    @Override
    public CardBenefitEntity registerCardBenefit(CardBenefitEntity cardBenefitEntity) {
        return cardBenefitRepository.save(cardBenefitEntity);
    }
}
