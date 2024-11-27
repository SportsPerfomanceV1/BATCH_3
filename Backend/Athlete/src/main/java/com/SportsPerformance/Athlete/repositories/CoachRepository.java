package com.SportsPerformance.Athlete.repositories;

import com.SportsPerformance.Athlete.entities.Coach;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoachRepository extends JpaRepository<Coach, Integer> {

    // Find Coach by userId
    Coach findByUserId(int userId);

    // Find Coach by full name using custom JPQL query
    @Query("SELECT c FROM Coach c WHERE c.firstName = :firstName AND c.lastName = :lastName")
    Coach findByFullName(@Param("firstName") String firstName, @Param("lastName") String lastName);

    // Check if a Coach exists by userId
    boolean existsByUserId(Integer userId);


    // Search by first or last name (partial match)
    List<Coach> findByFirstNameContainingOrLastNameContaining(String firstName, String lastName);
}
