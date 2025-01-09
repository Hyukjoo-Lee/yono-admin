package com.yono.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.yono.vo.UserVO;

import jakarta.transaction.Transactional;

@Repository
public class UserDAOImpl implements UserDAO {

    @Autowired
    private UserRepository userRepo;

    @Override
    public List<UserVO> searchUsers(String keyword) {
        return userRepo.searchUsers(keyword);
    }

    @Override
    public List<UserVO> searchUsersByName(String keyword) {
        return userRepo.searchUsersByName(keyword);
    }

    @Override
    public List<UserVO> searchUsersById(String keyword) {
        return userRepo.searchUsersById(keyword);
    }

    @Override
    public int delUserState(int userNum, int state) {
        return userRepo.delUserState(userNum, state);
    }

}
