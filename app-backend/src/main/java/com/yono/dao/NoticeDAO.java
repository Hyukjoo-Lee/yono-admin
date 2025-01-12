package com.yono.dao;

import java.util.List;

import com.yono.vo.NoticeVO;

public interface NoticeDAO {
    List<NoticeVO> searchNotice(String keyword);
    void deleteByNotice (List<Integer> ids);
    void saveNotice(NoticeVO notice);
}
