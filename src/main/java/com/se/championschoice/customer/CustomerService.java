package com.se.championschoice.customer;

import com.se.championschoice.cart.CartRepository;
import com.se.championschoice.security.JwtUtil;
import com.se.championschoice.dto.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class CustomerService {

  @Autowired
  private JwtUtil jwtUtil;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private CustomerRepository customerRepository;

  @Autowired
  private CartRepository cartRepository;

  @Autowired
  private EmailService emailService;

  private void validatePassword(String password) {
    if (password == null || password.length() < 8) {
      throw new RuntimeException("Password must be at least 8 characters long");
    }

    if (!password.matches(".*[A-Z].*")) {
      throw new RuntimeException("Password must contain at least one uppercase letter");
    }

    if (!password.matches(".*[a-z].*")) {
      throw new RuntimeException("Password must contain at least one lowercase letter");
    }

    if (!password.matches(".*\\d.*")) {
      throw new RuntimeException("Password must contain at least one number");
    }

    if (!password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*")) {
      throw new RuntimeException("Password must contain at least one special character");
    }
  }

  // verify email
  public Map<String, String> verifyEmail(String token) {
    Map<String, String> response = new HashMap<>();

    // Find customer by token
    Customer customer = customerRepository.findByVerificationToken(token)
        .orElseThrow(() -> new RuntimeException("Invalid verification token"));

    // Check if token expired
    if (customer.getVerificationTokenExpiry().isBefore(LocalDateTime.now())) {
      response.put("message", "Verification link has expired. Please request a new one.");
      response.put("status", "expired");
      return response;
    }

    // Check if already verified
    if (customer.getIsVerified()) {
      response.put("message", "Email already verified!");
      response.put("status", "already_verified");
      return response;
    }

    // Mark as verified
    customer.setIsVerified(true);
    customer.setVerificationToken(null); // Clear token
    customerRepository.save(customer);

    response.put("message", "Email verified successfully!");
    response.put("status", "success");
    return response;
  }

  // Registration
  public Customer register(Customer customer) {
    // check if username already exists
    if (customerRepository.existsByUsername(customer.getUsername())) {
      throw new RuntimeException("Username Already Taken");
    }

    // check if email already exists
    if (customerRepository.existsByEmail(customer.getEmail())) {
      throw new RuntimeException("Email Already Exists");
    }

    // validate password
    validatePassword(customer.getPassword());

    // encode password before saving to database
    String hashedPassword = passwordEncoder.encode(customer.getPassword());
    customer.setPassword(hashedPassword);

    // Generate verification token
    String token = "abcdefg";
    customer.setVerificationToken(token);
    customer.setVerificationTokenExpiry(LocalDateTime.now().plusHours(24));
    customer.setIsVerified(false);

    // Save customer
    Customer savedCustomer = customerRepository.save(customer);

    // Send verification email
    try {
      emailService.sendVerificationEmail(
          savedCustomer.getEmail(),
          savedCustomer.getFirstName(),
          token);
    } catch (Exception e) {
      // Log error but don't fail registration
      System.err.println("Failed to send verification email: " + e.getMessage());
    }

    // save and return
    return savedCustomer;
  }

  // Login
  public LoginResponse login(String username, String password) {
    // find customer by username
    Customer customer = customerRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Customer Username Not Found"));

    // Check if account is currently locked
    if (customer.getLockoutUntil() != null && customer.getLockoutUntil().isAfter(LocalDateTime.now())) {
      long minutesRemaining = java.time.Duration.between(LocalDateTime.now(), customer.getLockoutUntil()).toMinutes();
      throw new RuntimeException("Account is locked. Try again in " + minutesRemaining + " minute(s)");
    }

    // If lockout time has passed, reset failed attempts
    if (customer.getLockoutUntil() != null && customer.getLockoutUntil().isBefore(LocalDateTime.now())) {
      customer.setFailedLoginAttempts(0);
      customer.setLockoutUntil(null);
      customerRepository.save(customer);
    }

    // Check password
    if (!passwordEncoder.matches(password, customer.getPassword())) {
      // Increment failed attempts
      int attempts = customer.getFailedLoginAttempts() + 1;
      customer.setFailedLoginAttempts(attempts);

      // Lock account after 3 failed attempts (locked out for 10 minutes)
      if (attempts >= 3) {
        customer.setLockoutUntil(LocalDateTime.now().plusMinutes(10));
        customerRepository.save(customer);
        throw new RuntimeException("Account locked due to 3 failed login attempts. Try again in 10 minutes");
      }

      customerRepository.save(customer);
      int attemptsLeft = 3 - attempts;
      throw new RuntimeException("Incorrect Password. " + attemptsLeft + " attempt(s) remaining");
    }

    // Successful login - reset failed attempts
    customer.setFailedLoginAttempts(0);
    customer.setLockoutUntil(null);
    customerRepository.save(customer);

    // generate JWT
    String token = jwtUtil.generateToken(
        customer.getId(),
        customer.getEmail(),
        "CUSTOMER");

    return new LoginResponse(
        customer.getId(),
        customer.getUsername(),
        customer.getEmail(),
        "CUSTOMER",
        token,
        customer.getIsVerified());

  }

  // Get Customer by ID
  public Customer getById(Long id) {
    return customerRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Customer not found"));
  }

  // Delete Customer by ID
  public void deleteCustomer(Long id) {
    // check if customer exists
    if (!customerRepository.existsById(id)) {
      throw new RuntimeException("Customer Not Found");
    }

    // delete all cart items
    cartRepository.deleteByCustomerId(id);

    // delete the customer
    customerRepository.deleteById(id);

  }

}
