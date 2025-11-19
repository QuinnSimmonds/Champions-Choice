
package com.se.championschoice.recommender;

import com.se.championschoice.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class RecommenderService {

  @Autowired
  private RestTemplate restTemplate;

  @Autowired
  private RecommendationMapper recommendationMapper;

  private final String FASTAPI_URL = "http://localhost:8000/recommend/by-id";

  public FinalRecommendationResponse getRecommendations(int userId, int topN) {

    RecommendationRequest request = new RecommendationRequest(userId, topN);

    RecommendationResponse synthetic = restTemplate.postForObject(
        FASTAPI_URL,
        request,
        RecommendationResponse.class);

    List<MappedProduct> mapped = recommendationMapper.mapToRealProducts(synthetic.getRecommendations());

    return new FinalRecommendationResponse(mapped);
  }
}
