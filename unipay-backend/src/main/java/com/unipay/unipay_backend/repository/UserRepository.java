package com.unipay.unipay_backend.repository;

import com.unipay.unipay_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

}

