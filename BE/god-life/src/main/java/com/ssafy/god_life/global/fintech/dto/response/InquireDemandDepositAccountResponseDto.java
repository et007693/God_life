package com.ssafy.god_life.global.fintech.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.god_life.global.header.dto.HeaderRequestDto;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class InquireDemandDepositAccountResponseDto {
    @JsonProperty("Header")
    private HeaderRequestDto Header;
    @JsonProperty("REC")
    private InquireDemandDepositAccountListRecResponseDto REC;
}
