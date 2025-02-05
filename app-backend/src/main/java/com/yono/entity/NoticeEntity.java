package com.yono.entity;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity
@SequenceGenerator(name = "no_seq_genotice", sequenceName = "notice_seq", initialValue = 1, allocationSize = 1)
@Table(name = "notice")
public class NoticeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "no_seq_genotice")
  @Column(name = "notice_no")
  private int noticeNo;

  @Size(min = 1, max = 50)
  @Column(name = "title", nullable = false, length = 50)
  private String title;

  @Size(min = 10, max = 4000)
  @Column(name = "content", nullable = false, length = 4000)
  private String content;

  @Size(max = 255)
  @Column(name = "img_url", length = 255)
  private String imgurl;

  @CreationTimestamp
  @Column(name = "created_at")
  private Timestamp createdAt;

  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  @ManyToOne
  @JoinColumn(name = "user_num", referencedColumnName = "user_num", nullable = false, foreignKey = @ForeignKey(name = "fk_notice_user_num"))
  private UserEntity userEntity;

  @PrePersist
  public void prePersist() {
    if (updatedAt == null) {
      updatedAt = null;
    }
  }

  @PreUpdate
  public void preUpdate() {
    if (updatedAt == null) {
      updatedAt = LocalDateTime.now();
    }
  }
}