package com.yono.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yono.dto.CardDTO;
import com.yono.service.CardService;

@RestController
@RequestMapping("/card")
public class CardController {
    
    @Autowired
    private CardService cardService;

    @GetMapping("/list")
    public List<CardDTO> searchNotice(@RequestParam("keyword") String keyword) {
        return cardService.searchNotice(keyword);
    }

}
