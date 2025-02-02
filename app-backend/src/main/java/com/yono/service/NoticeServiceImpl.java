package com.yono.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yono.dao.NoticeDAO;
import com.yono.dto.NoticeDTO;
import com.yono.entity.NoticeEntity;

@Service
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    private NoticeDAO noticeDao;

    @Autowired
    private UserService userService;

    @Override
    public List<NoticeDTO> searchNotice(String keyword) {
        // Entity -> DTO 변환
        List<NoticeEntity> entities = noticeDao.searchNotice(keyword);
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void deleteByNotice(List<Integer> ids) {
        noticeDao.deleteByNotice(ids);
    }

    @Override
    public void saveNotice(NoticeDTO noticeDto) {
        // DTO -> Entity 변환
        NoticeEntity entity = toEntity(noticeDto);
        noticeDao.saveNotice(entity);
    }

    @Override
    public NoticeDTO getNoticeById(int id) {
        NoticeEntity noticeEntity = noticeDao.findById(id);
        if (noticeEntity == null) {
            throw new RuntimeException("Notice not found with ID: " + id);
        }
        // Entity -> DTO 변환
        return toDto(noticeEntity);
    }

    @Override
    public boolean updateNotice(NoticeDTO noticeDto) {
        NoticeEntity existingNotice = noticeDao.findById(noticeDto.getNoticeNo()); // ID로 기존 공지사항 조회
        if (existingNotice == null) {
            return false;
        }

        // 기존 공지사항 데이터 수정
        existingNotice.setTitle(noticeDto.getTitle());
        existingNotice.setContent(noticeDto.getContent());
        if (noticeDto.getImgurl() != null) {
            existingNotice.setImgurl(noticeDto.getImgurl());
        }

        noticeDao.saveNotice(existingNotice); // 업데이트
        return true;
    }

    // Entity -> DTO 변환
    private NoticeDTO toDto(NoticeEntity entity) {
        if (entity == null) {
            return null;
        }

        NoticeDTO dto = new NoticeDTO();
        dto.setNoticeNo(entity.getNoticeNo());
        dto.setTitle(entity.getTitle());
        dto.setContent(entity.getContent());
        dto.setImgurl(entity.getImgurl());
        dto.setViewCount(entity.getViewCount());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt() != null ? Timestamp.valueOf(entity.getUpdatedAt()) : null);

        if (entity.getUserEntity() != null) {
            dto.setUserId(entity.getUserEntity().getUserId());
        }
        return dto;
    }

    // DTO -> Entity 변환
    private NoticeEntity toEntity(NoticeDTO dto) {
        if (dto == null) {
            return null;
        }

        NoticeEntity entity = new NoticeEntity();
        entity.setNoticeNo(dto.getNoticeNo());
        entity.setTitle(dto.getTitle());
        entity.setContent(dto.getContent());
        entity.setImgurl(dto.getImgurl());
        entity.setViewCount(dto.getViewCount());
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt() != null ? dto.getUpdatedAt().toLocalDateTime() : null);

        if (dto.getUserId() != null && !dto.getUserId().isEmpty()) {
            entity.setUserEntity(userService.findByUserId(dto.getUserId()));
        }
        return entity;
    }
}
