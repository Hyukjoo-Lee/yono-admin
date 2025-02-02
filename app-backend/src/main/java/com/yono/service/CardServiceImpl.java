package com.yono.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yono.dao.CardDAO;

@Service
public class CardServiceImpl implements CardService {
    
    @Autowired
    private CardDAO cardDao;
}
