package com.yono.dao;

import java.util.List;

import com.yono.entity.CardBenefitEntity;
import com.yono.entity.CardEntity;

public interface CardBenefitDAO {
    // 혜택 타이틀로 존재 여부 확인
    boolean existsByBenefitTitle(String benefitId);

    // 혜택 ID로 특정 혜택 조회
    CardBenefitEntity getCardBenefitByBenefitId(int benefitId);

    // 카드 이름으로 해당 카드 혜택 모두 조회
    List<CardBenefitEntity> getAllCardBenefitsByCardTitle(String cardTitle);

    CardBenefitEntity registerCardBenefit(CardBenefitEntity cardBenefitEntity);

    // 특정 카드에 있는 카드 혜택 중복 체크
    boolean existsByBenefitTitleAndCard(String benefitTitle, CardEntity cardEntity);
}
