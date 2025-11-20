package com.se.championschoice.recommender;

import com.se.championschoice.dto.*;
import com.se.championschoice.order.Order;
import com.se.championschoice.order.OrderItem;
import com.se.championschoice.order.OrderRepository;
import com.se.championschoice.product.Product;
import com.se.championschoice.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommenderService {

  @Autowired
  private RestTemplate restTemplate;

  @Autowired
  private OrderRepository orderRepository;

  @Autowired
  private ProductRepository productRepository;

  private final String FASTAPI_URL = "http://localhost:8000/recommend/for-user";

  /**
   * NEW METHOD: Get recommendations based on customer's order history.
   * 
   * This is what shows in the "Recommended for You" section on the shopping page.
   * 
   * Flow:
   * 1. Get customer's order history
   * 2. Extract sports from purchased products
   * 3. Send sports to FastAPI
   * 4. FastAPI returns recommended sport
   * 5. Query database for products in that sport
   * 6. Return products to display
   */
  public FinalRecommendationResponse getRecommendationsForCustomer(Long customerId, int topN) {

    // Step 1: Get customer's order history
    List<Order> orders = orderRepository.findByCustomerId(customerId);

    // Step 2: Extract sports from all purchased products
    List<String> purchasedSports = new ArrayList<>();

    for (Order order : orders) {
      for (OrderItem item : order.getItems()) {
        Product product = item.getProduct();
        if (product != null && product.getSport() != null) {
          purchasedSports.add(product.getSport());
        }
      }
    }

    // Handle case where customer has no order history
    if (purchasedSports.isEmpty()) {
      // Return popular products from database (fallback)
      return getPopularProducts(topN);
    }

    // Step 3: Call FastAPI with purchased sports
    PurchaseHistoryRequest request = new PurchaseHistoryRequest(purchasedSports);

    RecommendedSportsResponse fastApiResponse = restTemplate.postForObject(
        FASTAPI_URL,
        request,
        RecommendedSportsResponse.class);

    // Step 4: Get the recommended sport from FastAPI
    String recommendedSport = fastApiResponse.getRecommendedSport();

    // Step 5: Query database for products in that sport
    List<Product> productsInSport = productRepository.findBySportIgnoreCase(recommendedSport);

    // Limit to topN products
    List<Product> limitedProducts = productsInSport.stream()
        .limit(topN)
        .collect(Collectors.toList());

    // Step 6: Convert to MappedProduct DTOs
    List<MappedProduct> mappedProducts = limitedProducts.stream()
        .map(p -> new MappedProduct(
            p.getId(),
            p.getName(),
            p.getDescription(),
            p.getPrice(),
            p.getImageUrl(),
            p.getSport()))
        .collect(Collectors.toList());

    return new FinalRecommendationResponse(mappedProducts);
  }

  /**
   * Fallback method: Return popular products when customer has no order history.
   */
  private FinalRecommendationResponse getPopularProducts(int topN) {
    // Get first N products from database (you can add ORDER BY logic here)
    List<Product> products = productRepository.findAll().stream()
        .limit(topN)
        .collect(Collectors.toList());

    List<MappedProduct> mappedProducts = products.stream()
        .map(p -> new MappedProduct(
            p.getId(),
            p.getName(),
            p.getDescription(),
            p.getPrice(),
            p.getImageUrl(),
            p.getSport()))
        .collect(Collectors.toList());

    return new FinalRecommendationResponse(mappedProducts);
  }
}
