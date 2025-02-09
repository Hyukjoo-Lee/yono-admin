package com.yono.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.yono.entity.NoticeEntity;

public interface NoticeRepository extends JpaRepository<NoticeEntity, Integer> {
    
    /**
     * 키워드를 이용하여 공지사항 검색 (제목 기준)
     *
     * @param keyword 검색어
     * @return 검색된 공지사항 목록
     */
    @Query("SELECT n FROM NoticeEntity n WHERE "
            + "(:keyword IS NULL OR LOWER(n.title) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<NoticeEntity> searchNotice(@Param("keyword") String keyword);

    /**
     * 여러 개의 공지사항 삭제
     *
     * @param ids 삭제할 공지사항 ID 목록
     */
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM notice WHERE notice_no IN (:ids)", nativeQuery = true)
    void deleteByNotice(@Param("ids") List<Integer> ids);
}
