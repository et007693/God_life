package com.ssafy.god_life.coupon.history.repository;

import com.ssafy.god_life.coupon.history.domain.CouponHistory;
import com.ssafy.god_life.coupon.history.dto.response.CouponHistoryDetailResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CouponHistoryRepository extends JpaRepository<CouponHistory, Long> {

    @Query("SELECT new com.ssafy.god_life.coupon.history.dto.response.CouponHistoryDetailResponseDto(YEAR(ch.createdDate)," +
            "MONTH(ch.createdDate),DAY(ch.createdDate),HOUR(ch.createdDate), MINUTE(ch.createdDate), ch.itemName, ch.amount, " +
            "ch.usedMileage, ch.leftMileage) " +
            "FROM CouponHistory ch " +
            "WHERE ch.member.id = :memberId")
    Page<CouponHistoryDetailResponseDto> findAllByMemberId(Long memberId, Pageable pageable);

    void deleteAllByMemberId(Long memberId);
}
