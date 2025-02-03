package com.yono.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.yono.dto.CardBenefitDTO;
import com.yono.service.CardBenefitService;

@RestController
@RequestMapping("/benefit")
public class CardBenefitController {

    @Autowired
    private CardBenefitService cardBenefitService;

    // 특정 카드의 혜택 조회
    @GetMapping("/{cardTitle}")
    public ResponseEntity<List<CardBenefitDTO>> getAllCardBenefitsByCardTitle(@PathVariable String cardTitle) {
        List<CardBenefitDTO> benefits = cardBenefitService.getAllCardBenefitsByCardTitle(cardTitle);

        if (benefits.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(benefits);
    }

    // 카드 혜택 추가 (한 개 또는 다수 등록 가능)
    @PostMapping("/register")
    public ResponseEntity<List<CardBenefitDTO>> registerCardBenefits(
            @RequestBody List<CardBenefitDTO> cardBenefitDTOs) {
        List<CardBenefitDTO> savedBenefits = cardBenefitService.registerCardBenefits(cardBenefitDTOs);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBenefits);
    }
}
