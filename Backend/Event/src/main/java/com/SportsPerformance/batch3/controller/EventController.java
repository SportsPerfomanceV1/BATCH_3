package com.SportsPerformance.batch3.controller;



import com.SportsPerformance.batch3.dto.EventStatsResponse;
import com.SportsPerformance.batch3.model.Event;
import com.SportsPerformance.batch3.repository.EventRepository;
import com.SportsPerformance.batch3.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event")
public class EventController {

    @Autowired
    private EventService eventService;



    @PostMapping("/add")
    public String add(@RequestBody Event event){
        eventService.saveEvent(event);
        return "New Event is Added";
    }
    @PostMapping("/addMultiple")
    public String addMultiple(@RequestBody List<Event> events) {
        for (Event event : events) {
            eventService.saveEvent(event);
        }
        return "New Events are Added";
    }

    @GetMapping("getAll")
    public List<Event> getAllEvents(){
        return eventService.getAllEvents();
    }


    @GetMapping("/{id}")
    public Event getEventById(@PathVariable String id) {
        return eventService.getEventById(String.valueOf(id));
    }



    @GetMapping("/stats")
    public EventStatsResponse getEventStats() {
        return eventService.getEventStats();
    }

}

