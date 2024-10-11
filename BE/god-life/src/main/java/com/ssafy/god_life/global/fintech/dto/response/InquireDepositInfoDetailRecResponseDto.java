package com.ssafy.god_life.global.fintech.dto.response;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class InquireDepositInfoDetailRecResponseDto {

    private String bankCode;
    private String bankName;
    private String userName;
    private String accountNo;
    private String accountName;
    private String accountDescription;
    private String withdrawalBankCode;
    private String withdrawalBankName;
    private String withdrawalAccountNo;
    private String subscriptionPeriod;
    private Long depositBalance;
    private double interestRate;
    private String accountCreateDate;
    private String accountExpiryDate;
}
