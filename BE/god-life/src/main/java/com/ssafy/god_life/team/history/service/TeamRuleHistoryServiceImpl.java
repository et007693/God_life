package com.ssafy.god_life.team.history.service;

import com.ssafy.god_life.member.dto.response.RoomInfoResponseDto;
import com.ssafy.god_life.team.history.domain.TeamRuleHistory;
import com.ssafy.god_life.team.history.dto.response.HistoryImageResponseDto;
import com.ssafy.god_life.team.history.repository.TeamRuleHistoryRepository;
import com.ssafy.god_life.team.member.domain.TeamMember;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class TeamRuleHistoryServiceImpl implements TeamRuleHistoryService {

    private final TeamRuleHistoryRepository teamRuleHistoryRepository;

    @Override
    public List<RoomInfoResponseDto> getSimpleTeamRuleHistoryToday(Long memberId) {

        List<TeamRuleHistory> teamRuleHistories = teamRuleHistoryRepository.findAllTodayByMemberId(memberId);

        return teamRuleHistories.stream().map(teamRuleHistory -> RoomInfoResponseDto.builder()
                .roomId(teamRuleHistory.getTeam().getId())
                .rule(teamRuleHistory.getTeam().getRule())
                .isCompleted(teamRuleHistory.isCompleted())
                .build()).toList();
    }

    @Override
    public List<HistoryImageResponseDto> getImageListTodayByTeamId(Long teamId) {
        List<TeamRuleHistory> teamRuleHistories = teamRuleHistoryRepository.findAllImageByTeamId(teamId);
        return teamRuleHistories.stream()
                .map(teamRuleHistory -> HistoryImageResponseDto.builder().
                        memberNickname(teamRuleHistory.getMember().getNickname())
                        .picture(teamRuleHistory.getCompleteImage())
                        .day(teamRuleHistory.getCreatedDate().getDayOfMonth())
                        .build()).toList();
    }

    @Override
    public boolean isCompletedToday(Long teamId, Long memberId) {
        //주말엔 history가 없으므로 true를 반환하도록 지정
        Boolean completedToday = teamRuleHistoryRepository.isCompletedTodayByTeamIdAndMemberId(teamId, memberId);
        return completedToday == null || completedToday;
    }

    @Override
    public void addAllTodayHistory(List<TeamMember> teamMembers) {
        teamMembers.stream().map(teamMember -> TeamRuleHistory.builder()
                .team(teamMember.getTeam())
                .member(teamMember.getMember())
                .charged(teamMember.getTeam().getFine())
                .build()).forEach(teamRuleHistoryRepository::save);
    }

    @Override
    public void completeMission(MultipartFile picture, Long teamId, Long memberId) throws IOException {
        TeamRuleHistory teamRuleHistory = teamRuleHistoryRepository
                .findTodayByTeamIdAndMemberId(teamId, memberId)
                .orElseThrow(() -> new RuntimeException("조건에 맞는 팀 미션 기록이 없습니다"));

        teamRuleHistory.getMember().addMileage(50);

        String image = encodeImageToBase64(picture);
        teamRuleHistory.complete(image);
    }

    @Override
    public float calculateTeamIsCompletedByYearAndMonth(Long teamId, Long memberId, int year, int month) {
        if ((float) teamRuleHistoryRepository.countByTeamIdAndMemberIdYearAndMonth(teamId, memberId, year, month) == 0)
            return 0.0f;
        return (float) teamRuleHistoryRepository
                .countCompletedByTeamIdAndMemberIdAndYearAndMonth(teamId, memberId, year, month) / (float) teamRuleHistoryRepository
                .countByTeamIdAndMemberIdYearAndMonth(teamId, memberId, year, month) * 100;
    }

    private String encodeImageToBase64(MultipartFile image) throws IOException {
        return Base64.getEncoder().encodeToString(image.getBytes());
    }
}
