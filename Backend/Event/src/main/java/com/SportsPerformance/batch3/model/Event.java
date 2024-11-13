package com.SportsPerformance.batch3.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter

@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int eventId;

    @Column(name = "event_title", length = 100)
    private String eventTitle;

    @Column(length = 100)
    private String meetName;

    @Column(length = 50)
    private String category;


    private LocalDate eventDate;

    @Column(length = 255)
    private String location;


}
