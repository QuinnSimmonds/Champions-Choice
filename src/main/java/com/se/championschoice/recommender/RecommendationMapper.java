package com.se.championschoice.recommender;

import com.se.championschoice.dto.MappedProduct;
import com.se.championschoice.dto.SyntheticItem;
import com.se.championschoice.product.Product;
import com.se.championschoice.product.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RecommendationMapper {

  @Autowired
  private ProductRepository productRepository;

  public List<MappedProduct> mapToRealProducts(List<SyntheticItem> syntheticItems) {

    List<MappedProduct> realProducts = new ArrayList<>();

    for (SyntheticItem item : syntheticItems) {
      String sport = item.getSport();

      List<Product> dbProducts = productRepository.findTop3BySportIgnoreCase(sport);

      for (Product p : dbProducts) {
        realProducts.add(
            new MappedProduct(
                p.getId(),
                p.getName(),
                p.getDescription(),
                p.getPrice(),
                p.getImageUrl(),
                p.getSport()));
      }
    }

    Map<Long, MappedProduct> unique = new LinkedHashMap<>();

    for (MappedProduct p : realProducts) {
      unique.put(p.getId(), p);
    }

    return new ArrayList<>(unique.values());

  }

}
