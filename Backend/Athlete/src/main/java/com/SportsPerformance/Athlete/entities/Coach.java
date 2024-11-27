package com.SportsPerformance.Athlete.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity

public class Coach {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private Integer userId;
    private String firstName;
    private String lastName;
    private LocalDate birthDate;
    private String gender;
    private String category;
    private String photoUrl;



}
