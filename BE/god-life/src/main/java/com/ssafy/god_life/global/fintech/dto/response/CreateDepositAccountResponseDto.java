package com.ssafy.god_life.global.fintech.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.god_life.global.header.dto.HeaderRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateDepositAccountResponseDto {
    @JsonProperty("Header")
    private HeaderRequestDto Header;
    @JsonProperty("REC")
    private CreateDepositAccountRecResponseDto REC;
}
