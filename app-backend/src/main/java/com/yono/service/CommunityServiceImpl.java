package com.yono.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yono.dao.CommunityDAO;
import com.yono.vo.CommunityVO;

@Service
public class CommunityServiceImpl implements CommunityService {
    
    @Autowired
    private CommunityDAO communityDao;

    @Override
    public List<CommunityVO> searchByCategory(String keyword) {
        return communityDao.searchByCategory(keyword);
    }

    @Override
    public List<CommunityVO> searchByName(String keyword) {
        return communityDao.searchByName(keyword);
    }

    @Override
    public List<CommunityVO> searchByTitle(String keyword) {
        return communityDao.searchByTitle(keyword);
    }

    @Transactional
    @Override
    public void deleteByIds(List<Integer> ids) {
        communityDao.deleteByIds(ids);
    }

}
