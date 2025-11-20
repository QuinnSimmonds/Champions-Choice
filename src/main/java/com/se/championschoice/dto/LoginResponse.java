package com.se.championschoice.dto;

public class LoginResponse {
  private Long id;
  private String username;
  private String email;
  private String role;
  private String token;
  private Boolean isVerified;

  public LoginResponse(Long id, String username, String email, String role, String token, Boolean isVerified) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
    this.token = token;
    this.isVerified = isVerified;

  }

  // Getters
  public Long getId() {
    return id;
  }

  public String getUsername() {
    return username;
  }

  public String getEmail() {
    return email;
  }

  public String getRole() {
    return role;
  }

  public String getToken() {
    return token;
  }

  public Boolean getIsVerified() {
    return isVerified;
  }

  public void setIsVerified(Boolean isVerified) {
    this.isVerified = isVerified;
  }
}
