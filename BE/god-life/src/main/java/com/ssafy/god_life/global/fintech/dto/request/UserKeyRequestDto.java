package com.ssafy.god_life.global.fintech.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
// 수시 입출금 - 계좌 생성 DTO
public class UserKeyRequestDto {
    private String apiKey;
    private String userId;
}
