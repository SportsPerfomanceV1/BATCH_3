package com.SportsPerformance.batch3.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class EventResults {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int resultId;
    private int eventId;
    private int athleteId;
    private float score;
    private String remarks;
}
