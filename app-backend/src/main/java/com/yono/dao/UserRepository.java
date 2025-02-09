package com.yono.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.yono.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

     /**
     * 키워드를 기준으로 사용자 검색
     *
     * @param keyword 검색어
     * @return 검색된 사용자 목록
     */
    @Query("SELECT u FROM UserEntity u WHERE "
            + "((:keyword IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR "
            + "LOWER(u.userId) LIKE LOWER(CONCAT('%', :keyword, '%'))))"
            + " AND u.userRole = 'USER'")
    List<UserEntity> searchUsers(@Param("keyword") String keyword);

    /**
     * 이름을 기준으로 사용자 검색
     *
     * @param keyword 검색어
     * @return 검색된 사용자 목록
     */
    @Query("SELECT u FROM UserEntity u WHERE "
            + "(:keyword IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%')))"
            + " AND u.userRole = 'USER'")
    List<UserEntity> searchUsersByName(@Param("keyword") String keyword);

    /**
     * 아이디를 기준으로 사용자 검색
     *
     * @param keyword 검색어
     * @return 검색된 사용자 목록
     */
    @Query("SELECT u FROM UserEntity u WHERE "
            + "(:keyword IS NULL OR LOWER(u.userId) LIKE LOWER(CONCAT('%', :keyword, '%')))"
            + " AND u.userRole = 'USER'")
    List<UserEntity> searchUsersById(@Param("keyword") String keyword);

    /**
     * 사용자 상태 업데이트
     *
     * @param userNum 사용자 번호
     * @param state   변경할 상태
     * @return 업데이트된 행 개수
     */
    @Modifying
    @Query("UPDATE UserEntity u SET u.state = :state, u.updatedAt = CURRENT_TIMESTAMP WHERE u.userNum = :userNum")
    int delUserState(@Param("userNum") int userNum, @Param("state") String state);

    Optional<UserEntity> findByUserId(String userId);
}
