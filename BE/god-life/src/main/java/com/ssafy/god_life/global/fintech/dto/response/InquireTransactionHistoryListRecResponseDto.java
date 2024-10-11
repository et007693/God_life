package com.ssafy.god_life.global.fintech.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InquireTransactionHistoryListRecResponseDto {
    private String totalCount;
    private List<TransactionHistoryListResponseDto> list;
}
