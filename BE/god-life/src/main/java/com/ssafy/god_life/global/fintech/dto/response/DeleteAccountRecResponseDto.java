package com.ssafy.god_life.global.fintech.dto.response;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class DeleteAccountRecResponseDto {

    private String status;
    private String bankCode;
    private String bankName;
    private String accountNo;
    private String accountName;
    private Long depositBalance;
    private Long earlyTerminationInterest;
    private Long earlyTerminationBalance;
    private String earlyTerminationDate;
}
