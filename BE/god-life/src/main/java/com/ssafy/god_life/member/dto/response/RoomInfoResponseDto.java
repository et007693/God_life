package com.ssafy.god_life.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RoomInfoResponseDto {

    private Long roomId;
    private String rule;
    private boolean isCompleted;
}
