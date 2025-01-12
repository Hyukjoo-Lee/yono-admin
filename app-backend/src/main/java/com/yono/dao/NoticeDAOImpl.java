package com.yono.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.yono.vo.NoticeVO;

@Repository
public class NoticeDAOImpl implements NoticeDAO {

    @Autowired
    private NoticeRepository noticeRepo;

    @Override
    public List<NoticeVO> searchNotice(String keyword) {
        return noticeRepo.searchNotice(keyword);
    }

    @Override
    public void deleteByNotice(List<Integer> ids) {
        noticeRepo.deleteByNotice(ids);
    }

    @Override
    public void saveNotice(NoticeVO notice) {
        noticeRepo.save(notice);
    }
}
