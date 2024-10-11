package com.ssafy.god_life.global.fintech.dto.response;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class CreateDemandDepositAccountResponseRecDto {

    private String bankCode;
    private String accountNo;
    private CurrencyDto currency;
}
