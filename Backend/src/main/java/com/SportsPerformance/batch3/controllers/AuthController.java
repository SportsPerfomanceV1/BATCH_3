package com.SportsPerformance.batch3.controllers;
import com.SportsPerformance.batch3.dtos.AuthRequestDto;
import com.SportsPerformance.batch3.services.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
public class AuthController {

    private final JwtService jwtService;

    public AuthController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping
    public String authenticate(@RequestBody AuthRequestDto authRequestDto){
        return jwtService.generateToken(authRequestDto);
    }
}
