package com.yono.vo;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    @CreationTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
}
