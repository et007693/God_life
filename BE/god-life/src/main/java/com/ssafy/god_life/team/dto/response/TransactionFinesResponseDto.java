package com.ssafy.god_life.team.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TransactionFinesResponseDto {
    private String memberProfileImage;
    private String memberName;
    private String depositType;
    private String chargedBy;
    private Long deposit;
    private Long balance;
    private String fineDate;
}
