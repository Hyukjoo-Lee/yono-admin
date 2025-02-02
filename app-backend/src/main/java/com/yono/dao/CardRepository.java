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
            + "LOWER(u.cardTitle) LIKE LOWER(CONCAT('%', :keyword, '%'))))")
    List<CardEntity> searchNotice(@Param("keyword") String keyword);

    boolean existsByCardTitle(String cardTitle);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM card WHERE card_id IN (:ids)", nativeQuery = true)
    void deleteByIds(@Param("ids") List<Integer> ids);

}
