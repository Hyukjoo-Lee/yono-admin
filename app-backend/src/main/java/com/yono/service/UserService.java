package com.yono.service;

import java.util.List;
import java.util.Optional;

import com.yono.dto.UserDTO;
import com.yono.entity.UserEntity;

public interface UserService {

    List<UserDTO> searchUsers(String keyword);
    List<UserDTO> searchUsersByName(String keyword);
    List<UserDTO> searchUsersById (String keyword);
    int delUserState(int userNum, String state);
    Optional<UserEntity> findByUserId(String userId);
    boolean isAdminUser(String userId);
}
