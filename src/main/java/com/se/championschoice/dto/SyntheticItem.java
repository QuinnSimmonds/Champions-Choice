
package com.se.championschoice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SyntheticItem {

  @JsonProperty("item_id")
  private int item_id;

  @JsonProperty("product_name")
  private String product_name;

  @JsonProperty("brand")
  private String brand;

  @JsonProperty("sport")
  private String sport;

  @JsonProperty("item_id")
  public int getItem_id() {
    return item_id;
  }

  @JsonProperty("product_name")
  public String getProduct_name() {
    return product_name;
  }

  @JsonProperty("brand")
  public String getBrand() {
    return brand;
  }

  @JsonProperty("sport")
  public String getSport() {
    return sport;
  }
}
