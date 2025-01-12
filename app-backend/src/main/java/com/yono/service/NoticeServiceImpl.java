package com.yono.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yono.dao.NoticeDAO;
import com.yono.vo.NoticeVO;

@Service
public class NoticeServiceImpl implements NoticeService {
    @Autowired
    private NoticeDAO noticeDao;

    @Override
    public List<NoticeVO> searchNotice(String keyword) {
        return noticeDao.searchNotice(keyword);
    }

    @Transactional
    @Override
    public void deleteByNotice(List<Integer> ids) {
        noticeDao.deleteByNotice(ids);
    }

    @Override
    public void saveNotice(NoticeVO notice) {
        noticeDao.saveNotice(notice);
    }
}
