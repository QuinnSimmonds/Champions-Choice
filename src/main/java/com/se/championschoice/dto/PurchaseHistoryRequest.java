package com.se.championschoice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class PurchaseHistoryRequest {

  @JsonProperty("purchased_sports")
  private List<String> purchasedSports;

  public PurchaseHistoryRequest(List<String> purchasedSports) {
    this.purchasedSports = purchasedSports;
  }

  @JsonProperty("purchased_sports")
  public List<String> getPurchasedSports() {
    return purchasedSports;
  }

  public void setPurchasedSports(List<String> purchasedSports) {
    this.purchasedSports = purchasedSports;
  }
}
