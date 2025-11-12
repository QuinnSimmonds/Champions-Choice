package com.se.championschoice.config;

import com.github.javafaker.Faker;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.*;
import java.util.*;

/**
 * generates a standalone CSV file of synthetic sports e-commerce data
 * for ai model training
 *
 */
public class DataSeeder {

    // config
    private static final int RECORD_COUNT = 100000; // 100k records csv
    private static final String OUTPUT_PATH =
        "src/main/resources/data/synthetic_training_data.csv";


    // escape helper function (commas / quotes)
    private static String escape(String input) {
        if (input.contains(",") || input.contains("\"")) {
            return "\"" + input.replace("\"", "\"\"") + "\"";
        }
        return input;
    }


    // csv generator
    public static void generateCsv(int recordCount) throws IOException {
        Faker faker = new Faker();
	    Random random = new Random();

        // customer name repetition and address match
        int uniqueCust = 1000;
        List<String> customerNames = new ArrayList<>();
	Map<String, String> customerLocations = new HashMap<>();

        for (int i = 0; i < uniqueCust; i++) {
            String name = escape(faker.name().fullName());
            customerNames.add(name);

            String city = escape(faker.address().city());
	    String state = escape(faker.address().stateAbbr());
	    customerLocations.put(name, city + ", " + state);
        }

	
	


        // check folder exists
        Path folder = Paths.get(OUTPUT_PATH).getParent();
        if (folder != null) Files.createDirectories(folder);

        try (FileWriter writer = new FileWriter(OUTPUT_PATH)) {
            writer.write("customer_name,age,location,sport,brand,product,quantity,price\n");

            for (int i = 0; i < recordCount; i++) {
		        // product generation
                String sport = DataSeederHelper.randomSport();
                String brand = DataSeederHelper.randomBrandForSport(sport);
                String type  = DataSeederHelper.randomProductTypeForSport(sport);
                String product = DataSeederHelper.generateProductName(sport, brand, type);
                double price   = Double.parseDouble(faker.commerce().price(30.0, 1000.0));
                int quantity   = faker.number().numberBetween(1, 5);

                // customer demographics 
                String customer = customerNames.get(random.nextInt(customerNames.size()));
                int age = faker.number().numberBetween(18, 90);
                String city = faker.address().city();
                String state = faker.address().stateAbbr();
                String location = customerLocations.get(customer);

                // csv line
                String line = String.join(",",
                    escape(customer),
                    String.valueOf(age),
                    escape(location),
                    escape(sport),
                    escape(brand),
                    escape(product),
                    String.valueOf(quantity),
                    String.valueOf(price)
                ) + "\n";

                writer.write(line);
            }

            System.out.printf("COMPLETE! ->  %d synthetic records written to %s%n",
                recordCount, OUTPUT_PATH);
        }
    }

   
    // main entry point
    public static void main(String[] args) throws IOException {
        generateCsv(RECORD_COUNT);
    }

}

