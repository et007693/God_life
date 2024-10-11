package com.ssafy.god_life.personal.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.personal.domain.Personal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PersonalMissionResponseDto {
    private String profileImage; // 프사
    private String nickname; // 이름
    private String accountBank;
    private String accountNumber;
    private int runningDate; // 진행기간
    private int remainingDate; // 남은 기간
    private float successRate; // 성공률
    private float interestRate; // 현재 적용이율
    private float primeRate; // 최대 적용이율

    private String rule;
    private String meridiem;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
    private LocalTime time;
    private boolean isCompleted;
    private boolean isTimeSet;
    private String locationName;
    private double lat;
    private double lng;

    public PersonalMissionResponseDto(Member member, Personal personal, float successRate, boolean isCompleted) {
        String meridiem = null;
        if (personal.isTimeSet()) {
            time = personal.getTimeSetting();
            meridiem = "오전";
            if (time.getHour() >= 12) {
                time = time.minusHours(12);
                meridiem = "오후";
            }
        }

        this.profileImage = member.getProfileImageURL();
        this.nickname = member.getNickname();
        this.accountBank = "싸피";
        this.accountNumber = personal.getDepositAccountNo();
        this.runningDate = (int) Duration.between(personal.getCreatedDate(), personal.getExpiredDate()).toDays();
        this.remainingDate = (int) Duration.between(LocalDateTime.now(), personal.getExpiredDate()).toDays();
        this.successRate = successRate;
        this.interestRate = personal.getInterestRate();
        this.primeRate = personal.getPrimeRate();
        this.rule = personal.getRule();
        this.meridiem = meridiem;
        this.time = personal.getTimeSetting();
        this.isCompleted = isCompleted;
        this.isTimeSet = personal.isTimeSet();
        this.locationName = member.getHomeName();
        this.lat = member.getLatitudeSetting();
        this.lng = member.getLongitudeSetting();
    }
}
