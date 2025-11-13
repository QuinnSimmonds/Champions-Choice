package com.se.championschoice.order;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // get all orders for a customer
    List<Order> findByCustomerId(Long customerId);
}