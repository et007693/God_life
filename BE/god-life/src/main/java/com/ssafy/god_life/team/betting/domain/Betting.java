package com.ssafy.god_life.team.betting.domain;

import com.ssafy.god_life.global.domain.BaseTime;
import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.team.domain.Team;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Betting extends BaseTime {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private boolean betSuccess;

    @ManyToOne
    @JoinColumn(name = "member_id",nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "team_room",nullable = false)
    private Team team;
}
