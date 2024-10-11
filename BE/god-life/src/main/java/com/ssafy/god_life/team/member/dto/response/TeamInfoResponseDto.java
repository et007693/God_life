package com.ssafy.god_life.team.member.dto.response;


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
public class TeamInfoResponseDto {

    private boolean isTimeSet;
    private LocalTime selectedTime;
    private Long gatheredFine;
    private Long delayedFine;
    private Long prefixFine;
    private List<SimpleMemberResponseDto> memberList;
}
