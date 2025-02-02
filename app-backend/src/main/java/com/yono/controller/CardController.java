package com.yono.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yono.service.CardService;

@RestController
@RequestMapping("/card")
public class CardController {
    @Autowired
    private CardService cardService;

}
