package com.yono.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yono.dao.UserDAO;
import com.yono.dto.UserDTO;
import com.yono.entity.UserEntity;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDAO userDao;

    /**
     * 키워드를 기준으로 사용자 검색
     *
     * @param keyword 검색어
     * @return 검색된 사용자 목록
     */
    @Override
    public List<UserDTO> searchUsers(String keyword) {
        List<UserEntity> entities = userDao.searchUsers(keyword);
        return toDtoList(entities);
    }

    /**
     * 이름을 기준으로 사용자 검색
     *
     * @param keyword 검색어
     * @return 검색된 사용자 목록
     */
    @Override
    public List<UserDTO> searchUsersByName(String keyword) {
        List<UserEntity> entities = userDao.searchUsersByName(keyword);
        return toDtoList(entities);
    }

    /**
     * 아이디를 기준으로 사용자 검색
     *
     * @param keyword 검색어
     * @return 검색된 사용자 목록
     */
    @Override
    public List<UserDTO> searchUsersById(String keyword) {
        List<UserEntity> entities = userDao.searchUsersById(keyword);
        return toDtoList(entities);
    }

    /**
     * 사용자 상태 변경 (예: 삭제 상태로 변경)
     *
     * @param userNum 사용자 번호
     * @param state 변경할 상태값
     * @return 업데이트된 행 개수
     */
    @Transactional
    @Override
    public int delUserState(int userNum, String state) {
        return userDao.delUserState(userNum, state);
    }

    /**
     * 사용자 아이디로 사용자 찾기
     *
     * @param userId 사용자 아이디
     * @return 사용자 엔티티 (Optional)
     */
    @Override
    public Optional<UserEntity> findByUserId(String userId) {
        return userDao.findByUserId(userId);
    }

    /**
     * 관리자 아이디로 찾기
     *
     * @param userId 관리자 아이디
     * @return booldean
     */
    @Override
    public boolean isAdminUser(String userId) {
        return userDao.findByUserId(userId)
                .map(user -> "ADMIN".equals(user.getUserRole()))
                .orElse(false);
    }

    /**
     * UserEntity 객체를 UserDTO 객체로 변환
     *
     * @param entity 변환할 엔티티 객체
     * @return 변환된 DTO 객체
     */
    public static UserDTO toDto(UserEntity entity) {
        if (entity == null) {
            return null;
        }

        UserDTO dto = new UserDTO();
        dto.setUserNum(entity.getUserNum());
        dto.setUserId(entity.getUserId());
        dto.setPassword(entity.getPassword());
        dto.setEmail(entity.getEmail());
        dto.setName(entity.getName());
        dto.setSpendingTarget(entity.getSpendingTarget());
        dto.setProfile(entity.getProfile());
        dto.setState(entity.getState());
        dto.setUserRole(entity.getUserRole());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());

        return dto;
    }

    /**
     * UserDTO 객체를 UserEntity 객체로 변환
     *
     * @param dto 변환할 DTO 객체
     * @return 변환된 엔티티 객체
     */
    public static UserEntity toEntity(UserDTO dto) {
        if (dto == null) {
            return null;
        }

        UserEntity entity = new UserEntity();
        entity.setUserNum(dto.getUserNum());
        entity.setUserId(dto.getUserId());
        entity.setPassword(dto.getPassword());
        entity.setEmail(dto.getEmail());
        entity.setName(dto.getName());
        entity.setSpendingTarget(dto.getSpendingTarget());
        entity.setProfile(dto.getProfile());
        entity.setState(dto.getState());
        entity.setUserRole(dto.getUserRole());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());

        return entity;
    }

    /**
     * UserEntity 리스트를 UserDTO 리스트로 변환
     *
     * @param entities 변환할 엔티티 리스트
     * @return 변환된 DTO 리스트
     */
    public static List<UserDTO> toDtoList(List<UserEntity> entities) {
        return entities.stream()
                .map(UserServiceImpl::toDto)
                .collect(Collectors.toList());
    }
}
