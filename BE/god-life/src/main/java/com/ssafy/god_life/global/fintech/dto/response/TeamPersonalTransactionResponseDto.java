package com.ssafy.god_life.global.fintech.dto.response;

import lombok.*;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class TeamPersonalTransactionResponseDto {
    private String profileImage;
    private List<TeamPersonalTransactionListResponseDto> list;
}
