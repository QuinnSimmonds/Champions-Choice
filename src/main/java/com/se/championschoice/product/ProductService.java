package com.se.championschoice.product;

import com.se.championschoice.vendor.Vendor;
import com.se.championschoice.vendor.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private VendorRepository vendorRepository;

    //Create Product
    public Product create(Product product, Long vendorId) {
        //find the vendor
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor Not Found"));

        //set the vendor
        product.setVendor(vendor);

        //save and return
        return productRepository.save(product);
    }

    //Get All Products
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    //Get Product by ID
    public Product getById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));
    }

    //Get Products by Vendor
    public List<Product> getByVendorId(Long vendorId) {
        return productRepository.findByVendorId(vendorId);
    }

    //Get Products by Sport
    public List<Product> getBySport(String sport) {
        return productRepository.findBySport(sport);
    }

    //Search Products by Name
    public List<Product> search(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }

    //Update Product
    public Product update(Long id, Product updatedProduct, Long vendorId) {
        //find existing product
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));

        //check if vendor owns this product
        if (!product.getVendor().getId().equals(vendorId)) {
            throw new RuntimeException("Only Allowed To Update Own Vendor Products");
        }

        //update fields
        product.setName(updatedProduct.getName());
        product.setDescription(updatedProduct.getDescription());
        product.setPrice(updatedProduct.getPrice());
        product.setImageUrl(updatedProduct.getImageUrl());
        product.setSport(updatedProduct.getSport());

        //save and return
        return productRepository.save(product);
    }

    //Delete Product
    public void delete(Long id, Long vendorId) {
        //find product
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));

        //check if vendor owns this product
        if (!product.getVendor().getId().equals(vendorId)) {
            throw new RuntimeException("Only Allowed To Delete Own Vendor Products");
        }

        //delete
        productRepository.deleteById(id);
    }
}
