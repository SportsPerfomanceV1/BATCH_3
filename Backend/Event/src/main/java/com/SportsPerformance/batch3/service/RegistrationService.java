package com.SportsPerformance.batch3.service;

import com.SportsPerformance.batch3.dto.RegistrationRequestDto;
import com.SportsPerformance.batch3.model.Event;
import com.SportsPerformance.batch3.model.Registration;
import com.SportsPerformance.batch3.repository.EventRepository;
import com.SportsPerformance.batch3.repository.RegistrationRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class RegistrationService {
    private final RegistrationRepository registrationRepository;
    private final EventRepository eventRepository;
    private final WebClient.Builder builder;

    public RegistrationService(RegistrationRepository registrationRepository, EventRepository eventRepository, WebClient.Builder builder) {
        this.registrationRepository = registrationRepository;
        this.eventRepository = eventRepository;
        this.builder = builder;
    }

    public Registration registerEvent(HttpServletRequest request, RegistrationRequestDto registrationRequestDto) {
        String token = request.getHeader("Authorization").substring(7);
        int userId = builder.build().get()
                .uri("http://USER-SERVICE/auth/getUserIdFromToken?token=" + token)
                .retrieve().bodyToMono(Integer.class).block();

        int athleteId = builder.build().get().uri("http://ATHLETE-SERVICE/athletes/getIdByUserId/"+ userId + "/coach")
                .retrieve().bodyToMono(Integer.class).block();

        int eventId = registrationRequestDto.getEventId();
        if (registrationRepository.existsByEvent_EventIdAndAthleteId(eventId, athleteId)){
            throw new IllegalStateException("Registration request exists");
        }
        else {
            Registration registration = new Registration();
            registration.setAthleteId(athleteId);
            registration.setEvent(eventRepository.findById(eventId).orElse(null));
            registration.setStatus("pending");

            return registrationRepository.save(registration);
        }
    }

    public List<Registration> getRegistrationsByEvent(int eventId) {
        return registrationRepository.findAllByEvent_EventId(eventId);
    }

    public Registration getRegistration(int registrationId) {
        return registrationRepository.findById(registrationId).orElse(null);
    }

    public void approveRegistration(int registrationId) {
        Registration registration = getRegistration(registrationId);
        registration.setStatus("approved");
        registrationRepository.save(registration);
    }

    public void rejectRegistration(int registrationId) {
        Registration registration = getRegistration(registrationId);
        registration.setStatus("rejected");
        registrationRepository.save(registration);
    }
}
