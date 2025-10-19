package com.se.championschoice.cart;

import com.se.championschoice.customer.Customer;
import com.se.championschoice.product.Product;
import jakarta.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "Cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "added_at")
    private LocalDateTime addedAt;


    //JPA Constructor
    public Cart() {
    }

    //Dev Constructor
    public Cart(Product product, Customer customer, Integer quantity) {
        this.product = product;
        this.customer = customer;
        this.quantity = quantity;
    }

    //Time Stamp
    @PrePersist
    protected void onCreate() {
        addedAt = LocalDateTime.now();
    }


    //Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public LocalDateTime getAddedAt() {
        return addedAt;
    }

    public void setAddedAt(LocalDateTime addedAt) {
        this.addedAt = addedAt;
    }
}
