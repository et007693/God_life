package com.ssafy.god_life.coupon.history.service;

import com.ssafy.god_life.common.BaseTest;
import com.ssafy.god_life.coupon.domain.Coupon;
import com.ssafy.god_life.coupon.history.dto.response.CouponHistoryDetailResponseDto;
import com.ssafy.god_life.coupon.repository.CouponRepository;
import com.ssafy.god_life.coupon.service.CouponService;
import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.member.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class CouponHistoryServiceTest extends BaseTest {

    @Autowired
    CouponService couponService;

    @Autowired
    CouponHistoryService couponHistoryService;

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
    void 쿠폰_구매내역을_조회한다() throws Exception {
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("ssafy@naver.com")
                .mileage(4000)
                .build();
        memberRepository.save(member);

        // when
        couponService.buy(member.getId(), 1);
        List<CouponHistoryDetailResponseDto> response = couponHistoryService
                .getInfo(member.getId(), PageRequest.of(0, 10, Sort.by("createdDate").descending()))
                .getContent();

        // then
        assertThat(response.size()).isEqualTo(1);
    }


}
