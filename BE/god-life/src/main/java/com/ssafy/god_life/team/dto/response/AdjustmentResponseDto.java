package com.ssafy.god_life.team.dto.response;

import com.ssafy.god_life.member.dto.response.SimpleMemberResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AdjustmentResponseDto {

    private List<AdjustmentMemberResponseDto> memberList;
    private String teamName;
    private String memberName;
    private String accountBank;
    private String leaderName;
    private Long fineGathered;
    private Long refundAmount;
}
