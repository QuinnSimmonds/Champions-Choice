package com.se.championschoice.vendor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.se.championschoice.product.ProductRepository;

@Service
public class VendorService {

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private ProductRepository productRepository;

    //Registration
    public Vendor register(Vendor vendor) {
        //check if username already exists
        if (vendorRepository.existsByUsername(vendor.getUsername())) {
            throw new RuntimeException("Username Already Taken");
        }

        //check if email already exists
        if (vendorRepository.existsByEmail(vendor.getEmail())) {
            throw new RuntimeException("Email Already Registered");
        }

        //Save and return
        return vendorRepository.save(vendor);
    }

    //Login
    public Vendor login(String username, String password) {
        //find vendor by username
        Vendor vendor = vendorRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Vendor Username Not Found"));

        //check password
        if (!vendor.getPassword().equals(password)) {
            throw new RuntimeException("Incorrect Password");
        }

        return vendor;
    }

    //Get Vendor by ID
    public Vendor getById(Long id) {
        return vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor Not Found"));
    }

    //Delete Vendor by ID
    public void deleteVendor(Long id) {
        //check if vendor exists
        if (!vendorRepository.existsById(id)) {
            throw new RuntimeException("Vendor Not Found");
        }

        //delete all products
        productRepository.deleteAllByVendorId(id);

        //delete the vendor
        vendorRepository.deleteById(id);
    }
}
