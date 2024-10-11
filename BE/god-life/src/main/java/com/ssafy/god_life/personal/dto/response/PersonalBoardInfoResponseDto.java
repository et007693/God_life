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
public class PersonalBoardInfoResponseDto {

    private float successRate; // 이 달의 성공률
    private int year; // 년도
    private int month; // 월
    private List<PersonalBoardResponseDto> dayList; // DTO 리스트
}
