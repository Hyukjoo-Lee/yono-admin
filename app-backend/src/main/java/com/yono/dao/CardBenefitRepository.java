package com.yono.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.yono.entity.CardBenefitEntity;
import com.yono.entity.CardEntity;

public interface CardBenefitRepository extends JpaRepository<CardBenefitEntity, Integer> {
    boolean existsByBenefitTitle(String benefitTitle);

    CardBenefitEntity findByBenefitId(int benefitId);

    List<CardBenefitEntity> findByCardEntityCardTitle(String cardTitle);

    boolean existsByBenefitTitleAndCardEntity(String benefitTitle, CardEntity cardEntity);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM card_benefit WHERE card_id IN (:ids)", nativeQuery = true)
    void deleteByIds(@Param("ids") List<Integer> ids);
}
