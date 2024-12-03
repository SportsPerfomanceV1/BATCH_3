package com.SportsPerformance.batch3.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResultRequestDto {
    private int eventId;
    private int athleteId;
    private float score;
    private String remarks;
}
