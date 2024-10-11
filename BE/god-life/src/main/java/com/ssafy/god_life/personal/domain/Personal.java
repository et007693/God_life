package com.ssafy.god_life.personal.domain;

import com.ssafy.god_life.global.domain.BaseTime;
import com.ssafy.god_life.team.member.dto.request.SetTimeRequestDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Personal extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String rule;

    @Column
    private int period;

    @Column
    private float interestRate;

    @Column
    private float primeRate;

    @Column
    private LocalDateTime expiredDate;

    @Column
    private int money;

    @Column
    private LocalTime timeSetting;

    @Column
    private String depositAccountNo;

    public boolean isTimeSet(){
        return timeSetting != null;
    }

    public void saveTime(SetTimeRequestDto setTimeRequestDto) {
        LocalTime time = setTimeRequestDto.getTime();
        String meridiem = setTimeRequestDto.getMeridiem();
        if(meridiem==null) {
            throw new RuntimeException("오전/오후가 비었습니다");
        }
        if (meridiem.equals("오후")) {
            time = time.plusHours(12);
        }
        this.timeSetting = time;
    }

    public void delete(float primeRate) {
        this.rule = null;
        this.primeRate = primeRate;
        this.expiredDate = null;
        this.depositAccountNo = null;
    }
}
