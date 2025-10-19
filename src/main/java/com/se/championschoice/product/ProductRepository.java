package com.se.championschoice.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    //find all products by vendor
    List<Product> findByVendorId(Long vendorId);

    //find products by sport
    List<Product> findBySport(String sport);

    //find products by name (search)
    List<Product> findByNameContainingIgnoreCase(String name);

    void deleteAllByVendorId(Long vendorId);

}