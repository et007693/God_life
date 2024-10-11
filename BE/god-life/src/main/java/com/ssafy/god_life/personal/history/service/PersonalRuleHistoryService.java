package com.ssafy.god_life.personal.history.service;

import com.ssafy.god_life.personal.history.domain.PersonalRuleHistory;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PersonalRuleHistoryService {
    /**
     * id로 RulePersonalHistory 조회한다
     *
     * @param id 조회할 RulePersonalHistory의 id
     * @return 조회한 RulePersonalHistory
     */
    PersonalRuleHistory findById(Long id);

    /**
     * personalId로 RulePersonalHistory의 리스트 조회한다
     *
     * @param personalId 조회할 RulePersonalHistory의 id
     * @return 조회한 RulePersonalHistory 리스트
     */
    List<PersonalRuleHistory> findAllByPersonalId(Long personalId);

    /**
     * personalId로 RulePersonalHistory의 수를 조회한다
     *
     * @param personalId 조회할 RulePersonalHistory의 personalId
     * @return 조회한 RulePersonalHistory 수
     */
    int countByPersonalId(Long personalId);

    /**
     * personalId와 isCompleted로 RulePersonalHistory의 수를 조회한다
     *
     * @param personalId 조회할 RulePersonalHistory의 personalId, isCompleted==true
     * @return 조회한 성공한 RulePersonalHistory 수
     */
    int countCompletedByPersonalId(Long personalId);

    /**
     * personalId와 isCompleted로 개인미션 전체 성공률을 조회한다
     *
     * @param personalId 조회할 RulePersonalHistory의 personalId
     * @return 조회한 RulePersonalHistory의 성공률
     */
    float calculatePersonalIsCompleted(Long personalId);

    /**
     * personalId와 year과 month로 개인미션 전체 생성 수를 조회한다
     *
     * @param personalId, 조회할 RulePersonalHistory의 personalId
     * @param year, 조회할 RulePersonalHistory의 year
     * @param month, 조회할 RulePersonalHistory의 month
     * @return 조회한 RulePersonalHistory의 미션 수
     */
    int countByPersonalIdAndCreatedYearAndCreatedMonth(Long personalId, int year, int month);

    /**
     * personalId와 year과 month로 개인미션 전체 성공 수를 조회한다
     *
     * @param personalId, 조회할 RulePersonalHistory의 personalId
     * @param year, 조회할 RulePersonalHistory의 year
     * @param month, 조회할 RulePersonalHistory의 month
     * @return 조회한 RulePersonalHistory의 달별 성공 수
     */
    int countByPersonalIdAndCreatedYearAndCreatedMonthAndCompleted(Long personalId, int year, int month);

    /**
     * personalId와 year과 month로 달에 개인미션을 조회한다
     *
     * @param personalId, 조회할 RulePersonalHistory의 personalId
     * @param year, 조회할 RulePersonalHistory의 year
     * @param month, 조회할 RulePersonalHistory의 month
     * @return 조회한 달별 RulePersonalHistory
     */
    List<PersonalRuleHistory> findByPersonalIdAndCreatedYearAndCreatedMonth(Long personalId, int year, int month);

    /**
     * personalId와 year과 month로 달에 개인미션 성공률을 조회한다
     *
     * @param personalId, 조회할 RulePersonalHistory의 personalId
     * @param year, 조회할 RulePersonalHistory의 year
     * @param month, 조회할 RulePersonalHistory의 month
     * @return 조회한 달별 RulePersonalHistory
     */
    float calculatePersonalIsCompletedByYearAndMonth(Long personalId, int year, int month);

    /**
     * 개인 미션 달성 여부를 저장한다
     *
     * @param picture 인증 사진
     * @param personalId 개인 미션 ID
     * @throws IOException
     */
    void completeMission(MultipartFile picture, Long personalId) throws IOException;

    /**
     * 모든 personal의 history를 날마다 생성한다.
     *
     */
    void addAllTodayHistory();
}
