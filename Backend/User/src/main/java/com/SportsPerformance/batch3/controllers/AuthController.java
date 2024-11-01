package com.SportsPerformance.batch3.controllers;
import com.SportsPerformance.batch3.dtos.LoginDto;
import com.SportsPerformance.batch3.dtos.RegisterDto;
import com.SportsPerformance.batch3.entities.User;
import com.SportsPerformance.batch3.responses.LoginResponse;
import com.SportsPerformance.batch3.services.AuthService;
import com.SportsPerformance.batch3.services.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody RegisterDto registerDto){
        User user = authService.registerUser(registerDto);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginDto loginDto){
        User user = authService.loginUser(loginDto);
        String token = jwtService.generateToken(user);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(token);
        loginResponse.setRole(user.getRole().getName());
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/registerCoach")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<User> registerCoach(@RequestBody RegisterDto registerDto){
        User user = authService.registerCoach(registerDto);
        return ResponseEntity.ok(user);
    }
}
