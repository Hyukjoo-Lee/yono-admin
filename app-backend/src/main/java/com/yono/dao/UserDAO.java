package com.yono.dao;

import java.util.List;
import java.util.Optional;

import com.yono.entity.UserEntity;

public interface UserDAO {
    List<UserEntity> searchUsers(String keyword);
    List<UserEntity> searchUsersByName(String keyword);
    List<UserEntity> searchUsersById(String keyword);
    int delUserState(int userNum, String state);
    Optional<UserEntity> findByUserId(String userId);
}
