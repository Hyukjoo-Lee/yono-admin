package com.yono.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yono.dao.NoticeDAO;
import com.yono.dto.NoticeDTO;
import com.yono.entity.NoticeEntity;
import com.yono.entity.UserEntity;

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

        // userEntity가 null이면 예외를 던져서 null 저장을 방지
        if (entity.getUserEntity() == null) {
            throw new RuntimeException("User entity is required for saving the notice.");
        }

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

        // UserEntity를 다시 설정
        if (noticeDto.getUserId() != null && !noticeDto.getUserId().isEmpty()) {
            Optional<UserEntity> user = userService.findByUserId(noticeDto.getUserId());
            if (user.isPresent()) {
                existingNotice.setUserEntity(user.get());  // Optional에서 UserEntity를 추출
            } else {
                throw new RuntimeException("ID에 해당하는 사용자를 찾을 수 없습니다.: " + noticeDto.getUserId());
            }
        } else {
            throw new RuntimeException("공지사항 업데이트를 위해서는 사용자 ID가 필요합니다.");
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
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt() != null ? dto.getUpdatedAt().toLocalDateTime() : null);

        // UserEntity를 userId를 통해 조회해서 설정
        if (dto.getUserId() != null && !dto.getUserId().isEmpty()) {
            Optional<UserEntity> user = userService.findByUserId(dto.getUserId());
            if (user.isPresent()) {  // Optional이 비어 있지 않으면
                entity.setUserEntity(user.get());  // UserEntity 객체를 추출하여 설정
            } else {
                throw new RuntimeException("ID에 해당하는 사용자를 찾을 수 없습니다.: " + dto.getUserId());
            }
        }

        return entity;
    }
}
