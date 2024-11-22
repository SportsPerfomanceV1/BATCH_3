package com.SportsPerformance.Athlete.services;

import com.SportsPerformance.Athlete.dtos.AnalysisResponseDto;
import com.SportsPerformance.Athlete.dtos.CoachRequestDto;
import com.SportsPerformance.Athlete.entities.Coach;
import com.SportsPerformance.Athlete.repositories.CoachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CoachService {
    @Autowired
    private CoachRepository coachRepository;

    public Coach createProfile(CoachRequestDto dto, String photoUrl) {
        Coach coach = new Coach();
        coach.setUserId(dto.getUserId());
        coach.setFirstName(dto.getFirstName());
        coach.setLastName(dto.getLastName());
        coach.setBirthDate(LocalDate.parse(dto.getBirthDate()));
        coach.setGender(dto.getGender());
        coach.setCategory(dto.getCategory());
        coach.setPhotoUrl(photoUrl);

        return coachRepository.save(coach);
    }

    public Coach updateProfile(CoachRequestDto dto, int coachId, String photoUrl) {
        Coach coach = findById(coachId);
        coach.setFirstName(dto.getFirstName());
        coach.setLastName(dto.getLastName());
        coach.setBirthDate(LocalDate.parse(dto.getBirthDate()));
        coach.setGender(dto.getGender());
        coach.setCategory(dto.getCategory());
        coach.setPhotoUrl(photoUrl);

        return coachRepository.save(coach);
    }

    public Coach findById(int coachId) {
        return coachRepository.findById(coachId)
                .orElseThrow(() -> new RuntimeException("Coach not found"));
    }

    public List<Coach> findAll() {
        return coachRepository.findAll();
    }

    public List<Coach> searchByName(String name) {
        return coachRepository.findByFirstNameContainingOrLastNameContaining(name, name);
    }

    public AnalysisResponseDto getAnalysis() {
        // Mocked data; replace with actual queries
        AnalysisResponseDto response = new AnalysisResponseDto();
        response.setTotalAthletes(50);
        response.setTotalAchievements(10);
        response.setTotalRequests(20);
        response.setMostActiveCategory("Fitness");
        return response;
    }

    public Coach findByUserId(String userId) {
        return coachRepository.findByUserId(Integer.parseInt(userId))
                .orElseThrow(() -> new RuntimeException("Coach not found for userId: " + userId));
    }
}
