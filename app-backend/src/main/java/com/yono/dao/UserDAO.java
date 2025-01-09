package com.yono.dao;

import java.util.List;

import com.yono.vo.UserVO;

public interface UserDAO {
    List<UserVO> searchUsers(String keyword);
    List<UserVO> searchUsersByName(String keyword);
    List<UserVO> searchUsersById(String keyword);
    int delUserState(int userNum, int state);
}
