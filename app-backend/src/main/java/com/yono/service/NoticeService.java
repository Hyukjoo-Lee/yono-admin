package com.yono.service;

import java.util.List;

import com.yono.dto.NoticeDTO;

public interface NoticeService {
    
    List<NoticeDTO> searchNotice(String keyword);
    void deleteByNotice (List<Integer> ids);
    void saveNotice(NoticeDTO notice);
    NoticeDTO getNoticeById(int id); 
    boolean updateNotice(NoticeDTO noticeDto);
}
