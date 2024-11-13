package com.SportsPerformance.Coach.model;

import java.time.LocalDate;

public class Achievements {
    private String description;
    private LocalDate dateAchieved;

    public Achievements(String description, LocalDate dateAchieved) {
        this.description = description;
        this.dateAchieved = dateAchieved;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDateAchieved() {
        return dateAchieved;
    }

    public void setDateAchieved(LocalDate dateAchieved) {
        this.dateAchieved = dateAchieved;
    }
}
