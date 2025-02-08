package com.yono.entity;

import java.sql.Timestamp;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = "password")
@Entity
@SequenceGenerator(name = "user_seq_generator", sequenceName = "user_seq", initialValue = 1, allocationSize = 1)
@Table(name = "user_info")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq_generator")
    @Column(name = "user_num")
    private int userNum;

    // 사용자 ID (영어 소문자로 시작, 영문 + 숫자, 4~16자, 필수, 중복 X)
    @NotNull
    @Size(min = 4, max = 16)
    @Pattern(regexp = "^[a-z][a-z0-9]{3,15}$", message = "아이디는 영어 소문자로 시작하며, 4~16자 길이여야 합니다.")
    @Column(name = "user_id", nullable = false, unique = true, length = 16)
    private String userId;

    // 이메일 (이메일 형식, 필수, 중복 X)
    @NotNull
    @Size(max = 100)
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "유효한 이메일 형식이어야 합니다.")
    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    // 비밀번호 (최소 8자, 소문자 + 숫자 + 특수문자 포함, 필수)
    @NotNull
    @Column(name = "password", nullable = false, length = 255)
    private String password;

    // 이름 (한글만 허용, 2~10자)
    @NotNull
    @Size(min = 2, max = 17)
    @Pattern(regexp = "^[가-힣]{2,10}$", message = "이름은 한글만 입력 가능하며, 2~10자여야 합니다.")
    @Column(name = "name", nullable = false, length = 17)
    private String name;

    // 지출 목표 (기본값 0)
    @Column(name = "spending_target", nullable = false)
    @ColumnDefault("0")
    private int spendingTarget = 0;

    @Column(name = "profile", length = 255)
    @ColumnDefault("'temp_profile'")
    private String profile = "temp_profile";

    // 사용자 상태 (기본값 active, active: 회원, inactive: 탈퇴 회원)
    @Column(name = "state", nullable = false, length = 8)
    @ColumnDefault("'INACTIVE'")
    private String state = "INACTIVE";

    // 사용자 역할 (기본값 USER, ADMIN: 관리자, USER: 일반 회원)
    @Column(name = "user_role", nullable = false, length = 5)
    @ColumnDefault("'USER'")
    private String userRole = "USER";

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;
}
