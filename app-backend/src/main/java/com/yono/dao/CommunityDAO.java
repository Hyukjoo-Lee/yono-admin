package com.yono.dao;

import java.util.List;

import com.yono.entity.CommunityEntity;

public interface CommunityDAO {
    List<CommunityEntity> searchByCategory(String keyword);
    List<CommunityEntity> searchByName(String keyword);
    List<CommunityEntity> searchByTitle(String keyword);
    void deleteByIds (List<Integer> ids);
}
