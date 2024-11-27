package com.SportsPerformance.batch3.dto;

import lombok.*;

import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventRequestDto {
    private String eventTitle;
    private String meetName;
    private String category;
    private LocalDate eventDate;
    private String location;
}
