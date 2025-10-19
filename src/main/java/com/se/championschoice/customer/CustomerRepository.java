package com.se.championschoice.customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    //find customer by username
    Optional<Customer> findByUsername(String username);

    //find customer by email
    Optional<Customer> findByEmail(String email);

    //check if username exists
    boolean existsByUsername(String username);

    //check if email exists
    boolean existsByEmail(String email);
}
