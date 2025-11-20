package com.se.championschoice.customer;

import com.se.championschoice.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

  @Autowired
  private CustomerService customerService;

  // Register
  @PostMapping("/register")
  public Customer register(@RequestBody Customer customer) {
    return customerService.register(customer);
  }

  // Login
  @PostMapping("/login")
  public LoginResponse login(@RequestBody LoginRequest request) {
    return customerService.login(request.getUsername(), request.getPassword());
  }

  // Get Profile
  @GetMapping("/{id}")
  public Customer getProfile(@PathVariable Long id) {
    return customerService.getById(id);
  }

  // Verify Email
  @GetMapping("/verify")
  public Map<String, String> verifyEmail(@RequestParam String token) {
    return customerService.verifyEmail(token);
  }

  // Delete Account
  @DeleteMapping("/{id}")
  public Map<String, String> deleteCustomer(@PathVariable Long id) {
    customerService.deleteCustomer(id);

    Map<String, String> response = new HashMap<>();
    response.put("message", "Customer Account Deleted");
    return response;
  }
}
