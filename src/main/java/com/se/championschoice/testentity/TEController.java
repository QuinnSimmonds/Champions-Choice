package com.se.championschoice.testentity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/test")
public class TEController {

    @Autowired
    private TEService testService;

    @GetMapping("/health")
    public String health() {
        return "OK";
    }

    @PostMapping
    public TestEntity create(@RequestBody Map<String, String> body) {
        String message = body.get("message");
        return testService.create(message);
    }

    @GetMapping
    public List<TestEntity> getAll() {
        return testService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<TestEntity> getOne(@PathVariable Long id) {
        return testService.getById(id);
    }

    @DeleteMapping
    public String deleteAll() {
        testService.deleteAll();
        return "Deleted";
    }
}
