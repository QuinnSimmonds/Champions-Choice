package com.se.championschoice.recommender;

import com.se.championschoice.dto.FinalRecommendationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommendations")
public class RecommenderController {

  @Autowired
  private RecommenderService recommenderService;

  @GetMapping("/user/{id}")
  public FinalRecommendationResponse recommendForUser(@PathVariable int id) {
    return recommenderService.getRecommendations(id, 5);

  }

}
