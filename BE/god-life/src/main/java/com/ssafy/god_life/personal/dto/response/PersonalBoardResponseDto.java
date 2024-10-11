package com.ssafy.god_life.personal.dto.response;

import com.ssafy.god_life.personal.history.domain.PersonalRuleHistory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PersonalBoardResponseDto {
    private String picture; // 미션 사진
    private int day; // 날짜

    public PersonalBoardResponseDto(PersonalRuleHistory personalRuleHistory) {
        this.picture = personalRuleHistory.getCompleteImage();
        this.day = personalRuleHistory.getCreatedDate().getDayOfMonth();
    }
}
