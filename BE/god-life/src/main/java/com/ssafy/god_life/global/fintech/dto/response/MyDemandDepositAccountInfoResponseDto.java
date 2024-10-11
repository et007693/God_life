package com.ssafy.god_life.global.fintech.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MyDemandDepositAccountInfoResponseDto {
    private String accountName;
    private Long accountBalance;
    private String withdrawalAccountBankName;
    private String withdrawalAccountNo;

}
