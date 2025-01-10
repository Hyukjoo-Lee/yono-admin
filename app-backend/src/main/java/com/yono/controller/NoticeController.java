package com.yono.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yono.service.NoticeService;
import com.yono.vo.NoticeVO;

@RestController
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @GetMapping("/list")
    public List<NoticeVO> searchNotice(@RequestParam("keyword") String keyword) {
        return noticeService.searchNotice(keyword);
    }

    @PostMapping("/delete")
    public ResponseEntity<Void> deleteByNotice(@RequestBody List<Integer> ids) {
        noticeService.deleteByNotice(ids);
        return ResponseEntity.ok().build();
    }
}