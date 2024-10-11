package com.ssafy.god_life.global.fintech.dto.response;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class DeleteDemandDepositAccountRecResponseDto {

    private String status;
    private String accountNo;
    private String refundAccountNo;
    private Long accountBalance;
}
