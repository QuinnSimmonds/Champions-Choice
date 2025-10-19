package com.se.championschoice.testentity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TEService {

    @Autowired
    private TERepository testRepository;

    public TestEntity create(String message) {
        TestEntity test = new TestEntity(message);
        return testRepository.save(test);
    }

    public List<TestEntity> getAll() {
        return testRepository.findAll();
    }

    public Optional<TestEntity> getById(Long id) {
        return testRepository.findById(id);

    }

    public void deleteAll() {
        testRepository.deleteAll();
    }
}
