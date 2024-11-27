package com.SportsPerformance.Athlete.controllers;

import com.SportsPerformance.Athlete.dtos.AnalysisResponseDto;
import com.SportsPerformance.Athlete.dtos.AssistanceRequestDto;
import com.SportsPerformance.Athlete.dtos.CoachRequestDto;
import com.SportsPerformance.Athlete.entities.AssistanceRequest;
import com.SportsPerformance.Athlete.entities.Coach;
import com.SportsPerformance.Athlete.services.CoachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@Service
@RestController
@RequestMapping("/coaches")
public class CoachController {

    @Autowired
    private final CoachService coachService;


    @Autowired
    public CoachController(CoachService coachService) {
        this.coachService = coachService;
    }


    // Create a coach profile
    @PostMapping("/create")
    public ResponseEntity<Coach> createProfile(
            @RequestPart("data") CoachRequestDto coachRequestDto,
            @RequestPart("file") MultipartFile file) throws IOException {
        Coach createdCoach = coachService.createProfile(coachRequestDto, file);
        return ResponseEntity.ok(createdCoach);
    }

    // Update a coach profile
    @PutMapping("/update/{coachId}")
    public ResponseEntity<Coach> updateProfile(
            @PathVariable int coachId,
            @RequestPart("data") CoachRequestDto coachRequestDto,
            @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        Coach updatedCoach = coachService.updateProfile(coachRequestDto, coachId, file);
        return ResponseEntity.ok(updatedCoach);
    }

    // Get coach by ID
    @GetMapping("/{coachId}")
    public ResponseEntity<Coach> findCoachById(@PathVariable int coachId) {
        Coach coach = coachService.findById(coachId);
        return ResponseEntity.ok(coach);
    }

    // Get all coaches
    @GetMapping
    public ResponseEntity<List<Coach>> getAllCoaches() {
        List<Coach> coaches = coachService.findAll();
        return ResponseEntity.ok(coaches);
    }

    // Search coaches by name
    @GetMapping("/search")
    public ResponseEntity<List<Coach>> searchByName(@RequestParam String name) {
        List<Coach> coaches = coachService.searchByName(name);
        return ResponseEntity.ok(coaches);
    }

    // Get analysis data
    @GetMapping("/analysis")
    public ResponseEntity<AnalysisResponseDto> getAnalysis() {
        AnalysisResponseDto analysis = coachService.getAnalysis();
        return ResponseEntity.ok(analysis);
    }

    // Get assistance requests by status
    @GetMapping("/requests")
    public ResponseEntity<List<AssistanceRequest>> getAssistanceRequests(@RequestParam String status) {
        List<AssistanceRequest> requests = coachService.getAssistanceRequests(status);
        return ResponseEntity.ok(requests);
    }

    // Approve an assistance request
    // Approve an assistance request
    @PostMapping("/requests/{requestId}/approve")
    public ResponseEntity<String> approveRequest(
            @PathVariable int requestId,
            @RequestBody AssistanceRequestDto dto) {
        String response = coachService.approveRequest(requestId, dto.getRemarks());
        return ResponseEntity.ok(response);
    }


    // Decline an assistance request
    @PostMapping("/requests/{requestId}/decline")
    public ResponseEntity<String> declineRequest(
            @PathVariable int requestId,
            @RequestBody AssistanceRequestDto dto) {
        String response = coachService.declineRequest(requestId, dto.getRemarks());
        return ResponseEntity.ok(response);
    }
}
