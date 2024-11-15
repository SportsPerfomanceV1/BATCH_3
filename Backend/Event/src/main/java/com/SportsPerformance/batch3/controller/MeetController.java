package com.SportsPerformance.batch3.controller;
import com.SportsPerformance.batch3.dto.MeetRequestDto;
import com.SportsPerformance.batch3.model.Meet;
import com.SportsPerformance.batch3.service.MeetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/meet")
public class MeetController {
    private final MeetService meetService;

    public MeetController(MeetService meetService) {
        this.meetService = meetService;
    }

    @PostMapping("/create/admin")
    public ResponseEntity<Meet> createMeet(@RequestBody MeetRequestDto meetRequestDto){
        Meet meet = meetService.createMeet(meetRequestDto);
        return ResponseEntity.ok(meet);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Meet>> getAllMeets(){
        List<Meet> meets = meetService.getAllMeets();
        return ResponseEntity.ok(meets);
    }

    @GetMapping("/getMeetById/{meetId}")
    public ResponseEntity<Meet> getMeetById(@PathVariable int meetId){
        Meet meet = meetService.getMeetById(meetId);
        return ResponseEntity.ok(meet);
    }

    @PutMapping("/update/{meetId}/admin")
    public ResponseEntity<Meet> updateMeet(@PathVariable int meetId, @RequestBody MeetRequestDto meetRequestDto){
        Meet meet = meetService.updateMeet(meetId, meetRequestDto);
        return ResponseEntity.ok(meet);
    }
}
