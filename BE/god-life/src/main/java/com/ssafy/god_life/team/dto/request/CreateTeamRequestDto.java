package com.ssafy.god_life.team.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateTeamRequestDto {

    private String title;
    private Long fine;
    private String rule;
    private int period;
}
