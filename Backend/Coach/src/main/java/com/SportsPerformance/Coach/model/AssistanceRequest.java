package com.SportsPerformance.Coach.model;

import java.time.LocalDateTime;

public class AssistanceRequest {
    private String requestId;
    private int coachId;
    private String requestDetails;
    private LocalDateTime requestDate;

    public AssistanceRequest(String requestId, int coachId, String requestDetails, LocalDateTime requestDate) {
        this.requestId = requestId;
        this.coachId = coachId;
        this.requestDetails = requestDetails;
        this.requestDate = requestDate;
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public int getCoachId() {
        return coachId;
    }

    public void setCoachId(int coachId) {
        this.coachId = coachId;
    }

    public String getRequestDetails() {
        return requestDetails;
    }

    public void setRequestDetails(String requestDetails) {
        this.requestDetails = requestDetails;
    }

    public LocalDateTime getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }
}
