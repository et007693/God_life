package com.ssafy.god_life.coupon.service;

import com.ssafy.god_life.common.BaseTest;
import com.ssafy.god_life.coupon.domain.Coupon;
import com.ssafy.god_life.coupon.exception.NotEnoughMileageException;
import com.ssafy.god_life.coupon.repository.CouponRepository;
import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.member.repository.MemberRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class CouponServiceTest extends BaseTest {

    @Autowired
    CouponService couponService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    CouponRepository couponRepository;

    @BeforeEach
    void saveCoupon() {
        couponRepository.save(Coupon.builder()
                .price(2000)
                .build());
    }


    @Test
    void 쿠폰_가격을_조회한다() throws Exception {
        // given & when
        int price = couponService.getPrice();

        // then
        assertThat(price).isEqualTo(2000);
    }

    @Test
    void 쿠폰을_구매한다() throws Exception {
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("ssafy@naver.com")
                .mileage(4000)
                .build();
        memberRepository.save(member);

        // when
        couponService.buy(member.getId(), 2);

        // then
        assertThat(member.getFineImmunityCount()).isEqualTo(2);
        assertThat(member.getMileage()).isEqualTo(0);
    }

    @Test
    void 마일리지보다_쿠폰_금액이_크면_예외가_발생한다() throws Exception{
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("ssafy@naver.com")
                .mileage(4000)
                .build();
        memberRepository.save(member);

        // when & then
        Assertions.assertThrows(NotEnoughMileageException.class, () ->couponService.buy(member.getId(), 3));

    }



}
