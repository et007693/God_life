package com.ssafy.god_life.coupon.history.service;

import com.ssafy.god_life.coupon.history.dto.response.CouponHistoryDetailResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CouponHistoryService {

    /**
     * 페이지에 따라 쿠폰 사용 내역을 조회한다.
     *
     * @param memberId 멤버 ID
     * @param pageable 페이지 객체
     * @return 쿠폰 사용 내역 응답 DTO
     */
    Page<CouponHistoryDetailResponseDto> getInfo(Long memberId, Pageable pageable);


}
