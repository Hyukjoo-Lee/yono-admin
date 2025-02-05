package com.yono.dao;

import java.util.List;

import com.yono.entity.UserEntity;

public interface UserDAO {
    List<UserEntity> searchUsers(String keyword);
    List<UserEntity> searchUsersByName(String keyword);
    List<UserEntity> searchUsersById(String keyword);
    int delUserState(int userNum, String state);
    UserEntity findByUserId(String userId);
}
