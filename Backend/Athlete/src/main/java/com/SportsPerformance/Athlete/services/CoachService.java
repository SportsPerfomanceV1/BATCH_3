package com.SportsPerformance.Athlete.services;

import com.SportsPerformance.Athlete.dtos.AnalysisResponseDto;
import com.SportsPerformance.Athlete.dtos.CoachRequestDto;
import com.SportsPerformance.Athlete.entities.Coach;
import com.SportsPerformance.Athlete.repositories.CoachRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public class CoachService {
    @Autowired
    private CoachRepository coachRepository;
    @Autowired
    private WebClient.Builder builder;
    @Autowired
    private ObjectMapper mapper;

    String FOLDER_PATH = "C:/Users/LENOVO/OneDrive/Desktop/BATCH_3/Backend/Img/Coaches/";
    String url = "http://USER-SERVICE/auth/getUserIdFromToken?token=";

    public Coach createProfile(HttpServletRequest request, String coachData, MultipartFile file) throws IOException {
        String token = request.getHeader("Authorization").substring(7);
        int userId = builder.build().get().uri(url + token)
                .retrieve().bodyToMono(Integer.class).block();

        if (coachRepository.existsByUserId(userId)){
            throw new RuntimeException("user already exists");
        }

        String filePath = saveFile(file);
        CoachRequestDto dto = mapper.readValue(coachData, CoachRequestDto.class);

        Coach coach = new Coach();
        coach.setUserId(userId);
        coach.setFirstName(dto.getFirstName());
        coach.setLastName(dto.getLastName());
        coach.setBirthDate(LocalDate.parse(dto.getBirthDate()));
        coach.setGender(dto.getGender());
        coach.setCategory(dto.getCategory());
        coach.setPhotoUrl(filePath);

        return coachRepository.save(coach);
    }

    public Coach updateProfile(HttpServletRequest request, String coachData, MultipartFile file) throws IOException {
        String token = request.getHeader("Authorization").substring(7);
        int userId = builder.build().get().uri(url + token)
                .retrieve().bodyToMono(Integer.class).block();

        CoachRequestDto dto = mapper.readValue(coachData, CoachRequestDto.class);
        Coach coach = findByUserId(userId);
        coach.setFirstName(dto.getFirstName());
        coach.setLastName(dto.getLastName());
        coach.setBirthDate(LocalDate.parse(dto.getBirthDate()));
        coach.setGender(dto.getGender());
        coach.setCategory(dto.getCategory());
        if (file != null){
            String filePath = saveFile(file);
            coach.setPhotoUrl(filePath);
        }

        return coachRepository.save(coach);
    }

    public Coach findById(int coachId) {
        return coachRepository.findById(coachId)
                .orElseThrow(() -> new RuntimeException("Coach not found"));
    }

    public List<Coach> findAll() {
        return coachRepository.findAll();
    }

    public List<Coach> searchByName(String name) {
        return coachRepository.findByFirstNameContainingOrLastNameContaining(name, name);
    }

    public AnalysisResponseDto getAnalysis() {
        // Mocked data; replace with actual queries
        AnalysisResponseDto response = new AnalysisResponseDto();
        response.setTotalAthletes(50);
        response.setTotalAchievements(10);
        response.setTotalRequests(20);
        response.setMostActiveCategory("Fitness");
        return response;
    }

    public Coach findByUserId(int userId) {
        return coachRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Coach not found for userId: " + userId));
    }

    public String saveFile(MultipartFile file) throws IOException {
        String filePath = FOLDER_PATH+file.getOriginalFilename();
        file.transferTo(new File(filePath));
        return filePath;
    }
}
