package com.SportsPerformance.batch3.controller;

import com.SportsPerformance.batch3.dto.RegistrationRequestDto;
import com.SportsPerformance.batch3.model.Registration;
import com.SportsPerformance.batch3.service.RegistrationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/event")
public class RegistrationController {
    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerEvent(HttpServletRequest request, @RequestBody RegistrationRequestDto registrationRequestDto){
        try {
            Registration registration = registrationService.registerEvent(request, registrationRequestDto);
            return ResponseEntity.ok(registration);
        }catch (IllegalStateException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/getRegistrationsByEvent/{eventId}/admin")
    public ResponseEntity<?> getRegistrationsByEvent(@PathVariable int eventId){
        try {
            List<Registration> registrations = registrationService.getRegistrationsByEvent(eventId);
            return ResponseEntity.ok(registrations);
        }catch (NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/getRegistrationsByAthlete")
    public ResponseEntity<?> getRegistrationsByAthlete(HttpServletRequest request){
        try {
            List<Registration> registrations = registrationService.getRegistrationsByAthlete(request);
            return ResponseEntity.ok(registrations);
        }catch (NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/getRegistration/{registrationId}/admin")
    public ResponseEntity<?> getRegistration(@PathVariable int registrationId){
        try {
            Registration registration = registrationService.getRegistration(registrationId);
            return ResponseEntity.ok(registration);
        }catch (NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/registration/approve/{registrationId}/admin")
    public ResponseEntity<String> approveRegistration(@PathVariable int registrationId){
        try {
            registrationService.approveRegistration(registrationId);
            return ResponseEntity.ok("Registration approved");
        }catch (NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/registration/reject/{registrationId}/admin")
    public ResponseEntity<String> rejectRegistration(@PathVariable int registrationId){
        try {
            registrationService.rejectRegistration(registrationId);
            return ResponseEntity.ok("Registration rejected");
        }catch (NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
