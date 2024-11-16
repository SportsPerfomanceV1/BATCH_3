package com.SportsPerformance.batch3.repository;

import com.SportsPerformance.batch3.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Integer> {
    List<Registration> findAllByEvent_EventId(int eventId);

    boolean existsByEvent_EventIdAndAthleteId(int eventId, int athleteId);
}