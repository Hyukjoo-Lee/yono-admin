package com.yono.vo;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity
@SequenceGenerator(
        name = "no_seq_genotice",
        sequenceName = "notice_seq",
        initialValue = 1,
        allocationSize = 1
)
@Table(name = "notice")
public class NoticeVO {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, // 사용할 전략을 시퀀스로 선택
            generator = "no_seq_genotice") // 시퀀스 생성기에 설정해 놓은 시퀀스 제너레이터 이름
    @Column(name = "notice_no")
    private int noticeNo;

    @Column(name = "title")
    private String title;
    @Column(name = "admin_id")
    private String adminId;
    @Column(name = "content")
    private String content;
    @Column(name = "img_url")
    private String imgurl;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        // 등록 시에는 updatedAt을 설정하지 않음
        if (updatedAt == null) {
            updatedAt = null;  // 명시적으로 null로 설정 (기본값이 null일 수도 있음)
        }
    }

    @PreUpdate
    public void preUpdate() {
        // 수정 시에는 updatedAt을 현재 시간으로 설정
        if (updatedAt == null) {
            updatedAt = LocalDateTime.now();
        }
    }
}
