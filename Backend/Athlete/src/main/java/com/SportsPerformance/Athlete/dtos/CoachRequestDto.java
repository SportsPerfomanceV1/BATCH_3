package com.SportsPerformance.Athlete.dtos;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CoachRequestDto {
    private int userId;
    private String firstName;
    private String lastName;
    private String birthDate; // Will be converted to LocalDate in service
    private String gender;
    private String category;
    private MultipartFile photo;
}
