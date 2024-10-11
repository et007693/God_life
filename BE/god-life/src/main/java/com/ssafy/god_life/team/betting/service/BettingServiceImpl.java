package com.ssafy.god_life.team.betting.service;

import com.ssafy.god_life.member.exception.MemberNotFoundException;
import com.ssafy.god_life.member.repository.MemberRepository;
import com.ssafy.god_life.team.betting.domain.Betting;
import com.ssafy.god_life.team.betting.exception.MemberAlreadyBettingException;
import com.ssafy.god_life.team.betting.repository.BettingRepository;
import com.ssafy.god_life.team.repository.TeamRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class BettingServiceImpl implements BettingService {

    private final BettingRepository bettingRepository;
    private final MemberRepository memberRepository;
    private final TeamRepository teamRepository;

    @Override
    public void bet(Long memberId, Long teamId, boolean betSuccess) {
        bettingRepository.findTodayByMemberIdAndTeamId(memberId, teamId)
                .ifPresent(b -> {
                    throw new MemberAlreadyBettingException("이미 베팅에 참가했습니다.");
                });
        bettingRepository.save(Betting.builder()
                .betSuccess(betSuccess)
                .member(memberRepository.findById(memberId)
                        .orElseThrow(() -> new MemberNotFoundException("ID에 해당하는 멤버가 없습니다")))
                .team(teamRepository.findById(teamId)
                        .orElseThrow(() -> new RuntimeException("ID에 해당하는 팀이 없습니다")))
                .build());
    }

}
