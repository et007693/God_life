package com.ssafy.god_life.personal.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CalendarInfoResponseDto {
    private float successRate; // 해당 월의 성공 비율
    private List<PersonalDayResponseDto> dayList; // 날짜 리스트
}
