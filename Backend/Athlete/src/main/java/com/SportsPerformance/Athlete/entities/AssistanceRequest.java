package com.SportsPerformance.Athlete.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "assistance_requests")
@Data

@NoArgsConstructor
@AllArgsConstructor
public class AssistanceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int requestId;

    @ManyToOne
    @JoinColumn(name = "athlete_id", nullable = false)
    private Athlete athlete;

    @ManyToOne
    @JoinColumn(name = "coach_id", nullable = false)
    private Coach coach;

    @Column(nullable = false)
    private String status; // e.g., "pending", "approved", "declined"

    private String remarks; // Additional remarks for approval/decline

    @Column(nullable = false)
    private String requestDetails; // Details of the assistance request


}
