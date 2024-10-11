package com.ssafy.god_life.team.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AdjustmentMemberResponseDto {

    private String name;
    private String memberProfileImage;
    private double totalFinePercent;
    private Long totalFine;
}
