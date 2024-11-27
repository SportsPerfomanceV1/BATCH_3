package com.SportsPerformance.batch3.controller;

import com.SportsPerformance.batch3.dto.EventRequestDto;
import com.SportsPerformance.batch3.dto.EventStatsResponse;
import com.SportsPerformance.batch3.model.Event;
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
    private  EventService eventService;

    // Add a single event (accepting EventRequestDto)
    @PostMapping("/add")
    public ResponseEntity<Event> addEvent(@RequestBody EventRequestDto eventRequestDto) {
        Event event = eventService.createEvent(eventRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(event);
    }


    // Add multiple events (accepting list of EventRequestDto)
    @PostMapping("/addMultiple")
    public ResponseEntity<String> addMultiple(@RequestBody List<EventRequestDto> eventsRequestDto) {
        // Delegate to the service layer
        eventService.addMultipleEvents(eventsRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(eventsRequestDto.size() + " events added successfully.");
    }


    // Get all events
    @GetMapping("/getAll")
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    // Get event by ID
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable int id) { // Path variable as int
        Event event = eventService.getEventById(id); // Pass int to service
        return event != null ? ResponseEntity.ok(event) : ResponseEntity.notFound().build();
    }


    // Get event statistics
    @GetMapping("/stats")
    public ResponseEntity<EventStatsResponse> getEventStats() {
        EventStatsResponse stats = eventService.getEventStats();
        return ResponseEntity.ok(stats);
    }

    // Helper method to convert EventRequestDto to Event Entity
    private Event convertToEntity(EventRequestDto eventRequestDto) {
        Event event = new Event();
        event.setEventTitle(eventRequestDto.getEventTitle());
        event.setMeetName(eventRequestDto.getMeetName());
        event.setCategory(eventRequestDto.getCategory());
        event.setEventDate(eventRequestDto.getEventDate());
        event.setLocation(eventRequestDto.getLocation());
        return event;
    }
}
