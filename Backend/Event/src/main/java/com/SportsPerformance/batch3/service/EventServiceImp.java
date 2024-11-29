package com.SportsPerformance.batch3.service;

import com.SportsPerformance.batch3.model.Event;
import com.SportsPerformance.batch3.repository.EventRepository;
import com.SportsPerformance.batch3.dto.EventRequestDto;
import com.SportsPerformance.batch3.dto.EventStatsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImp implements EventService{


    @Autowired
    private EventRepository eventRepository;

    @Override
    public Event saveEvent(Event event) {

        return eventRepository.save(event);
    }

    @Override
    public Event createEvent(EventRequestDto eventRequestDto) {
        // Here you would convert the DTO to an Event entity
        Event event = new Event();
        event.setEventTitle(eventRequestDto.getEventTitle());
        event.setMeetName(eventRequestDto.getMeetName());
        event.setCategory(eventRequestDto.getCategory());
        event.setEventDate(eventRequestDto.getEventDate());
        event.setLocation(eventRequestDto.getLocation());

        return saveEvent(event);
    }
    @Override
    public Event getEventById(int eventId) {
        Optional<Event> event = eventRepository.findById(eventId);
        return event.orElse(null); // Return the event if found, otherwise null
    }


    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }


    @Override
    public EventStatsResponse getEventStats() {
        EventStatsResponse stats = new EventStatsResponse();

        // Count total events
        long totalEvents = eventRepository.count();
        System.out.println("Total Events: " + totalEvents); // Debug log
        stats.setTotalEvents(totalEvents);

        // Find the most popular category
        List<Object[]> results = eventRepository.findMostPopularCategory();
        System.out.println("Results: " + results); // Debug log

        if (results != null && !results.isEmpty()) {
            stats.setMostPopularCategory((String) results.get(0)[0]);
        } else {
            stats.setMostPopularCategory(null);
        }

        return stats;
    }


}
