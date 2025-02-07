package com.yono.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.yono.entity.UserEntity;

@Repository
public class UserDAOImpl implements UserDAO {

    @Autowired
    private UserRepository userRepo;

    @Override
    public List<UserEntity> searchUsers(String keyword) {
        return userRepo.searchUsers(keyword);
    }

    @Override
    public List<UserEntity> searchUsersByName(String keyword) {
        return userRepo.searchUsersByName(keyword);
    }

    @Override
    public List<UserEntity> searchUsersById(String keyword) {
        return userRepo.searchUsersById(keyword);
    }

    @Override
    public int delUserState(int userNum, String state) {
        return userRepo.delUserState(userNum, state);
    }
    
    @Override
    public Optional<UserEntity> findByUserId(String userId) {
        return userRepo.findByUserId(userId);
    }

}
