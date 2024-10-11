package com.ssafy.god_life.team.member.domain;

import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.team.member.dto.request.SetTimeRequestDto;
import com.ssafy.god_life.team.domain.Team;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@Entity
public class TeamMember {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private LocalTime selectedTime;

    @ColumnDefault("0")
    private Long delayedFine;

    @ColumnDefault("0")
    private Long prefixFine;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    public void saveTime(SetTimeRequestDto setTimeRequestDto) {
        LocalTime time = setTimeRequestDto.getTime();
        String meridiem = setTimeRequestDto.getMeridiem();
        if(meridiem==null) {
            throw new RuntimeException("오전/오후가 비었습니다");
        }
        if (meridiem.equals("오후")) {
            time = time.plusHours(12);
        }
        this.selectedTime = time;
    }

    public boolean isTimeSet(){
        return this.selectedTime != null;
    }

    public void addPrefixFine(Long money) {
        prefixFine += money;
    }

    public void addDelayedFine() {
        delayedFine += team.getFine();
    }

    public void subDelayedFine(Long money) {
        delayedFine -= money;
    }

    public void useCoupon() {
        member.useFineImmunity();
        delayedFine -= team.getFine();
    }
}
