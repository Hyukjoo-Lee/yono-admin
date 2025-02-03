package com.yono.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yono.entity.CardBenefitEntity;
import com.yono.entity.CardEntity;

public interface CardBenefitRepository extends JpaRepository<CardBenefitEntity, Integer> {
    boolean existsByBenefitTitle(String benefitTitle);

    CardBenefitEntity findByBenefitId(int benefitId);

    List<CardBenefitEntity> findByCardEntityCardTitle(String cardTitle);

    boolean existsByBenefitTitleAndCardEntity(String benefitTitle, CardEntity cardEntity);
}
