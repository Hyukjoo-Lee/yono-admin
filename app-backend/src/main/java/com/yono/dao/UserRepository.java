package com.yono.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.yono.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    @Query("SELECT u FROM UserEntity u WHERE "
            + "((:keyword IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR "
            + "LOWER(u.userId) LIKE LOWER(CONCAT('%', :keyword, '%'))))"
            + " AND u.userRole = 'USER'")
    List<UserEntity> searchUsers(@Param("keyword") String keyword);

    @Query("SELECT u FROM UserEntity u WHERE "
            + "(:keyword IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%')))"
            + " AND u.userRole = 'USER'")
    List<UserEntity> searchUsersByName(@Param("keyword") String keyword);

    @Query("SELECT u FROM UserEntity u WHERE "
            + "(:keyword IS NULL OR LOWER(u.userId) LIKE LOWER(CONCAT('%', :keyword, '%')))"
            + " AND u.userRole = 'USER'")
    List<UserEntity> searchUsersById(@Param("keyword") String keyword);

    @Modifying
    @Query("UPDATE UserEntity u SET u.state = :state, u.updatedAt = CURRENT_TIMESTAMP WHERE u.userNum = :userNum")
    int delUserState(@Param("userNum") int userNum, @Param("state") String state);

    UserEntity findByUserId(String userId);
}
