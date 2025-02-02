package com.yono.service;

import java.sql.Timestamp;
import java.util.List;
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

    @Override
    public List<UserDTO> searchUsers(String keyword) {
        List<UserEntity> entities = userDao.searchUsers(keyword);
        return toDtoList(entities);
    }

    @Override
    public List<UserDTO> searchUsersByName(String keyword) {
        List<UserEntity> entities = userDao.searchUsersByName(keyword);
        return toDtoList(entities);
    }

    @Override
    public List<UserDTO> searchUsersById(String keyword) {
        List<UserEntity> entities = userDao.searchUsersById(keyword);
        return toDtoList(entities);
    }

    @Transactional
    @Override
    public int delUserState(int userNum, int state) {
        return userDao.delUserState(userNum, state);
    }

    @Override
    public UserEntity findByUserId(String userId) {
        return userDao.findByUserId(userId);
    }

    // Entity -> DTO 변환
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
        dto.setUpdatedAt(entity.getUpdatedAt() != null ? Timestamp.valueOf(entity.getUpdatedAt()) : null);

        return dto;
    }

    // DTO -> Entity 변환
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
        entity.setUpdatedAt(dto.getUpdatedAt() != null ? dto.getUpdatedAt().toLocalDateTime() : null);

        return entity;
    }

    // Entity List -> DTO List 변환
    public static List<UserDTO> toDtoList(List<UserEntity> entities) {
        return entities.stream()
                .map(UserServiceImpl::toDto)
                .collect(Collectors.toList());
    }
}
