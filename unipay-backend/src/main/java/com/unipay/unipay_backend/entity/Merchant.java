package com.unipay.unipay_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "merchants")
public class Merchant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "merchant_id")
    private Integer merchantId;

    @Column(name = "merchant_code", nullable = false, unique = true)
    private String merchantCode;

    @Column(name = "merchant_name", nullable = false)
    private String merchantName;

    @Column(nullable = false, unique = true)
    private String email;

    private String category;

    @Column(name = "default_gateway_id")
    private Integer defaultGatewayId;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        Active,
        Pending,
        Suspended
    }

    public Integer getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(Integer merchantId) {
        this.merchantId = merchantId;
    }

    public String getMerchantCode() {
        return merchantCode;
    }

    public void setMerchantCode(String merchantCode) {
        this.merchantCode = merchantCode;
    }

    public String getMerchantName() {
        return merchantName;
    }

    public void setMerchantName(String merchantName) {
        this.merchantName = merchantName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getDefaultGatewayId() {
        return defaultGatewayId;
    }

    public void setDefaultGatewayId(Integer defaultGatewayId) {
        this.defaultGatewayId = defaultGatewayId;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
