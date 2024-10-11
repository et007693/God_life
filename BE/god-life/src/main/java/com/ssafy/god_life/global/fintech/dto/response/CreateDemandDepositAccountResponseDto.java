package com.ssafy.god_life.global.fintech.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.god_life.global.header.dto.HeaderRequestDto;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
// 수시 입출금 계좌 생성 ResponseDto
public class CreateDemandDepositAccountResponseDto {
    @JsonProperty("Header")
    private HeaderRequestDto Header;
    @JsonProperty("REC")
    private CreateDemandDepositAccountResponseRecDto REC;

}
