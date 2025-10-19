package com.se.championschoice.cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    //Add Item to Cart
    @PostMapping("/add")
    public Cart addToCart(@RequestParam Long customerId, @RequestParam Long productId, @RequestParam(defaultValue = "1") Integer quantity) {
        return cartService.addToCart(customerId, productId, quantity);
    }

    //View Customer's Cart
    @GetMapping("/{customerId}")
    public List<Cart> getCustomerCart(@PathVariable Long customerId) {
        return cartService.getCart(customerId);
    }

    //Update Quantity of Cart Item
    @PutMapping("/{cartItemId}")
    public Cart updateQuantity(@PathVariable Long cartItemId, @RequestParam Integer quantity, @RequestParam Long customerId) {
        return cartService.updateQuantity(cartItemId, quantity, customerId);
    }

    //Remove Item from Cart
    @DeleteMapping("/{cartItemId}")
    public void removeItem(@PathVariable Long cartItemId, @RequestParam Long customerId) {
        cartService.removeItem(cartItemId, customerId);
    }

    //Clear Entire Cart
    @DeleteMapping("/clear/{customerId}")
    public void clearCart(@PathVariable Long customerId) {
        cartService.clearCart(customerId);
    }
}
