package com.unipay.unipay_backend.controller;

import com.unipay.unipay_backend.entity.Merchant;
import com.unipay.unipay_backend.repository.MerchantRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/merchants")
@CrossOrigin(origins = "http://localhost:5173")
public class MerchantController {

    private final MerchantRepository merchantRepository;

    public MerchantController(MerchantRepository merchantRepository) {
        this.merchantRepository = merchantRepository;
    }

    @GetMapping
    public List<Merchant> getAllMerchants() {
        return merchantRepository.findAll();
    }

    @GetMapping("/{id}")
    public Merchant getMerchantById(@PathVariable Integer id) {
        return merchantRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Merchant addMerchant(@RequestBody Merchant merchant) {
        return merchantRepository.save(merchant);
    }

    @PutMapping("/{id}")
    public Merchant updateMerchant(@PathVariable Integer id,
                                   @RequestBody Merchant merchant) {

        Merchant existingMerchant =
                merchantRepository.findById(id).orElse(null);

        if (existingMerchant == null) {
            return null;
        }

        existingMerchant.setMerchantCode(merchant.getMerchantCode());
        existingMerchant.setMerchantName(merchant.getMerchantName());
        existingMerchant.setEmail(merchant.getEmail());
        existingMerchant.setCategory(merchant.getCategory());
        existingMerchant.setDefaultGatewayId(merchant.getDefaultGatewayId());
        existingMerchant.setStatus(merchant.getStatus());

        return merchantRepository.save(existingMerchant);
    }

    @DeleteMapping("/{id}")
    public String deleteMerchant(@PathVariable Integer id) {

        if (!merchantRepository.existsById(id)) {
            return "Merchant not found";
        }

        merchantRepository.deleteById(id);

        return "Merchant deleted successfully";
    }
}