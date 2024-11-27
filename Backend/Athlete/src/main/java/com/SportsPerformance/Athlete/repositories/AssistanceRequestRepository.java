package com.SportsPerformance.Athlete.repositories;

import com.SportsPerformance.Athlete.entities.AssistanceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssistanceRequestRepository extends JpaRepository<AssistanceRequest, Integer> {

    // Find requests by status (e.g., "pending", "approved")
    List<AssistanceRequest> findByStatus(String status);

    // Check if an AssistanceRequest exists for an athlete with a specific status
    boolean existsByAthlete_AthleteIdAndStatus(int athleteId, String status);

    // Find all AssistanceRequests for a specific athlete
    List<AssistanceRequest> findByAthlete_AthleteId(int athleteId);

    // Find all AssistanceRequests for a specific coach
    List<AssistanceRequest> findByCoach_Id(int coachId);
}
