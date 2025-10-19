package com.se.championschoice.testentity;

import jakarta.persistence.*; //maps Java classes to database tables
import java.time.LocalDateTime;


@Entity
@Table(name = "test_entities") //
public class TestEntity {

    @Id //primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) //autogenerates id
    private Long id;

    @Column(nullable = false)
    private String message;

    private LocalDateTime createdAt;


    //Constructors
    //JPA
    public TestEntity() {

    }

    //DEV
    public TestEntity(String message) {
        this.message = message;


    }


    //Getters and Setters
    public Long getID() {
        return id;
    }

    public void setID(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }


    //Time Stamp
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
