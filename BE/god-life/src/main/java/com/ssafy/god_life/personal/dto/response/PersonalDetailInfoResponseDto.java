package com.ssafy.god_life.personal.dto.response;

import com.ssafy.god_life.personal.domain.Personal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PersonalDetailInfoResponseDto {
    private float currentRate; // 적용 이율
    private LocalDateTime createdDate; // 가입일
    private LocalDateTime expiredDate; // 만기일
    private int days; // 지난 날짜(적용 여부)

    public PersonalDetailInfoResponseDto(Personal personal) {
        this.currentRate = personal.getInterestRate();
        this.createdDate = personal.getCreatedDate();
        this.expiredDate = personal.getExpiredDate();
        this.days = (int) Duration.between(LocalDate.now(),getExpiredDate()).toDays();
    }
}
