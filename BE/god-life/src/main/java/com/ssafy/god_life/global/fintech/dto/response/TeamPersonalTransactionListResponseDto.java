package com.ssafy.god_life.global.fintech.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeamPersonalTransactionListResponseDto {
    private Long fine;
    private Long prefixFine;
    private String rule;
    private String transactionDate;
    private Long charged;
}
