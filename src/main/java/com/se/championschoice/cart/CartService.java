package com.se.championschoice.cart;

import com.se.championschoice.customer.Customer;
import com.se.championschoice.customer.CustomerRepository;
import com.se.championschoice.product.Product;
import com.se.championschoice.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;


@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    //Add Item to Cart
    public Cart addToCart(Long customerId, Long productId, Integer quantity) {
        //find customer
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer Not Found"));

        //find product
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));

        //check if product already in cart
        Optional<Cart> existing = cartRepository.findByCustomerIdAndProductId(customerId, productId);

        if (existing.isPresent()) {
            //update quantity if already in cart
            Cart cartItem = existing.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            return cartRepository.save(cartItem);
        } else {
            //add new item to cart
            Cart cartItem = new Cart(product, customer, quantity);
            return cartRepository.save(cartItem);
        }
    }

    //Get Customer's Cart
    public List<Cart> getCart(Long customerId) {
        return cartRepository.findByCustomerId(customerId);
    }

    //Update Quantity
    public Cart updateQuantity(Long cartItemId, Integer quantity, Long customerId) {
        //find cart item
        Cart cartItem = cartRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart Item Not Found"));

        //check if this cart item belongs to the customer
        if (!cartItem.getCustomer().getId().equals(customerId)) {
            throw new RuntimeException("Only Allowed To Update Own Customer Cart");
        }

        //update quantity
        cartItem.setQuantity(quantity);
        return cartRepository.save(cartItem);
    }

    //Remove Item from Cart
    public void removeItem(Long cartItemId, Long customerId) {
        //find cart item
        Cart cartItem = cartRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart Item Not Found"));

        //check if this cart item belongs to the customer
        if (!cartItem.getCustomer().getId().equals(customerId)) {
            throw new RuntimeException("Only Allowed To Remove Item From Own Customer Cart");
        }

        //delete
        cartRepository.deleteById(cartItemId);
    }

    //Clear Entire Cart
    @Transactional
    public void clearCart(Long customerId) {
        cartRepository.deleteByCustomerId(customerId);
    }
}
