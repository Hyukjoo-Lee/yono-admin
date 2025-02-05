package com.yono.entity;

import java.sql.Timestamp;
import java.util.List;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

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
    private int cardId;

    // 카드 이름 (최대 길이 100, 필수, 중복 X)
    @NotNull
    @Size(max = 100)
    @Column(name = "card_title", nullable = false, unique = true, length = 100)
    private String cardTitle;

    // 카드 회사 (최대 길이 50, 필수)
    @NotNull
    @Size(max = 50)
    @Column(name = "card_provider", nullable = false, length = 50)
    private String cardProvider;

    // 기관 코드 (고정 길이 4자리, 선택)
    @Size(min = 4, max = 4, message = "기관 코드는 정확히 4자리여야 합니다.")
    @Column(name = "organization_code", nullable = false, length = 4)
    private String organizationCode;

    // 카드 이미지 URL (최대 길이 255, 선택)
    @Size(max = 255)
    @Column(name = "card_img_url", nullable = true, length = 255)
    private String cardImgUrl;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false, nullable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;

    // 카드 혜택 (1:N 관계, 카드 삭제 시 혜택도 삭제됨)
    @OneToMany(mappedBy = "cardEntity", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<CardBenefitEntity> cardBenefits;
}