package com.ssafy.god_life.coupon.service;

import com.ssafy.god_life.coupon.exception.NotEnoughMileageException;
import com.ssafy.god_life.coupon.history.domain.CouponHistory;
import com.ssafy.god_life.coupon.history.repository.CouponHistoryRepository;
import com.ssafy.god_life.coupon.repository.CouponRepository;
import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.member.exception.MemberNotFoundException;
import com.ssafy.god_life.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class CouponServiceImpl implements CouponService {

    private final MemberRepository memberRepository;
    private final CouponRepository couponRepository;
    private final CouponHistoryRepository couponHistoryRepository;

    @Override
    public int getPrice() {
        return couponRepository.findAll().get(0).getPrice();
    }

    @Override
    public void buy(Long memberId, int amount){
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException("Id에 해당하는 멤버를 찾을 수 없습니다."));

        int totalPrice = getPrice() * amount;
        if(totalPrice>member.getMileage()){
            throw new NotEnoughMileageException("마일리지 잔액이 부족합니다");
        }

        member.useMileage(totalPrice);
        member.addFineImmunity(amount);

        couponHistoryRepository.save(CouponHistory.builder()
                .amount(amount)
                .itemName("벌금면제권 구매")
                .usedMileage(totalPrice)
                .leftMileage(member.getMileage())
                .member(member)
                .build());

    }
}
