package com.unipay.unipay_backend.repository;

import com.unipay.unipay_backend.entity.Merchant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MerchantRepository extends JpaRepository<Merchant, Integer> {

}