package com.yono.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yono.entity.CardEntity;

public interface CardRepository extends JpaRepository<CardEntity, Integer> {

}
