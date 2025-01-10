package com.yono.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.yono.vo.NoticeVO;

@Repository
public class NoticeDAOImpl implements NoticeDAO {

    @Autowired
    private NoticeRepository NoticeRepo;

    @Override
    public List<NoticeVO> searchNotice(String keyword) {
        return NoticeRepo.searchNotice(keyword);
    }

    @Override
    public void deleteByNotice(List<Integer> ids) {
        NoticeRepo.deleteByNotice(ids);
    }
}
