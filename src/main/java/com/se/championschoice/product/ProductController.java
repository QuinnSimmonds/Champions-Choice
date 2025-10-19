package com.se.championschoice.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    //Vendor Creates Product
    @PostMapping("/vendor/{vendorId}")
    public Product createProduct(@PathVariable Long vendorId, @RequestBody Product product) {
        return productService.create(product, vendorId);
    }

    //Get All Products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAll();
    }

    //Get Product by ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getById(id);
    }

    //Get Products by Vendor
    @GetMapping("/vendor/{vendorId}")
    public List<Product> getProductsByVendor(@PathVariable Long vendorId) {
        return productService.getByVendorId(vendorId);
    }

    //Get Product by Sport
    @GetMapping("/sport/{sport}")
    public List<Product> getProductsBySport(@PathVariable String sport) {
        return productService.getBySport(sport);
    }

    //Search Products by Name
    @GetMapping("/search")
    public List<Product> search(@RequestParam String query) {
        return productService.search(query);
    }

    //Update Product
    @PutMapping("/{id}/vendor/{vendorId}")
    public Product updateProduct(@PathVariable Long id, @PathVariable Long vendorId, @RequestBody Product updatedProduct) {
        return productService.update(id, updatedProduct, vendorId);
    }

    //Delete Product
    @DeleteMapping("/{id}/vendor/{vendorId}")
    public void deleteProduct(@PathVariable Long id, @PathVariable Long vendorId) {
        productService.delete(id, vendorId);
    }


}
