package com.SportsPerformance.batch3.service;

import com.SportsPerformance.batch3.dto.EventRequestDto;
import com.SportsPerformance.batch3.dto.EventStatsResponse;
import com.SportsPerformance.batch3.model.Event;

import java.util.List;

public interface EventService {

    public Event saveEvent(Event event);
    public Event createEvent(EventRequestDto eventRequestDto);
   public Event getEventById(int eventId);
    public List<Event> getAllEvents();
    public EventStatsResponse getEventStats();
}
