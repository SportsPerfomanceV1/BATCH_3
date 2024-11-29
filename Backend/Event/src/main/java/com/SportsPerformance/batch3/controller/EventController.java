package com.SportsPerformance.batch3.controller;



import com.SportsPerformance.batch3.dto.EventRequestDto;
import com.SportsPerformance.batch3.dto.EventStatsResponse;
import com.SportsPerformance.batch3.model.Event;
import com.SportsPerformance.batch3.repository.EventRepository;
import com.SportsPerformance.batch3.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event")
public class EventController {

    @Autowired
    private EventService eventService;



    @PostMapping("/add/admin")
    public ResponseEntity<Event> addEvent(@RequestBody EventRequestDto eventRequestDto) {
        Event event = eventService.createEvent(eventRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(event);
    }


    @GetMapping("/getAll")
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable int id) { // Path variable as int
        Event event = eventService.getEventById(id); // Pass int to service
        return event != null ? ResponseEntity.ok(event) : ResponseEntity.notFound().build();
    }


    @GetMapping("/stats")
    public ResponseEntity<EventStatsResponse> getEventStats() {
        EventStatsResponse stats = eventService.getEventStats();
        return ResponseEntity.ok(stats);
    }

}

