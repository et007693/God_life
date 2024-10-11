package com.ssafy.god_life.team.history.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HistoryImageResponseDto {

    private String memberNickname;
    private String picture; // 미션 사진
    private int day;
}
