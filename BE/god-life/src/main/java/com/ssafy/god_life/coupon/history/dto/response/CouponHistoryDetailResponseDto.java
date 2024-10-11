package com.ssafy.god_life.coupon.history.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CouponHistoryDetailResponseDto {

    private int year;
    private int month;
    private int day;
    private int hour;
    private int minute;
    private String itemName;
    private int amount;
    private int usedMileage;
    private int leftMileage;
}
