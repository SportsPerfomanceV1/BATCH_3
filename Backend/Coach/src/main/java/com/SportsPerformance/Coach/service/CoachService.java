package com.SportsPerformance.Coach.service;

import com.SportsPerformance.Coach.model.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface CoachService {
    AnalysisResponseDto getAnalysis();
    Coach createProfile(CoachRequestDto requestDto, String userId, MultipartFile photo);
    Coach updateProfile(CoachRequestDto requestDto, String userId, MultipartFile photo);
    Coach findById(String id);
    Coach setAchievements(Achievements achievements, String coachId);
    List<Coach> findAll();
    List<Coach> searchByName(String name);
    List<AssistanceRequest> getAssistanceRequests(String coachId);
    String approveRequest(String requestId);
    String declineRequest(String requestId);
    Coach findByUserId(String userId);
}
