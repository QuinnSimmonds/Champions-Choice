package com.se.championschoice.order;

import com.se.championschoice.cart.Cart;
import com.se.championschoice.cart.CartRepository;
import com.se.championschoice.customer.Customer;
import com.se.championschoice.customer.CustomerRepository;
import com.se.championschoice.product.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.math.BigDecimal;

@Service
public class OrderService {

    private final CustomerRepository customerRepository;
    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    public OrderService(CustomerRepository customerRepository,
                        CartRepository cartRepository,
                        OrderRepository orderRepository,
                        OrderItemRepository orderItemRepository) {

        this.customerRepository = customerRepository;
        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }


    //Place Order (from cart)
    public Order placeOrder(Long customerId) {

        //Load customer
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        //Load cart items
        List<Cart> cartItems = cartRepository.findByCustomerId(customerId);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty. Cannot place order.");
        }

        //Calculate total price
        BigDecimal total = BigDecimal.ZERO;

        for (Cart item : cartItems) {
            Product product = item.getProduct();
            BigDecimal price = product.getPrice(); // BigDecimal
            int qty = item.getQuantity();

            total = total.add(price.multiply(BigDecimal.valueOf(qty)));
        }

        //Create Order
        Order order = new Order(customer, total);
        order = orderRepository.save(order);

        //Create OrderItems
        List<OrderItem> orderItems = new ArrayList<>();

        for (Cart cartItem : cartItems) {
            Product product = cartItem.getProduct();
            int qty = cartItem.getQuantity();
            BigDecimal price = product.getPrice();

            OrderItem orderItem = new OrderItem(order, product, qty, price);
            orderItems.add(orderItem);
        }

        //Save all items
        orderItemRepository.saveAll(orderItems);

        //Attach items to order object
        order.setItems(orderItems);

        //Clear cart
        cartRepository.deleteAll(cartItems);

        return order;
    }


    //Get all orders for a customer
    public List<Order> getOrdersForCustomer(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }


    //Get a single order
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }
}



