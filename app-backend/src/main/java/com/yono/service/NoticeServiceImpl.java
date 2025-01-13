package com.yono.service;

import java.util.List;
import java.util.Optional;

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

    @Override
    public NoticeVO getNoticeById(int id) {
        NoticeVO notice = noticeDao.findById(id);
        if (notice == null) {
            throw new RuntimeException("Notice not found with ID: " + id);
        }
        return notice;
    }

@Override
    public boolean updateNotice(NoticeVO noticeVO) {
        NoticeVO existingNotice = getNoticeById(noticeVO.getNoticeNo()); // ID로 기존 공지사항 조회
        if (existingNotice == null) {
            return false;
        }

        // 기존 공지사항 데이터 수정
        existingNotice.setTitle(noticeVO.getTitle());
        existingNotice.setContent(noticeVO.getContent());
        if (noticeVO.getImgurl() != null) {
            existingNotice.setImgurl(noticeVO.getImgurl());
        }

        noticeDao.saveNotice(existingNotice); // 업데이트
        return true;
    }
}
