package com.yono.dao;

import java.util.List;
import java.util.Optional;

import com.yono.vo.NoticeVO;

public interface NoticeDAO {
    List<NoticeVO> searchNotice(String keyword);
    void deleteByNotice (List<Integer> ids);
    void saveNotice(NoticeVO notice);
    NoticeVO findById(int id);   
    Optional<NoticeVO> findNoticeById(int id);
}
