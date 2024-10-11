package com.ssafy.god_life.coupon.history.service;

import com.ssafy.god_life.coupon.history.dto.response.CouponHistoryDetailResponseDto;
import com.ssafy.god_life.coupon.history.repository.CouponHistoryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class CouponHistoryServiceImpl implements CouponHistoryService {

    private final CouponHistoryRepository couponHistoryRepository;

    @Override
    public Page<CouponHistoryDetailResponseDto> getInfo(Long memberId, Pageable pageable) {
        log.info("zzzzzzzzzzzzzzzzzzzzz");
        log.info("-------------------------------------get------------------------------------");
        log.info("{}", couponHistoryRepository.findAllByMemberId(memberId, pageable));
        return couponHistoryRepository.findAllByMemberId(memberId, pageable);
    }
}
