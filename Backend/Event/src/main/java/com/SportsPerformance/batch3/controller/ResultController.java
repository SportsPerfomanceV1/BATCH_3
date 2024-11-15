package com.SportsPerformance.batch3.controller;

import com.SportsPerformance.batch3.dto.ResultRequestDto;
import com.SportsPerformance.batch3.model.Result;
import com.SportsPerformance.batch3.service.ResultService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event/result")
public class ResultController {
    private final ResultService resultService;

    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @PostMapping("/create/admin")
    public ResponseEntity<Result> createResult(@RequestBody ResultRequestDto resultRequestDto){
        Result result = resultService.createResult(resultRequestDto);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/getAll/coach")
    public ResponseEntity<List<Result>> getAllResult(){
        List<Result> results = resultService.getAllResult();
        return ResponseEntity.ok(results);
    }

    @GetMapping("/getResultById/{resultId}/coach")
    public ResponseEntity<Result> getResultById(@PathVariable int resultId){
        Result result = resultService.getResultById(resultId);
        return ResponseEntity.ok(result);
    }
}
