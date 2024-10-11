package com.ssafy.god_life.betting.service;

import com.ssafy.god_life.common.BaseTest;
import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.member.repository.MemberRepository;
import com.ssafy.god_life.team.betting.domain.Betting;
import com.ssafy.god_life.team.betting.repository.BettingRepository;
import com.ssafy.god_life.team.betting.service.BettingService;
import com.ssafy.god_life.team.domain.Team;
import com.ssafy.god_life.team.member.domain.TeamMember;
import com.ssafy.god_life.team.member.repository.TeamMemberRepository;
import com.ssafy.god_life.team.repository.TeamRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.time.LocalTime;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class BettingServiceTest extends BaseTest {

    @Autowired
    BettingService bettingService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    TeamMemberRepository teamMemberRepository;

    @Autowired
    BettingRepository bettingRepository;

    @Test
    void 베팅에_참가한다() throws Exception{
        // given
        Member member = Member.builder()
                .nickname("송주한")
                .email("ssafy@naver.com")
                .latitudeSetting(11.11)
                .longitudeSetting(11.11)
                .userKey("b2ac6430-6d38-424d-84b5-ac10a8e07f97")
                .mainAccountNo("9994088573787956")
                .homeName("서울")
                .build();
        memberRepository.save(member);

        Member member2 = Member.builder()
                .nickname("박진우")
                .email("ssafy@naver.com")
                .latitudeSetting(11.11)
                .longitudeSetting(11.11)
                .userKey("b2ac6430-6d38-424d-84b5-ac10a8e07f97")
                .mainAccountNo("9994446545264368")
                .homeName("서울")
                .build();
        memberRepository.save(member2);

        Team team = Team.builder()
                .title("강김박")
                .fine(1000L)
                .rule("일찍 일어나기")
                .expiredDate(LocalDateTime.now())
                .accountNo("9990030015497453")
                .memberId(member.getId())
                .build();
        teamRepository.save(team);

        TeamMember teamMember = TeamMember.builder()
                .member(member)
                .team(team)
                .selectedTime(LocalTime.of(14, 10))
                .prefixFine(10000L)
                .build();
        teamMemberRepository.save(teamMember);

        TeamMember teamMember2 = TeamMember.builder()
                .member(member2)
                .team(team)
                .prefixFine(1000000L)
                .build();
        teamMemberRepository.save(teamMember2);
        // when
        bettingService.bet(member.getId(), team.getId(), true);
        Betting betting = bettingRepository.findTodayByMemberIdAndTeamId(member.getId(), team.getId())
                .orElseThrow(() -> new RuntimeException("베팅 정보가 없습니다"));
        // then
        assertThat(betting.isBetSuccess()).isTrue();
        assertThat(betting.getMember().getId()).isEqualTo(member.getId());
    }

}
