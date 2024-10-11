package com.ssafy.god_life.coupon.controller;

import com.ssafy.god_life.coupon.dto.request.CouponBuyRequestDto;
import com.ssafy.god_life.coupon.dto.response.CouponHistoryResponseDto;
import com.ssafy.god_life.coupon.dto.response.CouponInfoResponseDto;
import com.ssafy.god_life.coupon.history.dto.response.CouponHistoryDetailResponseDto;
import com.ssafy.god_life.coupon.history.service.CouponHistoryService;
import com.ssafy.god_life.coupon.service.CouponService;
import com.ssafy.god_life.global.dto.CommonResponseDto;
import com.ssafy.god_life.global.dto.LoginMember;
import com.ssafy.god_life.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
public class CouponController {

    private final CouponService couponService;
    private final CouponHistoryService couponHistoryService;

    private final MemberRepository memberRepository;

    @GetMapping("/coupon")
    public ResponseEntity<?> getCouponPrice(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember) {
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(CouponInfoResponseDto.builder()
                        .price(couponService.getPrice())
                        .build()
                )
                .message("쿠폰 정보 조회에 성공했습니다")
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/coupon")
    public ResponseEntity<?> buy(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember,
                                 @RequestBody CouponBuyRequestDto couponBuyRequestDto) {
        couponService.buy(loginMember.getId(), couponBuyRequestDto.getAmount());

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/coupon/history")
    public ResponseEntity<?> getHistory(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember,
                                        @PageableDefault(size = 10, sort = "createdDate", direction = Sort.Direction.DESC) Pageable pageable) {
        log.info("pageable={}", pageable);
        Page<CouponHistoryDetailResponseDto> page = couponHistoryService.getInfo(loginMember.getId(), pageable);
        log.info("page={}", page);
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(new CouponHistoryResponseDto(memberRepository.findMileageById(loginMember.getId()),
                        page)
                )
                .message("쿠폰 정보 조회에 성공했습니다")
                .build();
        return ResponseEntity.ok(response);
    }
}
