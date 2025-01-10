package com.yono.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.yono.vo.CommunityVO;

public interface CommunityRepository extends JpaRepository<CommunityVO, Integer> {

    @Query("SELECT c FROM CommunityVO c WHERE "
            + "(:keyword IS NULL OR LOWER(c.category) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<CommunityVO> searchByCategory(@Param("keyword") String keyword);

    @Query("SELECT c FROM CommunityVO c WHERE "
            + "(:keyword IS NULL OR LOWER(c.userid) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<CommunityVO> searchByName(@Param("keyword") String keyword);

    @Query("SELECT c FROM CommunityVO c WHERE "
            + "(:keyword IS NULL OR LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<CommunityVO> searchByTitle(@Param("keyword") String keyword);

    @Modifying
    @Query(value = "DELETE FROM tbl_posts WHERE no IN (:ids)", nativeQuery = true)
    void deleteByIds(@Param("ids") List<Integer> ids);
}
