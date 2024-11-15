package com.SportsPerformance.batch3.service;

import com.SportsPerformance.batch3.dto.MeetRequestDto;
import com.SportsPerformance.batch3.model.Meet;
import com.SportsPerformance.batch3.repository.MeetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeetService {
    private final MeetRepository meetRepository;

    public MeetService(MeetRepository meetRepository) {
        this.meetRepository = meetRepository;
    }

    public Meet createMeet(MeetRequestDto meetRequestDto) {
        Meet meet = new Meet();
        meet.setMeetName(meetRequestDto.getMeetName());
        return meetRepository.save(meet);
    }

    public List<Meet> getAllMeets() {
        return meetRepository.findAll();
    }

    public Meet getMeetById(int meetId) {
        return meetRepository.findById(meetId).orElse(null);
    }

    public Meet updateMeet(int meetId, MeetRequestDto meetRequestDto) {
        Meet meet = getMeetById(meetId);
        meet.setMeetName(meetRequestDto.getMeetName());
        return meetRepository.save(meet);
    }
}
