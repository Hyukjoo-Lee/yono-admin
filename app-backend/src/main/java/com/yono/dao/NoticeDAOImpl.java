package com.yono.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.yono.entity.NoticeEntity;

@Repository
public class NoticeDAOImpl implements NoticeDAO {

    @Autowired
    private NoticeRepository noticeRepo;

    @Override
    public List<NoticeEntity> searchNotice(String keyword) {
        return noticeRepo.searchNotice(keyword);
    }

    @Override
    public void deleteByNotice(List<Integer> ids) {
        noticeRepo.deleteByNotice(ids);
    }

    @Override
    public void saveNotice(NoticeEntity notice) {
        noticeRepo.save(notice);
    }

    @Override
    public NoticeEntity findById(int id) {
        return noticeRepo.findById(id).orElse(null);
    }

    @Override
    public Optional<NoticeEntity> findNoticeById(int id) {
        return noticeRepo.findById(id); // ID로 조회
    }
}
