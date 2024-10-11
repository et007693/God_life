package com.ssafy.god_life.team.domain;


import com.ssafy.god_life.global.domain.BaseTime;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;


@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Entity
public class Team extends BaseTime {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Long fine;

    @Column(nullable = false)
    private String rule;

    @Column
    private String accountNo;

    @Column(nullable = false)
    private LocalDateTime expiredDate;

    @Column
    private Long memberId;

    @ColumnDefault("0")
    private Boolean isBettingOpen;

    @ColumnDefault("0")
    private Boolean isBettingOpenMonth;

    @Column
    private Long targetId;

    public void makeBetting(Long targetId) {
        isBettingOpen = true;
        isBettingOpenMonth = true;
        this.targetId = targetId;
    }

    public void closeBetting() {
        isBettingOpen = false;
        targetId = null;
    }

    public void resetBetting(){
        isBettingOpenMonth = false;
    }

    public void changeMaster(Long masterId) {
        memberId = masterId;
    }
}
