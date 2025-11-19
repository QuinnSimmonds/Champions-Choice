
package com.se.championschoice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class RecommendationResponse {

  @JsonProperty("user_id")
  private int user_id;

  @JsonProperty("recommendations")
  private List<SyntheticItem> recommendations;

  @JsonProperty("user_id")
  public int getUser_id() {
    return user_id;
  }

  @JsonProperty("recommendations")
  public List<SyntheticItem> getRecommendations() {
    return recommendations;
  }
}
