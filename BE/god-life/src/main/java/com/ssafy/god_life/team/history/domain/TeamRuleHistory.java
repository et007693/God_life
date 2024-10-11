package com.ssafy.god_life.team.history.domain;

import com.ssafy.god_life.global.domain.BaseTime;
import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.team.domain.Team;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TeamRuleHistory extends BaseTime {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @ColumnDefault("false")
    private boolean isCompleted;

    @Column(columnDefinition = "mediumblob")
    private String completeImage;

    @Column
    private Long charged;

    @ManyToOne
    @JoinColumn(name = "member_id",nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "team_room",nullable = false)
    private Team team;

    public void complete(String image){
        this.isCompleted = true;
        this.completeImage = image;
        this.charged = 0L;
    }

    public void pay(Long money){
        charged = charged - money;
    }

    public void charge(Long money) {
        charged = money;
    }

    public void useCoupon(){
        charged = 0L;
    }
}
