package com.yono.service;

import java.util.List;

import com.yono.vo.UserVO;

public interface UserService {

    List<UserVO> searchUsers(String keyword);

    List<UserVO> searchUsersByName(String keyword);
    
    List<UserVO> searchUsersById (String keyword);
    
    int delUserState(int userNum, int state);
}
