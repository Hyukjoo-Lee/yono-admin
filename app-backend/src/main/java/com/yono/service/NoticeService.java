package com.yono.service;

import java.util.List;

import com.yono.vo.NoticeVO;

public interface NoticeService {
    
    List<NoticeVO> searchNotice(String keyword);
    void deleteByNotice (List<Integer> ids);
    void saveNotice(NoticeVO notice);
    NoticeVO getNoticeById(int id); 
    boolean updateNotice(NoticeVO noticeVO);
}
