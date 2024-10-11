package com.ssafy.god_life.team.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class BettingInfoResponseDto {

    private Long targetId;
    private String targetName;
    private String targetProfileImage;
    private String rule;
    private Long prize;
}
