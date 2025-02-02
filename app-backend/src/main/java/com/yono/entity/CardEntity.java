package com.yono.entity;

import java.sql.Timestamp;
import java.util.List;
import jakarta.persistence.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

// 카드 마스터 엔터티: 특정 카드 종류에 대한 공통 정보
@Setter
@Getter
@ToString(exclude = "cardBenefits")
@Entity
@SequenceGenerator(name = "card_seq_generator", sequenceName = "card_seq", initialValue = 1, allocationSize = 1)
@Table(name = "card")
public class CardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "card_seq_generator")
    @Column(name = "card_id")
    private int cardId; // 카드 ID (기본 키)

    // 카드 이름
    @Column(name = "card_title", nullable = false, unique = true)
    private String cardTitle;

    // 카드 회사
    @Column(name = "card_provider", nullable = false)
    private String cardProvider;

    // 기관 코드
    @Column(name = "organization_code")
    private String organizationCode;

    // 카드 이미지 URL
    @Column(name = "card_img_url", nullable = true)
    private String cardImgUrl;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "cardEntity", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<CardBenefitEntity> cardBenefits;

}