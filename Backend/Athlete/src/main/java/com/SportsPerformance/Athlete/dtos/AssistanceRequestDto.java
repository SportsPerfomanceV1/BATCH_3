package com.SportsPerformance.Athlete.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssistanceRequestDto {
    private int coachId; // ID of the coach the request is directed to
    private String requestDetails;
    private String remarks;// Description/details of the request
}
