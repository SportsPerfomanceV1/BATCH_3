package com.SportsPerformance.Athlete.services;

import com.SportsPerformance.Athlete.dtos.AnalysisResponseDto;
import com.SportsPerformance.Athlete.dtos.CoachRequestDto;
import com.SportsPerformance.Athlete.dtos.AssistanceRequestDto;
import com.SportsPerformance.Athlete.entities.AssistanceRequest;
import com.SportsPerformance.Athlete.entities.Coach;
import com.SportsPerformance.Athlete.repositories.AssistanceRequestRepository;
import com.SportsPerformance.Athlete.repositories.CoachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public class CoachService {


    private final CoachRepository coachRepository;

    @Autowired
    public CoachService(CoachRepository coachRepository) {
        this.coachRepository = coachRepository;
    }
    @Autowired
    private AssistanceRequestRepository assistanceRequestRepository;

    private final String FOLDER_PATH = "C://Users//medas//BATCH_3//Backend//Athlete//src//main//java//com//SportsPerformance//Athlete//Img";
    private CoachService coachService;

    public Coach createProfile(CoachRequestDto dto, MultipartFile file) throws IOException {
        String photoUrl = saveFile(file);
        Coach coach = new Coach();
        coach.setUserId(dto.getUserId());
        coach.setFirstName(dto.getFirstName());
        coach.setLastName(dto.getLastName());
        coach.setBirthDate(LocalDate.parse(dto.getBirthDate()));
        coach.setGender(dto.getGender());
        coach.setCategory(dto.getCategory());
        coach.setPhotoUrl(photoUrl);

        return coachRepository.save(coach);
    }

    public Coach updateProfile(CoachRequestDto dto, int coachId, MultipartFile file) throws IOException {
        Coach coach = findById(coachId);

        if (file != null && !file.isEmpty()) {
            String photoUrl = saveFile(file);
            coach.setPhotoUrl(photoUrl);
        }

        coach.setFirstName(dto.getFirstName());
        coach.setLastName(dto.getLastName());
        coach.setBirthDate(LocalDate.parse(dto.getBirthDate()));
        coach.setGender(dto.getGender());
        coach.setCategory(dto.getCategory());

        return coachRepository.save(coach);
    }



    public List<Coach> findAll() {
        return coachRepository.findAll();
    }

    public List<Coach> searchByName(String name) {
        return coachRepository.findByFirstNameContainingOrLastNameContaining(name, name);
    }

    public AnalysisResponseDto getAnalysis() {
        // Mocked data; replace with actual queries if needed
        AnalysisResponseDto response = new AnalysisResponseDto();
        response.setTotalAthletes(50);
        response.setTotalAchievements(10);
        response.setTotalRequests(20);
        response.setMostActiveCategory("Fitness");
        return response;
    }


    public Coach findByUserId(String userId) {
        try {
            // Parse the userId String into an Integer
            int userIdInt = Integer.parseInt(userId);

            // Now you can call the repository method with an integer
            return coachRepository.findByUserId(userIdInt);
        } catch (NumberFormatException e) {
            // Handle the case where userId is not a valid integer
            throw new IllegalArgumentException("Invalid userId format: " + userId, e);
        }
    }
    public Coach findById(int coachId) {
        return coachRepository.findById(coachId).orElseThrow(() -> new RuntimeException("Coach not found"));
    }



    public int findCoachIdByUserId(String userId) {
        // Find Coach by userId
        Coach coach = coachRepository.findByUserId(Integer.parseInt(userId));
        if (coach == null) {
            throw new RuntimeException("Coach not found for userId: " + userId);
        }
        return coach.getId();  // Assuming `Coach` entity has an `id` field.
    }

    public List<AssistanceRequest> getAssistanceRequests(String status) {
        return assistanceRequestRepository.findByStatus(status);
    }

    public String approveRequest(int requestId, String remarks) {
        // Fetch the assistance request
        AssistanceRequest request = assistanceRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Assistance request not found"));

        // Fetch the coach associated with the request (from the request object)
        Coach coach = request.getCoach();

        if (coach == null) {
            throw new RuntimeException("Coach not found for the request");
        }

        // Set status and remarks
        request.setStatus("approved");
        request.setRemarks(remarks);

        // Save the updated AssistanceRequest
        assistanceRequestRepository.save(request);
        return "Request approved successfully";
    }






    public String declineRequest(int requestId, String remarks) {
        AssistanceRequest request = assistanceRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Assistance request not found"));

        request.setStatus("declined");
        request.setRemarks(remarks);
        assistanceRequestRepository.save(request);
        return "Request declined successfully";
    }

    private String saveFile(MultipartFile file) throws IOException {
        String filePath = FOLDER_PATH + file.getOriginalFilename();
        file.transferTo(new File(filePath));
        return filePath;
    }
}
