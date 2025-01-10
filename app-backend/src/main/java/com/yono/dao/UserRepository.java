package com.yono.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.yono.vo.UserVO;

public interface UserRepository extends JpaRepository<UserVO, Integer> {

    @Query("SELECT u FROM UserVO u WHERE "
            + "((:keyword IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR "
            + "LOWER(u.userId) LIKE LOWER(CONCAT('%', :keyword, '%'))))"
            + "AND u.state = 1")
    List<UserVO> searchUsers(@Param("keyword") String keyword);

    @Query("SELECT u FROM UserVO u WHERE "
            + "(:keyword IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%')))"
            + "AND u.state = 1")
    List<UserVO> searchUsersByName(@Param("keyword") String keyword);

    @Query("SELECT u FROM UserVO u WHERE "
            + "(:keyword IS NULL OR LOWER(u.userId) LIKE LOWER(CONCAT('%', :keyword, '%')))"
            + "AND u.state = 1")
    List<UserVO> searchUsersById(@Param("keyword") String keyword);

    @Modifying
    @Query("UPDATE UserVO u SET u.state = :state WHERE u.userNum = :userNum")
    int delUserState(@Param("userNum") int userNum, @Param("state") int state);
}
