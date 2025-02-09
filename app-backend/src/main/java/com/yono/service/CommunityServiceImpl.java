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

    /**
     * 카테고리를 기준으로 게시글 검색
     *
     * @param keyword 검색어
     * @return 검색된 게시글 목록
     */
    @Override
    public List<CommunityDTO> searchByCategory(String keyword) {
        return communityDao.searchByCategory(keyword)
                .stream()
                .map(this::toDto) // Entity -> DTO 변환
                .collect(Collectors.toList());
    }

    /**
     * 작성자를 기준으로 게시글 검색
     *
     * @param keyword 검색어
     * @return 검색된 게시글 목록
     */
    @Override
    public List<CommunityDTO> searchByName(String keyword) {
        return communityDao.searchByName(keyword)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /**
     * 제목을 기준으로 게시글 검색
     *
     * @param keyword 검색어
     * @return 검색된 게시글 목록
     */
    @Override
    public List<CommunityDTO> searchByTitle(String keyword) {
        return communityDao.searchByTitle(keyword)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /**
     * 게시글 삭제
     *
     * @param ids 삭제할 게시글 ID 목록
     */
    @Transactional
    @Override
    public void deleteByIds(List<Integer> ids) {
        communityDao.deleteByIds(ids);
    }

    /**
     * 게시글 ID로 게시글 조회
     *
     * @param id 게시글 ID
     * @return 게시글 DTO
     * @throws RuntimeException 게시글이 존재하지 않을 경우 예외 발생
     */
    @Override
    public CommunityDTO getCommunityById(int id) {
        CommunityEntity communityEntity = communityDao.findById(id);
        if (communityEntity == null) {
            throw new RuntimeException("Community not found with ID: " + id);
        }
        // Entity -> DTO 변환
        return toDto(communityEntity);
    }

    /**
     * CommunityEntity 객체를 CommunityDTO 객체로 변환
     *
     * @param entity 변환할 엔티티 객체
     * @return 변환된 DTO 객체
     */
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
