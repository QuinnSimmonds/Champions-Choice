package com.se.championschoice.dto;

import java.math.BigDecimal;

public class MappedProduct {

  private Long id;
  private String name;
  private String description;
  private BigDecimal price;
  private String imageUrl;
  private String sport;

  public MappedProduct(Long id, String name, String description, BigDecimal price, String imageUrl, String sport) {

    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this.sport = sport;

  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getDescription() {
    return description;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public String getSport() {
    return sport;
  }

}
