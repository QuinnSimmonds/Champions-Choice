package com.se.championschoice.dto;

import java.util.List;

public class FinalRecommendationResponse {

  private List<MappedProduct> products;

  public FinalRecommendationResponse(List<MappedProduct> products) {
    this.products = products;
  }

  public List<MappedProduct> getProducts() {
    return products;
  }
}
