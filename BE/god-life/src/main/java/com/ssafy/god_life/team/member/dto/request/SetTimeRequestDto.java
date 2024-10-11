package com.ssafy.god_life.team.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SetTimeRequestDto {

    private String meridiem;

    @DateTimeFormat(pattern = "HH:mm")
    private LocalTime time;
}
