package com.yono.vo;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@SequenceGenerator(name = "user_seq_generator", sequenceName = "user_seq", initialValue = 1, allocationSize = 1)
@Table(name = "user_info")
public class UserVO {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq_generator")
    @Column(name = "user_num")
    private int userNum;

    @Column(name = "user_id", nullable = false, unique = true)
    private String userId;

    @ToString.Exclude
    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "detail_address")
    private String detailAddress;

    @Column(name = "postcode")
    private String postcode;

    @Column(name = "spending_target", columnDefinition = "int default 0")
    private int spendingTarget = 0;

    @Column(name = "profile", columnDefinition = "varchar2(255) default 'temp_profile'")
    private String profile = "temp_profile";

    @Column(name = "state")
    private int state; // 회원일때 1, 탈퇴회원 0

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PreUpdate
    public void preUpdate() {
        // 상태가 변경되면 updatedAt이 자동으로 갱신됩니다.
        if (this.state == 0) {
            this.updatedAt = LocalDateTime.now();
        }
    }
}
