package com.se.championschoice.cart;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;


@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    //find all cart items for a customer
    List<Cart> findByCustomerId(Long customerId);

    //find specific cart item (customer + product combination)
    Optional<Cart> findByCustomerIdAndProductId(Long customerId, Long productId);

    //delete all cart items for a customer
    void deleteByCustomerId(Long customerId);
}
