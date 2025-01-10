package com.yono.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.yono.vo.CommunityVO;

public interface CommunityService {
    List<CommunityVO> searchByCategory(String keyword);

    List<CommunityVO> searchByName(String keyword);
    
    List<CommunityVO> searchByTitle (String keyword);

    void deleteByIds (List<Integer> ids);
}
