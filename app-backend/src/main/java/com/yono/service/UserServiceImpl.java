package com.yono.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yono.dao.UserDAO;
import com.yono.vo.UserVO;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDAO userDao;

    @Override
    public List<UserVO> searchUsers(String keyword) {
        return userDao.searchUsers(keyword);
    }

    @Override
    public List<UserVO> searchUsersByName(String keyword) {
        return userDao.searchUsersByName(keyword);
    }

    @Override
    public List<UserVO> searchUsersById(String keyword) {
        return userDao.searchUsersById(keyword);
    }

    @Transactional
    @Override
    public int delUserState(int userNum, int state) {
        return userDao.delUserState(userNum, state);
    }
}
