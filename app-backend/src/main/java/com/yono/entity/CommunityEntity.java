package com.yono.entity;

import java.sql.Timestamp;
import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
        name = "no_seq_gename",
        sequenceName = "posts_seq",
        initialValue = 1,
        allocationSize = 1
)
@Table(name = "tbl_posts")
public class CommunityEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, // 사용할 전략을 시퀀스로 선택
            generator = "no_seq_gename") // 시퀀스 생성기에 설정해 놓은 시퀀스 제너레이터 이름

    private int no;

    private String title;
    private String category;

    private String content;

    @CreationTimestamp
    private LocalDate regdate;

    private int viewcnt = 0;

    private String imgurl;

    @CreationTimestamp
    private Timestamp createdAt;

    @CreationTimestamp
    private Timestamp updatedAt;

    @ManyToOne
    @JoinColumn(name = "user_num", referencedColumnName = "user_num")
    private UserEntity userEntity;
}
