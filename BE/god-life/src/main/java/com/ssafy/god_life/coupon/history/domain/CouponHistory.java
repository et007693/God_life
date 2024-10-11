package com.ssafy.god_life.coupon.history.domain;

import com.ssafy.god_life.global.domain.BaseTime;
import com.ssafy.god_life.member.domain.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CouponHistory extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemName;
    private int amount;
    private int usedMileage;
    private int leftMileage;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;
}
