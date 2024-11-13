package com.SportsPerformance.Coach.repository;

import com.SportsPerformance.Coach.model.Coach;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CoachRepository extends JpaRepository<Coach, Integer> {
    Coach findById(String id);
    List<Coach> findAll();
    List<Coach> findByFirstNameContaining(String name);
    Coach findByUserId(String userId);
}
