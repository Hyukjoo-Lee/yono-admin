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

import com.yono.service.CommunityService;
import com.yono.vo.CommunityVO;

@RestController
@RequestMapping("/community")
public class CommunityController {

    @Autowired
    private CommunityService communityService;

    @GetMapping("/list")
    public List<CommunityVO> searchCommunuity(@RequestParam("keyword") String keyword, @RequestParam("selectValue") String selectValue) {
        switch (selectValue) {
            case "카테고리":
                return communityService.searchByCategory(keyword);
            case "작성자":
                return communityService.searchByName(keyword);
            case "제목":
                return communityService.searchByTitle(keyword);
            default:
                return communityService.searchByCategory(keyword);
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<Void> deleteCommunityItems(@RequestBody List<Integer> ids) {
        communityService.deleteByIds(ids);
        return ResponseEntity.ok().build();
    }

}
