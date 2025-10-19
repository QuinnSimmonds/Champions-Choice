package com.se.championschoice.testentity;

import org.springframework.data.jpa.repository.JpaRepository; //methods for any entity
import org.springframework.stereotype.Repository; //interface communicates with database @Repository


@Repository
public interface TERepository extends JpaRepository<TestEntity, Long> {

}
