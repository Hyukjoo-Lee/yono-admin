package com.yono.entity;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
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
@ToString(exclude = "cardEntity")
@Entity
@SequenceGenerator(name = "card_benefit_seq_generator", sequenceName = "card_benefit_seq", initialValue = 1, allocationSize = 1)
@Table(name = "card_benefit")
public class CardBenefitEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "card_benefit_seq_generator")
    @Column(name = "benefit_id")
    private int benefitId;

    @Column(name = "benefit_title", nullable = false)
    private String benefitTitle;

    @Column(name = "benefit_value", nullable = false)
    private String benefitValue;

    @Column(name = "benefit_type", nullable = false)
    private String benefitType;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @ManyToOne
    @JoinColumn(name = "card_id", referencedColumnName = "card_id", nullable = false)
    private CardEntity cardEntity;
}
