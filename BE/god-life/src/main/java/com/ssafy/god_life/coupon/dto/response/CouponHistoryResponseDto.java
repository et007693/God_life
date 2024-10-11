package com.ssafy.god_life.coupon.dto.response;

import com.ssafy.god_life.coupon.history.dto.response.CouponHistoryDetailResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CouponHistoryResponseDto {

    private int mileage;
    private List<CouponHistoryDetailResponseDto> history;

    public CouponHistoryResponseDto(int mileage, Page<CouponHistoryDetailResponseDto> history) {
        this.mileage = mileage;
        this.history = history.getContent();
    }
}
