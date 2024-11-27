package com.SportsPerformance.Athlete.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalysisResponseDto {
    private int totalAthletes;
    private int totalAchievements;
    private int totalRequests;
    private String mostActiveCategory;
}
