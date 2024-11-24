package com.SportsPerformance.batch3.repository;

import com.SportsPerformance.batch3.model.Meet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetRepository extends JpaRepository<Meet,Integer> {
    boolean existsByMeetName(String meetName);
}