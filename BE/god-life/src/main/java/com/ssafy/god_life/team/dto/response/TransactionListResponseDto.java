package com.ssafy.god_life.team.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TransactionListResponseDto {

    private String roomName;
    private List<TransactionFinesResponseDto> fines;

}
