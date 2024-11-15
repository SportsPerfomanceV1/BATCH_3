package com.SportsPerformance.batch3.service;

import com.SportsPerformance.batch3.dto.ResultRequestDto;
import com.SportsPerformance.batch3.model.Event;
import com.SportsPerformance.batch3.model.Result;
import com.SportsPerformance.batch3.repository.ResultRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultService {

    private final ResultRepository resultRepository;
    private final EventService eventService;

    public ResultService(ResultRepository resultRepository, EventService eventService) {
        this.resultRepository = resultRepository;
        this.eventService = eventService;
    }

    public Result createResult(ResultRequestDto resultRequestDto) {
        Event event = eventService.getEventById(resultRequestDto.getEventId());

        Result result = new Result();
        result.setEvent(event);
        result.setAthleteId(resultRequestDto.getAthleteId());
        result.setScore(resultRequestDto.getScore());
        result.setRemarks(resultRequestDto.getRemarks());
        return resultRepository.save(result);
    }

    public List<Result> getAllResult() {
        return resultRepository.findAll();
    }

    public Result getResultById(int resultId) {
        return resultRepository.findById(resultId).orElse(null);
    }
}
