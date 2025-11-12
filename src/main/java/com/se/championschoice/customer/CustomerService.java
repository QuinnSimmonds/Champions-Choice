package com.se.championschoice.customer;

import com.se.championschoice.cart.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;


@Service
public class CustomerService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CartRepository cartRepository;

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

	//encode password before saving to database
	String hashedPassword = passwordEncoder.encode(customer.getPassword());
	customer.setPassword(hashedPassword);

        //Save and return
        return customerRepository.save(customer);
    }

    //Login
    public Customer login(String username, String password) {
        //find customer by username
        Customer customer = customerRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Customer Username Not Found"));

        //check password based on encoding
        if (!passwordEncoder.matches(password, customer.getPassword())) {
            throw new RuntimeException("Incorrect Password");
        }

        return customer;
    }

    //Get Customer by ID
    public Customer getById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    //Delete Customer by ID
    public void deleteCustomer(Long id) {
        //check if customer exists
        if (!customerRepository.existsById(id)) {
            throw new RuntimeException("Customer Not Found");
        }

        //delete all cart items
        cartRepository.deleteByCustomerId(id);

        //delete the customer
        customerRepository.deleteById(id);



    }

}
