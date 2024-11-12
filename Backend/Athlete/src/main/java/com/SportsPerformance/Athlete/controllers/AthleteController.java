package com.SportsPerformance.Athlete.controllers;

import com.SportsPerformance.Athlete.dtos.AssistanceRequestDto;
import com.SportsPerformance.Athlete.entities.AssistanceRequest;
import com.SportsPerformance.Athlete.entities.Athlete;
import com.SportsPerformance.Athlete.services.AthleteService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/athletes")
public class AthleteController {

    private final AthleteService athleteService;

    public AthleteController(AthleteService athleteService) {
        this.athleteService = athleteService;
    }

    @PostMapping("/create")
    public ResponseEntity<Athlete> createProfile(
            HttpServletRequest request,
            @RequestParam String athleteData,
            @RequestParam("file") MultipartFile file) throws IOException {
        Athlete athlete = athleteService.createProfile(request, athleteData, file);
        return ResponseEntity.ok(athlete);
    }

    @GetMapping("/getByName/coach")
    public ResponseEntity<Athlete> getAthlete(@RequestBody String name) {
        Athlete athlete = athleteService.getAthlete(name);
        return ResponseEntity.ok(athlete);
    }

    @GetMapping("/getById/{athleteId}/coach")
    public ResponseEntity<Athlete> getAthleteById(@PathVariable int athleteId) {
        Athlete athlete = athleteService.getAthleteById(athleteId);
        return ResponseEntity.ok(athlete);
    }

    @GetMapping("/getAll/admin")
    public ResponseEntity<List<Athlete>> getAll() {
        List<Athlete> athletes = athleteService.getAll();
        return ResponseEntity.ok(athletes);
    }

    @PutMapping("/edit")
    public ResponseEntity<Athlete> editAthlete(
            HttpServletRequest request,
            @RequestParam String athleteData,
            @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        Athlete athlete = athleteService.editAthlete(request, athleteData, file);
        return ResponseEntity.ok(athlete);
    }

    @GetMapping("/getByUserId/{userId}/coach")
    public ResponseEntity<Athlete> findAthleteByUserId(@PathVariable int userId){
        Athlete athlete = athleteService.findAthleteByUserId(userId);
        return  ResponseEntity.ok(athlete);
    }

    @GetMapping("/getIdByUserId/{userId}/coach")
    public ResponseEntity<Integer> findAthleteIdByUserId(@PathVariable int userId){
        int athleteId = athleteService.findAthleteIdByUserId(userId);
        return ResponseEntity.ok(athleteId);
    }

    /*
    @GetMapping("/validate")
    public ResponseEntity<Boolean> validateAthlete(@RequestBody String email){
        Boolean isValid = athleteService.validateAthlete(email);
        return ResponseEntity.ok(isValid);
    }*/

    @PostMapping("/requestAssistance")
    public ResponseEntity<?> requestAssistance(HttpServletRequest httpServletRequest,
                                               @RequestBody AssistanceRequestDto assistanceRequestDto){
        try {
            AssistanceRequest request = athleteService.requestAssistance(httpServletRequest, assistanceRequestDto);
            return ResponseEntity.ok(request);
        }
        catch (IllegalStateException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("The request has already been approved or is currently pending approval");
        }
    }
}

