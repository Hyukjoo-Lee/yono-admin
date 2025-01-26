package com.yono.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.yono.entity.CommunityEntity;

@Repository
public class CommunityDAOImpl implements CommunityDAO{
    
    @Autowired
    private CommunityRepository communityRepo;

    @Override
    public List<CommunityEntity> searchByCategory(String keyword) {
        return communityRepo.searchByCategory(keyword);
    }

    @Override
    public List<CommunityEntity> searchByName(String keyword) {
        return communityRepo.searchByName(keyword);
    }

    @Override
    public List<CommunityEntity> searchByTitle(String keyword) {
        return communityRepo.searchByTitle(keyword);
    }

    @Override
    public void deleteByIds(List<Integer> ids) {
        communityRepo.deleteByIds(ids);
    }

    @Override
    public CommunityEntity findById(int id) {
        return communityRepo.findById(id).orElse(null);
    }
}
