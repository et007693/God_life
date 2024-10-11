package com.ssafy.god_life.global.fintech.dto.request;

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
public class CreateDepositAccountRequestDto {

    @JsonProperty("Header")
    private HeaderRequestDto Header;
    private String withdrawalAccountNo;
    private String accountTypeUniqueNo;
    private Long depositBalance;
}
