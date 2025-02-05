package com.yono.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yono.dao.CommunityDAO;
import com.yono.dto.CommunityDTO;
import com.yono.entity.CommunityEntity;

@Service
public class CommunityServiceImpl implements CommunityService {

    @Autowired
    private CommunityDAO communityDao;

    // 검색 기능
    @Override
    public List<CommunityDTO> searchByCategory(String keyword) {
        return communityDao.searchByCategory(keyword)
                .stream()
                .map(this::toDto) // Entity -> DTO 변환
                .collect(Collectors.toList());
    }

    @Override
    public List<CommunityDTO> searchByName(String keyword) {
        return communityDao.searchByName(keyword)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CommunityDTO> searchByTitle(String keyword) {
        return communityDao.searchByTitle(keyword)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void deleteByIds(List<Integer> ids) {
        communityDao.deleteByIds(ids);
    }

    @Override
    public CommunityDTO getCommunityById(int id) {
        CommunityEntity communityEntity = communityDao.findById(id);
        if (communityEntity == null) {
            throw new RuntimeException("Community not found with ID: " + id);
        }
        // Entity -> DTO 변환
        return toDto(communityEntity);
    }

    // Entity -> DTO 변환
    private CommunityDTO toDto(CommunityEntity entity) {
        CommunityDTO dto = new CommunityDTO();
        dto.setNo(entity.getPno());
        dto.setTitle(entity.getTitle());
        dto.setCategory(entity.getCategory());
        dto.setUserId(entity.getUserEntity().getUserId()); // 유저 정보 매핑
        dto.setContent(entity.getContent());
        dto.setRegdate(entity.getRegdate());
        dto.setViewcnt(entity.getViewcnt());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        dto.setImgurl(entity.getImgurl());
        return dto;
    }

}
