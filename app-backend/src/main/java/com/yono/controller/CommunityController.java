package com.yono.controller;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yono.service.CommunityService;
import com.yono.dto.CommunityDTO;

import lombok.extern.slf4j.Slf4j;

/**
 * 커뮤니티 관련 요청을 처리하는 컨트롤러 클래스
 */
@Slf4j
@RestController
@RequestMapping("/community")
public class CommunityController {

     /** 이미지 저장 경로 */
    @Value("${IMAGE_PATH}")
    private String uploadDir;

    @Autowired
    private CommunityService communityService;

    /**
     * 커뮤니티 검색 API
     *
     * @param keyword     검색어 (카테고리, 작성자, 제목 기준)
     * @param selectValue 검색 기준 (카테고리, 작성자, 제목)
     * @return 검색된 커뮤니티 게시글 목록
     */
    @GetMapping("/list")
    public List<CommunityDTO> searchCommunuity(@RequestParam("keyword") String keyword, @RequestParam("selectValue") String selectValue) {
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

    /**
     * 커뮤니티 게시글 삭제 API
     *
     * @param ids 삭제할 게시글 ID 목록
     * @return 삭제 성공 응답
     */
    @PostMapping("/delete")
    public ResponseEntity<Void> deleteCommunityItems(@RequestBody List<Integer> ids) {
        for (Integer id : ids) {
            CommunityDTO community = communityService.getCommunityById(id);
            if (community != null && community.getImgurl() != null) {
                // 이미지 파일 삭제
                String filePath = uploadDir + community.getImgurl();
                File file = new File(filePath);
                
                if (file.exists()) {
                    if (file.delete()) {
                        log.info("Deleted image file: " + filePath);
                    } else {
                        log.warn("Failed to delete image file: " + filePath);
                    }
                }
            }
        }

        communityService.deleteByIds(ids);
        return ResponseEntity.ok().build();
    }

}
