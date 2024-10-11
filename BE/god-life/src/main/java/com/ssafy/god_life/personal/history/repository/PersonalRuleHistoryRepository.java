package com.ssafy.god_life.personal.history.repository;

import com.ssafy.god_life.personal.history.domain.PersonalRuleHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PersonalRuleHistoryRepository extends JpaRepository<PersonalRuleHistory, Long> {

    List<PersonalRuleHistory> findAllByPersonalId(Long personalId);

    int countByPersonalId(Long personalId);

    int countByPersonalIdAndIsCompletedTrue(Long personalId);

    @Query("SELECT COUNT(e) " +
            "FROM PersonalRuleHistory e " +
            "WHERE e.personal.id = :personalId " +
            "AND YEAR(e.createdDate) = :year " +
            "AND MONTH(e.createdDate) = :month")
    int countByIdAndYearAndMonth(Long personalId, int year, int month);

    @Query("SELECT COUNT(e) " +
            "FROM PersonalRuleHistory e " +
            "WHERE e.isCompleted is true " +
            "AND e.personal.id = :personalId " +
            "AND YEAR(e.createdDate) = :year " +
            "AND MONTH(e.createdDate) = :month")
    int countCompletedByIdAndYearAndMonth(Long personalId, int year,int month);

    @Query("SELECT e " +
            "FROM PersonalRuleHistory e " +
            "WHERE e.personal.id = :personalId " +
            "AND YEAR(e.createdDate) = :year " +
            "AND MONTH(e.createdDate) = :month")
    List<PersonalRuleHistory> findByPersonalIdAndYearAndMonth(Long personalId, int year, int month);

    @Query("SELECT e.isCompleted " +
            "FROM PersonalRuleHistory e " +
            "WHERE e.personal.id = :personalId " +
            "AND YEAR(e.createdDate) = YEAR(CURRENT_DATE) " +
            "AND MONTH(e.createdDate) = MONTH(CURRENT_DATE) " +
            "AND DAY(e.createdDate) = DAY(CURRENT_DATE)")
    Boolean isCompletedTodayByPersonalId(Long personalId);

    @Query("SELECT e " +
            "FROM PersonalRuleHistory e " +
            "WHERE e.personal.id = :personalId " +
            "AND YEAR(e.createdDate) = YEAR(CURRENT_DATE) " +
            "AND MONTH(e.createdDate) = MONTH(CURRENT_DATE) " +
            "AND DAY(e.createdDate) = DAY(CURRENT_DATE)")
    Optional<PersonalRuleHistory> findTodayByPersonalId(Long personalId);

    @Query("SELECT count(e) " +
            "FROM PersonalRuleHistory e " +
            "WHERE e.personal.id = :personalId " +
            "AND e.isCompleted = false " +
            "AND e.createdDate " +
            "BETWEEN :createdDate " +
            "AND :now")
    int countByPersonalIdAndCreatedDateAndNow(Long personalId, LocalDateTime createdDate, LocalDateTime now);

    void deleteAllByPersonalId(Long personalId);
}
