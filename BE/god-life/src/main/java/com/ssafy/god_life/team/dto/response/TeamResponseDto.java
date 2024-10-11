package com.ssafy.god_life.team.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.god_life.member.dto.response.SimpleMemberResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TeamResponseDto {

    private List<SimpleMemberResponseDto> memberList;
    private String title;
    private String accountBank;
    private String accountNumber;
    private Long gatheredFine;
    private Long delayedFine;
    private String rule;
    private String meridiem;

    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "HH:mm", timezone = "Asia/Seoul")
    private LocalTime time;
    private boolean isCompleted;
    private boolean isTimeSet;
    private boolean isBettingOpen;
    private String locationName;
    private double lat;
    private double lng;
}
