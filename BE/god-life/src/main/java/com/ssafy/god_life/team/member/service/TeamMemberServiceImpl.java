package com.ssafy.god_life.team.member.service;

import com.ssafy.god_life.global.fintech.service.FintechService;
import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.member.dto.response.SimpleMemberResponseDto;
import com.ssafy.god_life.member.exception.MemberNotFoundException;
import com.ssafy.god_life.member.repository.MemberRepository;
import com.ssafy.god_life.team.domain.Team;
import com.ssafy.god_life.team.history.domain.TeamRuleHistory;
import com.ssafy.god_life.team.history.repository.TeamRuleHistoryRepository;
import com.ssafy.god_life.team.member.domain.TeamMember;
import com.ssafy.god_life.team.member.dto.request.SetTimeRequestDto;
import com.ssafy.god_life.team.member.dto.response.TeamInfoResponseDto;
import com.ssafy.god_life.team.member.exception.MemberAlreadyExistException;
import com.ssafy.god_life.team.member.exception.NoDelayedFineException;
import com.ssafy.god_life.team.member.exception.NotEnoughCouponException;
import com.ssafy.god_life.team.member.repository.TeamMemberRepository;
import com.ssafy.god_life.team.repository.TeamRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class TeamMemberServiceImpl implements TeamMemberService {

    private final TeamMemberRepository teamMemberRepository;
    private final MemberRepository memberRepository;
    private final TeamRepository teamRepository;
    private final TeamRuleHistoryRepository teamRuleHistoryRepository;

    private final FintechService fintechService;

    @Override
    public TeamInfoResponseDto getTeamInfo(Long teamId, Long memberId) {
        TeamMember findTeamMember = teamMemberRepository.findByTeamIdAndMemberId(teamId, memberId)
                .orElseThrow(() -> new RuntimeException("id에 해당하는 TeamMember가 없습니다"));

        List<TeamMember> teamMembers = teamMemberRepository.findByTeamId(teamId);
        List<SimpleMemberResponseDto> simpleMemberResponseDtoList = teamMembers.stream().map(teamMember -> SimpleMemberResponseDto.builder()
                .profileImage(teamMember.getMember().getProfileImageURL())
                .build()).toList();

        Team team = teamRepository.findById(teamId).orElseThrow(() -> new RuntimeException("id에 해당하는 Team이 없습니다."));
        Long inquireDemandDepositAccountBalance = fintechService.inquireDemandDepositAccountBalance(team.getMemberId(), team.getAccountNo()).getREC().getAccountBalance();

        return TeamInfoResponseDto.builder()
                .isTimeSet(findTeamMember.isTimeSet())
                .selectedTime(findTeamMember.getSelectedTime())
                .gatheredFine(inquireDemandDepositAccountBalance)
                .delayedFine(findTeamMember.getDelayedFine())
                .memberList(simpleMemberResponseDtoList)
                .build();
    }

    @Override
    public Long save(Long teamId, Long memberId) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException("ID에 해당하는 멤버가 없습니다."));
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("ID에 해당하는 팀이 없습니다"));

        boolean present = teamMemberRepository.findByTeamIdAndMemberId(teamId, memberId).isPresent();
        if (present) {
            throw new MemberAlreadyExistException("이미 존재하는 멤버입니다");
        }

        TeamMember teamMember = teamMemberRepository.save(TeamMember.builder()
                .member(member)
                .team(team)
                .build());

        teamRuleHistoryRepository.save(TeamRuleHistory.builder()
                .member(member)
                .team(team)
                .build());

        return teamMember.getId();
    }

    @Override
    public void setTime(Long teamId, Long memberId, SetTimeRequestDto setTimeRequestDto) {
        TeamMember findTeamMember = teamMemberRepository.findByTeamIdAndMemberId(teamId, memberId)
                .orElseThrow(() -> new RuntimeException("id에 해당하는 TeamMember가 없습니다"));

        findTeamMember.saveTime(setTimeRequestDto);
    }


    @Override
    public void fineCheck() {

        List<TeamRuleHistory> list = teamRuleHistoryRepository.TeamRuleHistoryByCreatedDate(false, LocalDate.now().minusDays(1));

        for (TeamRuleHistory teamRuleHistory : list) {
            TeamMember teamMember = teamMemberRepository.findByTeamIdAndMemberId(teamRuleHistory.getTeam().getId(), teamRuleHistory.getMember().getId())
                    .orElseThrow(() -> new RuntimeException("ID에 해당하는 TeamMember가 없습니다"));
            teamMember.addDelayedFine();
            teamRuleHistory.charge(teamMember.getTeam().getFine());
        }
    }

    @Override
    public void useCoupon(Long teamId, Long memberId) {
        TeamMember teamMember = teamMemberRepository.findByTeamIdAndMemberId(teamId, memberId)
                .orElseThrow(() -> new RuntimeException("ID에 해당하는 TeamMember를 찾을 수 없습니다"));

        if (teamMember.getDelayedFine() == 0L) {
            throw new NoDelayedFineException("밀린 벌금이 없습니다");
        }
        if(teamMember.getMember().getFineImmunityCount()==0){
            throw new NotEnoughCouponException("사용 가능한 쿠폰이 없습니다.");
        }
        TeamRuleHistory teamRuleHistory = teamRuleHistoryRepository.findRecentByTeamIdAndMemberId(teamId, memberId)
                .orElseThrow(() -> new RuntimeException("ID에 해당하는 TeamRule 기록을 찾을 수 없습니다"));
        teamRuleHistory.useCoupon();
        teamMember.useCoupon();
    }
}
