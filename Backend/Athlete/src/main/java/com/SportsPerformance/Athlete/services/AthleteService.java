package com.SportsPerformance.Athlete.services;

import com.SportsPerformance.Athlete.dtos.AssistanceRequestDto;
import com.SportsPerformance.Athlete.dtos.AthleteRequestDto;
import com.SportsPerformance.Athlete.entities.AssistanceRequest;
import com.SportsPerformance.Athlete.entities.Athlete;
import com.SportsPerformance.Athlete.repositories.AssistanceRequestRepository;
import com.SportsPerformance.Athlete.repositories.AthleteRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public class AthleteService {

    private final AthleteRepository athleteRepository;
    private final ObjectMapper mapper;
    private final AssistanceRequestRepository assistanceRequestRepository;

    String FOLDER_PATH = "C:/Users/LENOVO/OneDrive/Desktop/Athlete/src/main/java/com/SportsPerformance/Athlete/Img/";

    public AthleteService(AthleteRepository athleteRepository, ObjectMapper mapper, AssistanceRequestRepository assistanceRequestRepository) {
        this.athleteRepository = athleteRepository;
        this.mapper = mapper;
        this.assistanceRequestRepository = assistanceRequestRepository;
    }

    public Athlete createProfile(String athleteData, MultipartFile file) throws IOException {
        String filePath = saveFile(file);
        AthleteRequestDto athleteRequestDto = mapper.readValue(athleteData, AthleteRequestDto.class);

        Athlete athlete = getAthlete(athleteRequestDto, filePath);
        return athleteRepository.save(athlete);
    }

    private static Athlete getAthlete(AthleteRequestDto athleteRequestDto, String filePath) {
        Athlete athlete = new Athlete();
        athlete.setFirstName(athleteRequestDto.getFirstName());
        athlete.setLastName(athleteRequestDto.getLastName());
        athlete.setBirthDate(LocalDate.parse(athleteRequestDto.getBirthDate()));
        athlete.setGender(athleteRequestDto.getGender());
        athlete.setHeight(athleteRequestDto.getHeight());
        athlete.setWeight(athleteRequestDto.getWeight());
        athlete.setCategory(athleteRequestDto.getCategory());
        athlete.setPhotoUrl(filePath);
        return athlete;
    }

    public Athlete getAthlete(String name) {
        String[] names = name.split(" ", 2);
        if (names.length != 2){
            throw new IllegalArgumentException("Full name must consist of first name and last name");
        }
        String firstName = names[0];
        String lastName = names[1];
        return athleteRepository.findByFullName(firstName, lastName);
    }

    public Athlete getAthleteById(int athleteId) {
        return athleteRepository.findById(athleteId).orElse(null);
    }

    public List<Athlete> getAll() {
        return athleteRepository.findAll();
    }

    public Athlete findAthleteByUserId(int userId){
        return athleteRepository.findByUserId(userId);
    }

    public int findAthleteIdByUserId(int userId){
        Athlete athlete = athleteRepository.findByUserId(userId);
        return athlete.getAthleteId();
    }

    public Athlete editAthlete(int userId, String athleteData, MultipartFile file) throws IOException {

        AthleteRequestDto athleteRequestDto = mapper.readValue(athleteData, AthleteRequestDto.class);
        Athlete athlete = athleteRepository.findByUserId(userId);
        athlete.setFirstName(athleteRequestDto.getFirstName());
        athlete.setLastName(athleteRequestDto.getLastName());
        athlete.setBirthDate(LocalDate.parse(athleteRequestDto.getBirthDate()));
        athlete.setGender(athleteRequestDto.getGender());
        athlete.setHeight(athleteRequestDto.getHeight());
        athlete.setWeight(athleteRequestDto.getWeight());
        athlete.setCategory(athleteRequestDto.getCategory());
        if (file != null){
            String filePath = saveFile(file);
            athlete.setPhotoUrl(filePath);
        }

        return athleteRepository.save(athlete);
    }

    public String saveFile(MultipartFile file) throws IOException {
        String filePath = FOLDER_PATH+file.getOriginalFilename();
        file.transferTo(new File(filePath));
        return filePath;
    }

    public Boolean validateAthlete(String email) {
        return athleteRepository.existsByFirstName(email);
    }

    public AssistanceRequest requestAssistance(AssistanceRequestDto assistanceRequestDto) {

        boolean existSent = assistanceRequestRepository.existsByAthleteIdAndStatus(assistanceRequestDto.getAthleteId(), "sent");
        boolean existApprove = assistanceRequestRepository.existsByAthleteIdAndStatus(assistanceRequestDto.getAthleteId(), "approved");

        if(existSent || existApprove) {
            throw new IllegalStateException("The request has already been approved or is currently pending approval");
        }
        else {
            AssistanceRequest request = new AssistanceRequest();
            request.setAthleteId(assistanceRequestDto.getAthleteId());
            request.setCoachId(assistanceRequestDto.getCoachId());
            request.setRemarks(assistanceRequestDto.getRemarks());
            request.setStatus("sent");
            return assistanceRequestRepository.save(request);
        }

    }
}
