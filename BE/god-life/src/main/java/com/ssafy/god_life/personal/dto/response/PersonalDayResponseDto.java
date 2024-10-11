package com.ssafy.god_life.personal.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PersonalDayResponseDto {
    private int day; // 해당 일
    private boolean isCompleted; // 날짜별 규칙 성공 여부
}
