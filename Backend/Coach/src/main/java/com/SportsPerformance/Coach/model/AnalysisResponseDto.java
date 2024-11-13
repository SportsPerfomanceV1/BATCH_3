package com.SportsPerformance.Coach.model;

public class AnalysisResponseDto {
    private String analysisData;

    public AnalysisResponseDto(String analysisData) {
        this.analysisData = analysisData;
    }

    public String getAnalysisData() {
        return analysisData;
    }

    public void setAnalysisData(String analysisData) {
        this.analysisData = analysisData;
    }
}
