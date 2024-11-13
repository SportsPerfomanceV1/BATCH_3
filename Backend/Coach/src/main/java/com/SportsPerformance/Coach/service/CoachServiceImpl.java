package com.SportsPerformance.Coach.service;

import com.SportsPerformance.Coach.model.*;
import com.SportsPerformance.Coach.repository.CoachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Optional;

@Service
public class CoachServiceImpl implements CoachService {

    @Autowired
    private CoachRepository coachRepository;

    @Override
    public AnalysisResponseDto getAnalysis() {
        return new AnalysisResponseDto("Sample analysis data");
    }

    @Override
    public Coach createProfile(CoachRequestDto requestDto, String userId, MultipartFile photo) {
        Coach coach = new Coach();
        coach.setUserId(requestDto.getUserId());
        coach.setFirstName(requestDto.getFirstName());
        coach.setLastName(requestDto.getLastName());
        coach.setBirthDate(requestDto.getBirthDate());
        coach.setGender(requestDto.getGender());
        coach.setCategory(requestDto.getCategory());
        coach.setPhotoUrl(requestDto.getPhotoUrl());
        return coachRepository.save(coach);
    }

    @Override
    public Coach updateProfile(CoachRequestDto requestDto, String userId, MultipartFile photo) {
        Coach coach = findByUserId(userId);
        if (coach != null) {
            coach.setFirstName(requestDto.getFirstName());
            coach.setLastName(requestDto.getLastName());
            coach.setCategory(requestDto.getCategory());
            return coachRepository.save(coach);
        }
        return null;
    }

    @Override
    public Coach findById(String id) {
        return coachRepository.findById(id);
    }

    @Override
    public Coach setAchievements(Achievements achievements, String coachId) {
        Coach coach = findById(coachId);
        return coach;
    }

    @Override
    public List<Coach> findAll() {
        return coachRepository.findAll();
    }

    @Override
    public List<Coach> searchByName(String name) {
        return coachRepository.findByFirstNameContaining(name);
    }

    @Override
    public List<AssistanceRequest> getAssistanceRequests(String coachId) {
        return List.of(new AssistanceRequest("REQ001", Integer.parseInt(coachId), "Details", null));
    }

    @Override
    public String approveRequest(String requestId) {
        return "Request Approved";
    }

    @Override
    public String declineRequest(String requestId) {
        return "Request Declined";
    }

    @Override
    public Coach findByUserId(String userId) {
        return coachRepository.findByUserId(userId);
    }
}
