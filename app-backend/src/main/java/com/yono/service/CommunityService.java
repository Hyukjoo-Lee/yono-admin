package com.yono.service;

import java.util.List;

import com.yono.dto.CommunityDTO;

public interface CommunityService {
    List<CommunityDTO> searchByCategory(String keyword);

    List<CommunityDTO> searchByName(String keyword);
    
    List<CommunityDTO> searchByTitle (String keyword);

    void deleteByIds (List<Integer> ids);
    CommunityDTO getCommunityById(int id); 
}
