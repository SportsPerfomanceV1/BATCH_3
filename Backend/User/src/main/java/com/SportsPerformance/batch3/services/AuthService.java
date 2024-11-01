package com.SportsPerformance.batch3.services;

import com.SportsPerformance.batch3.dtos.LoginDto;
import com.SportsPerformance.batch3.dtos.RegisterDto;
import com.SportsPerformance.batch3.entities.Role;
import com.SportsPerformance.batch3.entities.Roles;
import com.SportsPerformance.batch3.entities.User;
import com.SportsPerformance.batch3.repositories.RoleRepository;
import com.SportsPerformance.batch3.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.roleRepository = roleRepository;
    }

    public User registerUser(RegisterDto registerDto){

        Optional<Role> optionalRole = roleRepository.findByName(Roles.ATHLETE);
        if (optionalRole.isEmpty()){
            return null;
        }

        User user = new User();
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setFullName(registerDto.getFullName());
        user.setRole(optionalRole.get());
        return userRepository.save(user);
    }

    public User loginUser(LoginDto loginDto){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                )
        );
        return userRepository.findByEmail(loginDto.getEmail()).orElseThrow();
    }

    public User registerCoach(RegisterDto registerDto) {
        Optional<Role> optionalRole = roleRepository.findByName(Roles.COACH);
        if (optionalRole.isEmpty()){
            return null;
        }

        User user = new User();
        user.setEmail(registerDto.getEmail());
        user.setFullName(registerDto.getFullName());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setRole(optionalRole.get());

        return userRepository.save(user);
    }
}
