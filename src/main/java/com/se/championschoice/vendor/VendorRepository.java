package com.se.championschoice.vendor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {

    //find vendor by username
    Optional<Vendor> findByUsername(String username);

    //find vendor by email
    Optional<Vendor> findByEmail(String email);

    //check if username exists
    boolean existsByUsername(String username);

    //check if email exists
    boolean existsByEmail(String email);



}
