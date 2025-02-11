package com.yono.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.yono.entity.CommunityEntity;

public interface CommunityRepository extends JpaRepository<CommunityEntity, Integer> {

     /**
     * 카테고리를 기준으로 게시글 검색
     *
     * @param keyword 검색어
     * @return 검색된 게시글 목록
     */
    @Query("SELECT c FROM CommunityEntity c WHERE "
            + "(:keyword IS NULL OR LOWER(c.category) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<CommunityEntity> searchByCategory(@Param("keyword") String keyword);


    /**
     * 작성자를 기준으로 게시글 검색
     *
     * @param keyword 검색어
     * @return 검색된 게시글 목록
     */
    @Query("SELECT c FROM CommunityEntity c WHERE "
            + "(:keyword IS NULL OR LOWER(c.userEntity.userId) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<CommunityEntity> searchByName(@Param("keyword") String keyword);

    /**
     * 제목을 기준으로 게시글 검색
     *
     * @param keyword 검색어
     * @return 검색된 게시글 목록
     */
    @Query("SELECT c FROM CommunityEntity c WHERE "
            + "(:keyword IS NULL OR LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<CommunityEntity> searchByTitle(@Param("keyword") String keyword);

    /**
     * 여러 개의 게시글 삭제
     *
     * @param ids 삭제할 게시글 ID 목록
     */
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM post WHERE no IN (:ids)", nativeQuery = true)
    void deleteByIds(@Param("ids") List<Integer> ids);
}
