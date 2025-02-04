package com.yono.entity;

import java.sql.Timestamp;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
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

    @NotNull
    @Size(max = 100)
    @Column(name = "benefit_title", nullable = false, length = 100)
    private String benefitTitle;

    @NotNull
    @Size(max = 50)
    @Column(name = "benefit_value", nullable = false, length = 50)
    private String benefitValue;

    @NotNull
    @Size(max = 50)
    @Column(name = "benefit_type", nullable = false, length = 50)
    private String benefitType;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false, nullable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;

    @ManyToOne
    @JoinColumn(name = "card_id", referencedColumnName = "card_id", nullable = false, foreignKey = @ForeignKey(name = "fk_card_benefit_card_id"))
    private CardEntity cardEntity;
}
