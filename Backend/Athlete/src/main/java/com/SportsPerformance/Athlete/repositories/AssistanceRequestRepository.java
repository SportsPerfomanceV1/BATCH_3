package com.SportsPerformance.Athlete.repositories;

import com.SportsPerformance.Athlete.entities.AssistanceRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssistanceRequestRepository extends JpaRepository<AssistanceRequest, Integer> {

    boolean existsByAthleteIdAndStatus(int athleteId, String status);

}
