package com.SportsPerformance.Athlete.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class Coach {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int coachId;

    private int userId;
    private String firstName;
    private String lastName;
    private LocalDate birthDate;
    private String gender;
    private String category;
    private String photoUrl;
}
