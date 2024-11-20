package com.SportsPerformance.User.controllers;
import com.SportsPerformance.User.dtos.LoginDto;
import com.SportsPerformance.User.dtos.RegisterDto;
import com.SportsPerformance.User.entities.User;
import com.SportsPerformance.User.responses.LoginResponse;
import com.SportsPerformance.User.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/auth")
@RestController
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/getUserIdFromToken")
    public ResponseEntity<Integer> getUserIdFromToken(@RequestParam String token){
        int userId = authService.getUserIdFromToken(token);
        return ResponseEntity.ok(userId);
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody RegisterDto registerDto){
        User user = authService.registerUser(registerDto);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginDto loginDto){
        LoginResponse loginResponse = authService.loginUser(loginDto);

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/registerCoach/admin")
    public ResponseEntity<User> registerCoach(@RequestBody RegisterDto registerDto){
        User user = authService.registerCoach(registerDto);
        return ResponseEntity.ok(user);
    }
}
