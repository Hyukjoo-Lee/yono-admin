package com.yono.dao;

import java.util.List;

import com.yono.vo.CommunityVO;

public interface CommunityDAO {
    List<CommunityVO> searchByCategory(String keyword);
    List<CommunityVO> searchByName(String keyword);
    List<CommunityVO> searchByTitle(String keyword);
    void deleteByIds (List<Integer> ids);
}
