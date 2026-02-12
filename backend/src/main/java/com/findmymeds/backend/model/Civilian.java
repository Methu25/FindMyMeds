package com.findmymeds.backend.model;

import com.findmymeds.backend.model.enums.AccountStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "civilians")
public class Civilian {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "nic_number", unique = true)
    private String nicNumber;

    @Column(nullable = false, unique = true)
    private String email;

    private String phone;

    @Column(name = "password_hash")
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(name = "account_status")
    private AccountStatus accountStatus;

    @Column(name = "temp_ban_count")
    private Integer tempBanCount = 0;

    @Column(name = "appeal_count")
    private Integer appealCount = 0;

    @Column(name = "ban_date")
    private LocalDateTime banDate;

    @Column(name = "permanent_ban_date")
    private LocalDateTime permanentBanDate;

    // Masked Data Fields for VIVO / Privacy
    @Column(name = "masked_email")
    private String maskedEmail;

    @Column(name = "masked_name")
    private String maskedName;

    @Column(name = "is_login_disabled")
    private Boolean isLoginDisabled = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "ban_reason", columnDefinition = "TEXT")
    private String banReason;

    @PreUpdate
    public void setUpdatedAt() {
        this.updatedAt = LocalDateTime.now();
    }

    // Manual Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getNicNumber() {
        return nicNumber;
    }

    public void setNicNumber(String nicNumber) {
        this.nicNumber = nicNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public AccountStatus getAccountStatus() {
        return accountStatus;
    }

    public void setAccountStatus(AccountStatus accountStatus) {
        this.accountStatus = accountStatus;
    }

    public Integer getTempBanCount() {
        return tempBanCount;
    }

    public void setTempBanCount(Integer tempBanCount) {
        this.tempBanCount = tempBanCount;
    }

    public Integer getAppealCount() {
        return appealCount;
    }

    public void setAppealCount(Integer appealCount) {
        this.appealCount = appealCount;
    }

    public LocalDateTime getBanDate() {
        return banDate;
    }

    public void setBanDate(LocalDateTime banDate) {
        this.banDate = banDate;
    }

    public LocalDateTime getPermanentBanDate() {
        return permanentBanDate;
    }

    public void setPermanentBanDate(LocalDateTime permanentBanDate) {
        this.permanentBanDate = permanentBanDate;
    }

    public String getMaskedEmail() {
        return maskedEmail;
    }

    public void setMaskedEmail(String maskedEmail) {
        this.maskedEmail = maskedEmail;
    }

    public String getMaskedName() {
        return maskedName;
    }

    public void setMaskedName(String maskedName) {
        this.maskedName = maskedName;
    }

    public Boolean getIsLoginDisabled() {
        return isLoginDisabled;
    }

    public void setIsLoginDisabled(Boolean isLoginDisabled) {
        this.isLoginDisabled = isLoginDisabled;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getBanReason() {
        return banReason;
    }

    public void setBanReason(String banReason) {
        this.banReason = banReason;
    }
}
