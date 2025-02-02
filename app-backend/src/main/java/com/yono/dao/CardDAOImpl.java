package com.yono.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CardDAOImpl implements CardDAO {
    
    @Autowired
    private CardRepository CardRepo;

}
