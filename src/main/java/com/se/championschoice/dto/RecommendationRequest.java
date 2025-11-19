package com.se.championschoice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RecommendationRequest {

  @JsonProperty("user_id")
  private int user_id;

  @JsonProperty("top_n")
  private int top_n;

  public RecommendationRequest(int user_id, int top_n) {

    this.user_id = user_id;

    this.top_n = top_n;

  }

  @JsonProperty("user_id")
  public int getUserId() {
    return user_id;

  }

  @JsonProperty("top_n")
  public int getTopN() {
    return top_n;

  }

}
