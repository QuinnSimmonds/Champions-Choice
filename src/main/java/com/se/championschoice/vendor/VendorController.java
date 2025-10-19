package com.se.championschoice.vendor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vendor")
public class VendorController {

    @Autowired
    private VendorService vendorService;

    //Register
    @PostMapping("/register")
    public Vendor register(@RequestBody Vendor vendor) {
        return vendorService.register(vendor);
    }

    //Login
    @PostMapping("/login")
    public Vendor login(@RequestBody Vendor loginRequest) {
        return vendorService.login(loginRequest.getUsername(), loginRequest.getPassword());
    }

    //Get Profile
    @GetMapping("/{id}")
    public Vendor getProfile(@PathVariable Long id) {
        return vendorService.getById(id);
    }
}
