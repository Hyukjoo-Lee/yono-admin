package com.yono.dao;

import java.util.List;
import java.util.Optional;

import com.yono.entity.NoticeEntity;

public interface NoticeDAO {
    List<NoticeEntity> searchNotice(String keyword);
    void deleteByNotice (List<Integer> ids);
    void saveNotice(NoticeEntity notice);
    NoticeEntity findById(int id);   
    Optional<NoticeEntity> findNoticeById(int id);
}
