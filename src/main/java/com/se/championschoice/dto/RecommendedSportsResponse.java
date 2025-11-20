package com.se.championschoice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RecommendedSportsResponse {

  @JsonProperty("recommended_sport")
  private String recommendedSport;

  // Default constructor for Jackson
  public RecommendedSportsResponse() {
  }

  @JsonProperty("recommended_sport")
  public String getRecommendedSport() {
    return recommendedSport;
  }

  public void setRecommendedSport(String recommendedSport) {
    this.recommendedSport = recommendedSport;
  }
}
