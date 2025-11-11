package com.se.championschoice.config;

import java.util.*;

/**
 * domain knowledge for sports e-commerce.
 * defines valid combinations of sports, brands, and product types
 * to keep synthetic data realistic and consistent.
 *
 */
public class DataSeederHelper {

    private static final Random RANDOM = new Random();

    
    // sport and brand associations
    public static final Map<String, List<String>> SPORT_BRANDS = Map.ofEntries(
            Map.entry("Basketball", List.of("Nike", "Adidas", "Spalding", "Wilson", "Under Armour", "Jordan")),
            Map.entry("Football",   List.of("Nike", "Under Armour", "Wilson", "Riddell", "Puma")),
            Map.entry("Baseball",   List.of("Rawlings", "Wilson", "Adidas", "Nike", "Mizuno")),
            Map.entry("Tennis",     List.of("Yonex", "Wilson", "Adidas", "Babolat", "Nike", "Penn")),
            Map.entry("Golf",       List.of("Callaway", "Nike", "TaylorMade", "Titleist")),
            Map.entry("Swimming",   List.of("Speedo", "Nike", "TYR")),
            Map.entry("Running",    List.of("Nike", "Adidas", "Puma")),
            Map.entry("Fencing",    List.of("Leon Paul", "Allstar", "Fencing Post")),
            Map.entry("Weight Lifting", List.of("Gymshark", "Nike", "Adidas", "Rogue", "Pioneer")),
            Map.entry("Surfing",    List.of("Billabong", "Quiksilver", "O'Neill")),
            Map.entry("Soccer",     List.of("Nike", "Adidas", "Puma", "New Balance", "Under Armour"))
    );


    // sport and product type associations
    public static final Map<String, List<String>> SPORT_PRODUCT_TYPES = Map.ofEntries(
            Map.entry("Basketball", List.of("Shoes", "Jersey", "Ball", "Hoop")),
            Map.entry("Football",   List.of("Helmet", "Jersey", "Pads", "Ball", "Cleats")),
            Map.entry("Baseball",   List.of("Gloves", "Bat", "Baseball", "Helmet", "Jersey")),
            Map.entry("Tennis",     List.of("Racket", "Shoes", "Bag", "Towel", "Ball")),
            Map.entry("Golf",       List.of("Club", "Balls", "Gloves", "Bag")),
            Map.entry("Swimming",   List.of("Goggles", "Cap", "Towel")),
            Map.entry("Running",    List.of("Shoes", "Watch", "Towel")),
            Map.entry("Fencing",    List.of("Shoes", "Sword", "Mask", "Jacket", "Gloves")),
            Map.entry("Weight Lifting", List.of("Shoes", "Bag", "Bench", "Dumbbell", "Barbell", "Towel")),
            Map.entry("Surfing",    List.of("Board", "Wax", "Fins", "Wetsuit")),
            Map.entry("Soccer",     List.of("Ball", "Cleats", "Jersey", "Shin Guards"))
    );

    // random helper methods
    public static String randomSport() {
        List<String> sports = new ArrayList<>(SPORT_BRANDS.keySet());
        return sports.get(RANDOM.nextInt(sports.size()));
    }

    public static String randomBrandForSport(String sport) {
        List<String> brands = SPORT_BRANDS.getOrDefault(sport, List.of("Generic"));
        return brands.get(RANDOM.nextInt(brands.size()));
    }

    public static String randomProductTypeForSport(String sport) {
        List<String> types = SPORT_PRODUCT_TYPES.getOrDefault(sport, List.of("Accessory"));
        return types.get(RANDOM.nextInt(types.size()));
    }

    // product name and description
    public static String generateProductName(String sport, String brand, String type) {
        return brand + " " + sport + " " + type;
    }

    public static String generateProductDescription(String sport, String brand, String type) {
        return String.format(
            "Official %s %s %s — designed for high performance.",
            brand, sport, type
        );
    }

    
}

