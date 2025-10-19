package com.se.championschoice.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    //Registration
    public Customer register(Customer customer) {
        //check if username already exists
        if (customerRepository.existsByUsername(customer.getUsername())) {
            throw new RuntimeException("Username Already Taken");
        }

        //check if email already exists
        if (customerRepository.existsByEmail(customer.getEmail())) {
            throw new RuntimeException("Email Already Exists");
        }

        //Save and return
        return customerRepository.save(customer);
    }

    //Login
    public Customer login(String username, String password) {
        //find customer by username
        Customer customer = customerRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Customer Username Not Found"));

        //check password
        if (!customer.getPassword().equals(password)) {
            throw new RuntimeException("Incorrect Password");
        }

        return customer;
    }

    //Get Customer by ID
    public Customer getById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

}
