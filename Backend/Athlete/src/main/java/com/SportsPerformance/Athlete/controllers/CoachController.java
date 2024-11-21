package com.SportsPerformance.Athlete.controllers;

import com.SportsPerformance.Athlete.dtos.AnalysisResponseDto;
import com.SportsPerformance.Athlete.dtos.CoachRequestDto;
import com.SportsPerformance.Athlete.entities.Coach;
import com.SportsPerformance.Athlete.services.CoachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/coaches")
public class CoachController {
    @Autowired
    private CoachService coachService;

    @PostMapping("/create")
    public ResponseEntity<Coach> createProfile(@ModelAttribute CoachRequestDto dto,
                                               @RequestParam("photo") MultipartFile photo) {
        String photoUrl = "/uploads/" + photo.getOriginalFilename(); // Example file location
        Coach coach = coachService.createProfile(dto, photoUrl);
        return ResponseEntity.ok(coach);
    }

    @PutMapping("/update/{coachId}")
    public ResponseEntity<Coach> updateProfile(@PathVariable int coachId,
                                               @ModelAttribute CoachRequestDto dto,
                                               @RequestParam("photo") MultipartFile photo) {
        String photoUrl = "/uploads/" + photo.getOriginalFilename();
        Coach coach = coachService.updateProfile(dto, coachId, photoUrl);
        return ResponseEntity.ok(coach);
    }

    @GetMapping("/{coachId}")
    public ResponseEntity<Coach> findById(@PathVariable int coachId) {
        Coach coach = coachService.findById(coachId);
        return ResponseEntity.ok(coach);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Coach>> findAll() {
        List<Coach> coaches = coachService.findAll();
        return ResponseEntity.ok(coaches);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Coach>> searchByName(@RequestParam String name) {
        List<Coach> coaches = coachService.searchByName(name);
        return ResponseEntity.ok(coaches);
    }

    @GetMapping("/analysis")
    public ResponseEntity<AnalysisResponseDto> getAnalysis() {
        AnalysisResponseDto analysis = coachService.getAnalysis();
        return ResponseEntity.ok(analysis);
    }
}
