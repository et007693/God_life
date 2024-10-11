package com.ssafy.god_life.team.betting.repository;

import com.ssafy.god_life.team.betting.domain.Betting;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

import java.util.List;

public interface BettingRepository extends JpaRepository<Betting, Long> {

    @Query("SELECT b " +
            "FROM Betting b " +
            "WHERE YEAR(b.createdDate) = YEAR(CURRENT_DATE) " +
            "AND MONTH(b.createdDate) = MONTH(CURRENT_DATE) " +
            "AND DAY(b.createdDate) = DAY(CURRENT_DATE)" +
            "AND b.member.id = :memberId " +
            "AND b.team.id = :teamId")
    Optional<Betting> findTodayByMemberIdAndTeamId(Long memberId, Long teamId);

    List<Betting> findByTeamId(Long teamId);

    @Transactional
    void deleteByTeamId(Long teamId);

    void deleteByMemberIdAndTeamId(Long memberId, Long teamId);
}
