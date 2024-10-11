package com.ssafy.god_life.personal.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PersonalMissionRequestDto {
    private String rule; // 규칙, 주제
    private int money; // 돈
    private String accountNo; // 계좌
    private String bankCode; // 은행명
}
