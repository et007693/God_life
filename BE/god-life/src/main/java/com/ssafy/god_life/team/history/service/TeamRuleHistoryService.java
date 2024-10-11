package com.ssafy.god_life.team.history.service;

import com.ssafy.god_life.member.dto.response.RoomInfoResponseDto;
import com.ssafy.god_life.team.history.dto.response.HistoryImageResponseDto;
import com.ssafy.god_life.team.member.domain.TeamMember;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


public interface TeamRuleHistoryService {

    /**
     * 멤버가 속한 팀의 미션을 당일 달성여부에 대한 정보를 요청한다.
     *
     * @param memberId 요청한 멤버의 ID
     * @return 미션 달성에 대한 정보
     */
    List<RoomInfoResponseDto> getSimpleTeamRuleHistoryToday(Long memberId);

    List<HistoryImageResponseDto> getImageListTodayByTeamId(Long teamId);

    boolean isCompletedToday(Long teamId, Long memberId);

    /**
     * 하루마다 모든 팀 규칙 기록들을 생성한다.
     *
     */
    void addAllTodayHistory(List<TeamMember> teamMembers);

    /**
     * 팀 미션 달성 여부를 저장한다
     *
     * @param picture 인증 사진
     * @param teamId 팀 ID
     * @throws IOException
     */
    void completeMission(MultipartFile picture, Long teamId, Long memberId) throws IOException;

    /**
     * 팀 멤버의 미션 성공률을 조회한다
     *
     * @param teamId 팀 ID
     * @param memberId 멤버 ID
     * @param year 연도
     * @param month 월
     * @return 성공률
     */
    float calculateTeamIsCompletedByYearAndMonth(Long teamId, Long memberId, int year, int month);
}
