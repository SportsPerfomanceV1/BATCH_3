package com.SportsPerformance.Athlete.services;

import com.SportsPerformance.Athlete.dtos.AssistanceRequestDto;
import com.SportsPerformance.Athlete.dtos.AthleteRequestDto;
import com.SportsPerformance.Athlete.entities.AssistanceRequest;
import com.SportsPerformance.Athlete.entities.Athlete;
import com.SportsPerformance.Athlete.repositories.AssistanceRequestRepository;
import com.SportsPerformance.Athlete.repositories.AthleteRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public class AthleteService {

    private final AthleteRepository athleteRepository;
    private final ObjectMapper mapper;
    private final AssistanceRequestRepository assistanceRequestRepository;
    private final WebClient.Builder builder;

    String FOLDER_PATH = "C:/Users/LENOVO/OneDrive/Desktop/BATCH_3/Backend/Athlete/src/main/java/com/SportsPerformance/Athlete/Img/";
    String url = "http://USER-SERVICE/auth/getUserIdFromToken?token=";
    public AthleteService(AthleteRepository athleteRepository, ObjectMapper mapper, AssistanceRequestRepository assistanceRequestRepository, WebClient.Builder builder) {
        this.athleteRepository = athleteRepository;
        this.mapper = mapper;
        this.assistanceRequestRepository = assistanceRequestRepository;
        this.builder = builder;
    }



    public Athlete createProfile(HttpServletRequest request, String athleteData, MultipartFile file) throws IOException {
        String token = request.getHeader("Authorization").substring(7);
        int userId = builder.build().get().uri(url + token)
                .retrieve().bodyToMono(Integer.class).block();

        if (athleteRepository.existsByUserId(userId)){
            throw new RuntimeException("user already exists");
        }

        String filePath = saveFile(file);
        AthleteRequestDto athleteRequestDto = mapper.readValue(athleteData, AthleteRequestDto.class);

        Athlete athlete = new Athlete();
        athlete.setUserId(userId);
        athlete.setFirstName(athleteRequestDto.getFirstName());
        athlete.setLastName(athleteRequestDto.getLastName());
        athlete.setBirthDate(LocalDate.parse(athleteRequestDto.getBirthDate()));
        athlete.setGender(athleteRequestDto.getGender());
        athlete.setHeight(athleteRequestDto.getHeight());
        athlete.setWeight(athleteRequestDto.getWeight());
        athlete.setCategory(athleteRequestDto.getCategory());
        athlete.setPhotoUrl(filePath);
        return athleteRepository.save(athlete);
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

    public Athlete editAthlete(HttpServletRequest request, String athleteData, MultipartFile file) throws IOException {

        String token = request.getHeader("Authorization").substring(7);
        int userId = builder.build().get().uri(url + token)
                .retrieve().bodyToMono(Integer.class).block();

        AthleteRequestDto athleteRequestDto = mapper.readValue(athleteData, AthleteRequestDto.class);
        Athlete athlete = findAthleteByUserId(userId);
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

    /*
    public Boolean validateAthlete(String email) {
        return athleteRepository.existsByFirstName(email);
    }*/

    public AssistanceRequest requestAssistance(HttpServletRequest httpServletRequest,AssistanceRequestDto assistanceRequestDto) {

        String token = httpServletRequest.getHeader("Authorization").substring(7);
        int userId = builder.build().get().uri(url + token)
                .retrieve().bodyToMono(Integer.class).block();
        int athleteId = findAthleteIdByUserId(userId);
        Athlete athlete = findAthleteByUserId(userId);


        boolean existSent = assistanceRequestRepository.existsByAthlete_AthleteIdAndStatus(athleteId, "pending");
        boolean existApprove = assistanceRequestRepository.existsByAthlete_AthleteIdAndStatus(athleteId, "approved");

        if(existSent || existApprove) {
            throw new IllegalStateException("The request has already been approved or is currently pending approval");
        }
        else {
            AssistanceRequest request = new AssistanceRequest();
            request.setAthlete(athlete);
            request.setCoachId(assistanceRequestDto.getCoachId());
            request.setStatus("pending");
            return assistanceRequestRepository.save(request);
        }

    }
}
