package com.se.championschoice.recommender;

import com.se.championschoice.dto.FinalRecommendationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommendations")
public class RecommenderController {

  @Autowired
  private RecommenderService recommenderService;

  /**
   * NEW ENDPOINT: Get recommendations for a customer based on their order
   * history.
   * 
   * This endpoint is what the frontend calls to show "Recommended for You"
   * section.
   * 
   * Example: GET /api/recommendations/for-customer/5?topN=10
   * 
   * Returns: List of recommended products based on what sports they've bought
   * before.
   */
  @GetMapping("/for-customer/{customerId}")
  public FinalRecommendationResponse recommendForCustomer(
      @PathVariable Long customerId,
      @RequestParam(defaultValue = "10") int topN) {
    return recommenderService.getRecommendationsForCustomer(customerId, topN);
  }
}
