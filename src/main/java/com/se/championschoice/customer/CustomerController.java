package com.se.championschoice.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    //Register
    @PostMapping("/register")
    public Customer register(@RequestBody Customer customer) {
        return customerService.register(customer);
    }

    //Login
    @PostMapping("/login")
    public Customer login(@RequestBody Customer loginRequest) {
        return customerService.login(loginRequest.getUsername(), loginRequest.getPassword());
    }

    //Get Profile
    @GetMapping("/{id}")
    public Customer getProfile(@PathVariable Long id) {
        return customerService.getById(id);
    }

    //Delete Account
    @DeleteMapping("/{id}")
    public Map<String, String> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Customer Account Deleted");
        return response;
    }
}
