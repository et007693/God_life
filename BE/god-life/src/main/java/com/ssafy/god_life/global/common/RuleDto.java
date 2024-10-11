package com.ssafy.god_life.global.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RuleDto {
    private String ruleType;
    private String ruleDetail;
    private boolean ruleChecked;
    private boolean ruleSetted;
    private LocalTime ruleTime;
    private RuleLocationDto ruleLocationDto;


}
