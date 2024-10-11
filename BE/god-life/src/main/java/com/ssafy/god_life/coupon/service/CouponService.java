package com.ssafy.god_life.coupon.service;

public interface CouponService {

    /**
     * 개당 쿠폰 가격을 조회한다.
     *
     * @return 쿠폰 가격
     */
    int getPrice();

    /**
     * 쿠폰을 구매한다.
     * 
     * @param amount 구매할 개수
     */
    void buy(Long memberId, int amount);
}
