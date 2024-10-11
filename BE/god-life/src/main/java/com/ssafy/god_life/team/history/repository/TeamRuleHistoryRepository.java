package com.ssafy.god_life.team.history.repository;

import com.ssafy.god_life.team.history.domain.TeamRuleHistory;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TeamRuleHistoryRepository extends JpaRepository<TeamRuleHistory, Long> {

    @Query("SELECT th " +
            "FROM TeamRuleHistory th " +
            "WHERE th.member.id = :memberId " +
            "AND YEAR(th.createdDate) = YEAR(CURRENT_DATE) " +
            "AND MONTH(th.createdDate) = MONTH(CURRENT_DATE) " +
            "AND DAY(th.createdDate) = DAY(CURRENT_DATE)")
    List<TeamRuleHistory> findAllTodayByMemberId(Long memberId);

    @Query("SELECT th.isCompleted " +
            "FROM TeamRuleHistory th " +
            "WHERE th.team.id = :teamId " +
            "AND th.member.id = :memberId " +
            "AND YEAR(th.createdDate) = YEAR(CURRENT_DATE) " +
            "AND MONTH(th.createdDate) = MONTH(CURRENT_DATE) " +
            "AND DAY(th.createdDate) = DAY(CURRENT_DATE)")
    Boolean isCompletedTodayByTeamIdAndMemberId(Long teamId, Long memberId);

    @Transactional
    void deleteByTeamId(Long teamId);

    @Query("Select count(h) " +
            "from TeamRuleHistory h " +
            "where h.team.id = :teamId " +
            "and h.member.id = :memberId " +
            "and h.isCompleted = :isCompleted " +
            "and h.createdDate = :createdDate")
    int CountByTeamIdAmdMemberIdAndCompletedAndCreatedDate(Long teamId, Long memberId, boolean isCompleted, LocalDate createdDate);

    @Query("Select h " +
            "from TeamRuleHistory h " +
            "where h.isCompleted = :isCompleted " +
            "and YEAR(h.createdDate) = YEAR(:createdDate)" +
            "and MONTH(h.createdDate) = MONTH(:createdDate)" +
            "and DAY(h.createdDate) = DAY(:createdDate)")
    List<TeamRuleHistory> TeamRuleHistoryByCreatedDate(boolean isCompleted, LocalDate createdDate);


    @Query("SELECT th " +
            "FROM TeamRuleHistory th " +
            "WHERE th.member.id = :memberId " +
            "AND th.team.id = :teamId " +
            "AND YEAR(th.createdDate) = YEAR(CURRENT_DATE) " +
            "AND MONTH(th.createdDate) = MONTH(CURRENT_DATE) " +
            "AND DAY(th.createdDate) = DAY(CURRENT_DATE)")
    Optional<TeamRuleHistory> findTodayByTeamIdAndMemberId(Long teamId, Long memberId);

    @Query("SELECT th " +
            "FROM TeamRuleHistory th " +
            "WHERE YEAR(th.createdDate) = YEAR(CURRENT_DATE) " +
            "AND MONTH(th.createdDate) = MONTH(CURRENT_DATE) " +
            "AND th.isCompleted is true " +
            "AND th.team.id = :teamId")
    List<TeamRuleHistory> findAllImageByTeamId(Long teamId);

    @Query("SELECT COUNT(th) " +
            "FROM TeamRuleHistory th " +
            "WHERE th.team.id = :teamId " +
            "AND th.member.id = :memberId " +
            "AND YEAR(th.createdDate) = :year " +
            "AND MONTH(th.createdDate) = :month")
    int countByTeamIdAndMemberIdYearAndMonth(Long teamId, Long memberId, int year, int month);

    @Query("SELECT COUNT(th) " +
            "FROM TeamRuleHistory th " +
            "WHERE th.team.id = :teamId " +
            "AND th.member.id = :memberId " +
            "AND th.isCompleted is true " +
            "AND YEAR(th.createdDate) = :year " +
            "AND MONTH(th.createdDate) = :month")
    int countCompletedByTeamIdAndMemberIdAndYearAndMonth(Long teamId, Long memberId, int year, int month);

    @Query("SELECT th " +
            "FROM TeamRuleHistory th " +
            "WHERE th.team.id = :teamId " +
            "AND th.member.id = :memberId " +
            "AND YEAR(th.createdDate) = :year " +
            "AND MONTH(th.createdDate) = :month")
    List<TeamRuleHistory> findByteamIdandmemberIdAndYearAndMonth(Long teamId, Long memberId, int year, int month);

    @Query("SELECT h " +
            "FROM TeamRuleHistory h " +
            "WHERE h.team.id = :teamId " +
            "AND h.member.id = :memberId " +
            "AND YEAR(h.createdDate) = YEAR(:createdDate) " +
            "AND MONTH(h.createdDate) = MONTH(:createdDate) " +
            "AND DAY(h.createdDate) = DAY(:createdDate) ")
    TeamRuleHistory findByTeamIdAmdMemberIdAndCreatedDate(Long teamId, Long memberId, LocalDate createdDate);

    void deleteAllByMemberId(Long memberId);

    @Query("SELECT h " +
            "FROM TeamRuleHistory h " +
            "WHERE h.team.id = :teamId " +
            "AND h.member.id = :memberId " +
            "AND h.charged >0 " +
            "ORDER BY h.createdDate DESC")
    List<TeamRuleHistory> findByTeamIdAmdMemberIdAndChargedNot(Long teamId, Long memberId);

    @Query("SELECT h " +
            "FROM TeamRuleHistory h " +
            "WHERE h.team.id = :teamId " +
            "AND h.member.id = :memberId " +
            "AND h.charged >0 " +
            "ORDER BY h.createdDate ASC")
    List<TeamRuleHistory> findByTeamIdAmdMemberIdAndChargedNotASC(Long teamId, Long memberId);

    @Query("SELECT th " +
            "FROM TeamRuleHistory th " +
            "WHERE th.team.id = :teamId " +
            "AND th.member.id = :memberId " +
            "AND th.charged != 0 " +
            "ORDER BY th.createdDate DESC " +
            "LIMIT 1")
    Optional<TeamRuleHistory> findRecentByTeamIdAndMemberId(Long teamId, Long memberId);
}