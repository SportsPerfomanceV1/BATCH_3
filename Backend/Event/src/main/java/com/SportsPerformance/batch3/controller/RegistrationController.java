package com.SportsPerformance.batch3.controller;

import com.SportsPerformance.batch3.dto.RegistrationRequestDto;
import com.SportsPerformance.batch3.model.Registration;
import com.SportsPerformance.batch3.service.RegistrationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event")
public class RegistrationController {
    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping("/register")
    public ResponseEntity<Registration> registerEvent(HttpServletRequest request, @RequestBody RegistrationRequestDto registrationRequestDto){
        Registration registration = registrationService.registerEvent(request, registrationRequestDto);
        return ResponseEntity.ok(registration);
    }

    @GetMapping("/getRegistrationsByEvent/{eventId}/admin")
    public ResponseEntity<List<Registration>> getRegistrationsByEvent(@PathVariable int eventId){
        List<Registration> registrations = registrationService.getRegistrationsByEvent(eventId);
        return ResponseEntity.ok(registrations);
    }

    @GetMapping("/getRegistration/{registrationId}/admin")
    public ResponseEntity<Registration> getRegistration(@PathVariable int registrationId){
        Registration registration = registrationService.getRegistration(registrationId);
        return ResponseEntity.ok(registration);
    }

    @PostMapping("/registration/approve/{registrationId}/admin")
    public void approveRegistration(@PathVariable int registrationId){
        registrationService.approveRegistration(registrationId);
    }

    @PostMapping("/registration/reject/{registrationId}/admin")
    public void rejectRegistration(@PathVariable int registrationId){
        registrationService.rejectRegistration(registrationId);
    }

}
