package com.SportsPerformance.Athlete.controllers;

import com.SportsPerformance.Athlete.dtos.AnalysisResponseDto;
import com.SportsPerformance.Athlete.dtos.CoachRequestDto;
import com.SportsPerformance.Athlete.entities.Coach;
import com.SportsPerformance.Athlete.services.CoachService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/coaches")
public class CoachController {
    @Autowired
    private CoachService coachService;

    @PostMapping("/create")
    public ResponseEntity<Coach> createProfile(HttpServletRequest request,
                                               @RequestParam String dto,
                                               @RequestParam("file") MultipartFile photo) throws IOException {
        Coach coach = coachService.createProfile(request, dto, photo);
        return ResponseEntity.ok(coach);
    }

    @PutMapping("/update")
    public ResponseEntity<Coach> updateProfile(HttpServletRequest request,
                                               @RequestParam String dto,
                                               @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        Coach coach = coachService.updateProfile(request,  dto, file);
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
