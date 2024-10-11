package com.ssafy.god_life.fund.entity;

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
public class FundInfo {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int period;

    @Column(nullable = false)
    private float interestRate;

    @Column(nullable = false)
    private float monthPrimeRate;

    @Column(nullable = false)
    private float yearPrimeRate;

}
