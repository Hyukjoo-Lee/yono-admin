package com.yono.entity;

import java.sql.Timestamp;
import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity
@SequenceGenerator(name = "no_seq_gename", sequenceName = "posts_seq", initialValue = 1, allocationSize = 1)
@Table(name = "post")
public class CommunityEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE, // 사용할 전략을 시퀀스로 선택
                        generator = "no_seq_gename") // 시퀀스 생성기에 설정해 놓은 시퀀스 제너레이터 이름
        @Column(name = "no")
        private int pno;

        @NotNull
        @Size(max = 100)
        @Column(name = "title", nullable = false, length = 50)
        private String title;

        @Size(max = 50)
        @Column(name = "category", nullable = false, length = 50)
        private String category;

        @Size(max = 4000)
        @Column(name = "content", nullable = false, length = 4000)
        private String content;

        @CreationTimestamp
        @Column(name = "regdate", updatable = false, nullable = false, length = 8)
        private LocalDate regdate;

        @Column(name = "viewcnt", nullable = false)
        private int viewcnt = 0;

        @Size(max = 255)
        @Column(name = "imgurl", length = 255)
        private String imgurl;

        @CreationTimestamp
        @Column(name = "created_at", updatable = false, nullable = false)
        private Timestamp createdAt;

        @UpdateTimestamp
        @Column(name = "updated_at", nullable = false)
        private Timestamp updatedAt;

        @ManyToOne
        @JoinColumn(name = "user_num", referencedColumnName = "user_num", nullable = false, foreignKey = @ForeignKey(name = "fk_post_user_num"))
        private UserEntity userEntity;
}