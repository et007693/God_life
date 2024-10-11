package com.ssafy.god_life.team.dto.response;

import com.ssafy.god_life.personal.dto.response.PersonalDayResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeamCalendarInfoResponseDto {
    private float successRate; // 해당 월의 성공 비율
    private List<TeamDayResponseDto> dayList; // 날짜 리스트
}
