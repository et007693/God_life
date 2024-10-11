package com.ssafy.god_life.member.repository;

import com.ssafy.god_life.member.dto.response.MyPageResponseDto;
import com.ssafy.god_life.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    @Query(value = "select new com.ssafy.god_life.member.dto.response.MyPageResponseDto(m.nickname, m.profileImageURL, m.mileage, m.fineImmunityCount) " +
            "from Member m " +
            "where m.id = :id")
    Optional<MyPageResponseDto> findMyPageInfoById(Long id);

    Optional<Member> findBySocialId(Long socialId);

    @Query("select m.personal.id " +
            "from Member m " +
            "where m.id = :id")
    Long findPersonalIdById(Long id);

    @Query("select m.mileage " +
            "from Member m " +
            "where m.id = :id")
    int findMileageById(Long id);

    @Query("select m " +
            "from Member m " +
            "where m.mainAccountNo = :accountNo")
    Optional<Member> findMemberByAccountNo(String accountNo);
}
