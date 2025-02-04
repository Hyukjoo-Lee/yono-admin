package com.yono.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.yono.entity.CardEntity;

public interface CardRepository extends JpaRepository<CardEntity, Integer> {

    @Query("SELECT u FROM CardEntity u WHERE "
        + "((:keyword IS NULL OR LOWER(u.cardProvider) LIKE LOWER(CONCAT('%', :keyword, '%')) OR "
        + "LOWER(u.cardTitle) LIKE LOWER(CONCAT('%', :keyword, '%')) OR "
        + "LOWER(CASE u.cardProvider "
        + "WHEN 'nh' THEN '농협' "
        + "WHEN 'hana' THEN '하나' "
        + "WHEN 'kb' THEN '국민' "
        + "WHEN 'samsung' THEN '삼성' "
        + "WHEN 'hyundai' THEN '현대' "
        + "WHEN 'shinhan' THEN '신한' "
        + "ELSE u.cardProvider END) LIKE LOWER(CONCAT('%', :keyword, '%'))))")
    List<CardEntity> searchCard(@Param("keyword") String keyword);

    boolean existsByCardTitle(String cardTitle);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM card WHERE card_id IN (:ids)", nativeQuery = true)
    void deleteByIds(@Param("ids") List<Integer> ids);

    CardEntity findByCardTitle(String cardTitle);

}
