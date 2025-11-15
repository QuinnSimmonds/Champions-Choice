package com.se.championschoice.vendor;

import com.se.championschoice.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

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
    public LoginResponse login(@RequestBody LoginRequest request) {
        return vendorService.login(request.getUsername(), request.getPassword());
    }

    //Apply
    @PostMapping("/apply")
    public Map<String, Object> applyForVendor() {

        Map<String, Object> response = new HashMap<>();
        response.put("approved", true);
        response.put("vendorCode", vendorService.REQ_VENDOR_CODE);

        return response;
    }

    //Get Profile
    @GetMapping("/{id}")
    public Vendor getProfile(@PathVariable Long id) {
        return vendorService.getById(id);
    }

    //Delete Account
    @DeleteMapping("/{id}")
    public Map<String, String> deleteVendor(@PathVariable Long id) {
        vendorService.deleteVendor(id);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Vendor Account Deleted");
        return response;
    }
}
