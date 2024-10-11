package com.ssafy.god_life.global.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RuleLocationDto {
    public String locationName; // 장소 이름
    public double latitude; // 위도
    public double longitude; // 경도
}
