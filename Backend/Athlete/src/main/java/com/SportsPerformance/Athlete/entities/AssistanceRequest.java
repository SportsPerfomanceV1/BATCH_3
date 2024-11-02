package com.SportsPerformance.Athlete.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AssistanceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int assistanceRequestId;

    private int athleteId;
    private int coachId;
    private String status;
    private String remarks;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDate requestDate;
}
