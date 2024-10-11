package com.ssafy.god_life.global.fintech.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateDepositAccountRecResponseDto {
    private String bankCode;
    private String bankName;
    private String accountNo;
    private String accountName;
    private String withdrawalBankCode;
    private String withdrawalAccountNo;
    private String subscriptionPeriod;
    private Long depositBalance;
    private double interestRate;
    private String accountCreateDate;
    private String accountExpiryDate;
}
