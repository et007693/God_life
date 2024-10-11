package com.ssafy.god_life.team.member.service;

import com.ssafy.god_life.common.BaseTest;
import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.member.repository.MemberRepository;
import com.ssafy.god_life.team.domain.Team;
import com.ssafy.god_life.team.history.domain.TeamRuleHistory;
import com.ssafy.god_life.team.history.repository.TeamRuleHistoryRepository;
import com.ssafy.god_life.team.member.domain.TeamMember;
import com.ssafy.god_life.team.member.dto.request.SetTimeRequestDto;
import com.ssafy.god_life.team.member.dto.response.TeamInfoResponseDto;
import com.ssafy.god_life.team.member.repository.TeamMemberRepository;
import com.ssafy.god_life.team.repository.TeamRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.time.LocalTime;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class TeamMemberServiceTest extends BaseTest {

    @Autowired
    TeamMemberService teamMemberService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    TeamMemberRepository teamMemberRepository;
    @Autowired
    private TeamRuleHistoryRepository teamRuleHistoryRepository;

    @Test
    void 방_조회에_필요한_정보를_조회한다() throws Exception {
        // given
        Member member = Member.builder()
                .nickname("송주한")
                .email("ssafy@naver.com")
                .userKey("b2ac6430-6d38-424d-84b5-ac10a8e07f97")
                .mainAccountNo("9999972148117881")
                .personal(null)
                .build();
        memberRepository.save(member);

        Member member2 = Member.builder()
                .nickname("박진우")
                .email("ssafy@naver.com")
                .userKey("138a680b-cfd5-41fc-932a-71e4531a2e54")
                .mainAccountNo("9995598342174428")
                .personal(null)
                .build();
        memberRepository.save(member2);

        Team team = Team.builder()
                .title("강김박")
                .fine(1000L)
                .rule("일찍 일어나기")
                .accountNo("9990030015497453")
                .expiredDate(LocalDateTime.now())
                .memberId(member.getId())
                .build();
        teamRepository.save(team);

        TeamMember teamMember = TeamMember.builder()
                .member(member)
                .team(team)
                .selectedTime(LocalTime.of(0, 0))
                .delayedFine(1000L)
                .build();
        teamMemberRepository.save(teamMember);

        TeamMember teamMember2 = TeamMember.builder()
                .member(member2)
                .team(team)
                .build();
        teamMemberRepository.save(teamMember2);

        // when
        TeamInfoResponseDto teamInfo = teamMemberService.getTeamInfo(team.getId(), member.getId());

        // then
        assertThat(teamInfo.getMemberList().size()).isEqualTo(2);
        assertThat(teamInfo.getSelectedTime()).isEqualTo(LocalTime.of(0, 0));
        assertThat(teamInfo.getDelayedFine()).isEqualTo(1000L);
    }

    @Test
    void 시간을_설정한다() throws Exception {
        // given
        Member member = Member.builder()
                .nickname("송주한")
                .email("ssafy@naver.com")
                .build();
        memberRepository.save(member);

        Team team = Team.builder()
                .title("강김박")
                .fine(1000L)
                .rule("일찍 일어나기")
                .expiredDate(LocalDateTime.now())
                .build();
        teamRepository.save(team);

        TeamMember teamMember = TeamMember.builder()
                .member(member)
                .team(team)
                .delayedFine(1000L)
                .build();
        teamMemberRepository.save(teamMember);
        // when
        teamMemberService.setTime(team.getId(), member.getId(), SetTimeRequestDto.builder()
                .meridiem("오후")
                .time(LocalTime.of(5, 51))
                .build());
        // then
        assertThat(teamMember.getSelectedTime()).hasSameHourAs(LocalTime.of(17, 51));
    }

    @Test
    void 면제권을_사용한다() throws Exception {
        // given
        Member member = Member.builder()
                .nickname("송주한")
                .email("ssafy@naver.com")
                .fineImmunityCount(3)
                .build();
        memberRepository.save(member);

        Team team = Team.builder()
                .title("강김박")
                .fine(1000L)
                .rule("일찍 일어나기")
                .expiredDate(LocalDateTime.now())
                .build();
        teamRepository.save(team);

        TeamMember teamMember = TeamMember.builder()
                .member(member)
                .team(team)
                .delayedFine(1000L)
                .build();
        teamMemberRepository.save(teamMember);

        TeamRuleHistory teamRuleHistory = TeamRuleHistory.builder()
                .member(member)
                .team(team)
                .charged(1000L)
                .build();
        teamRuleHistoryRepository.save(teamRuleHistory);

        // when
        teamMemberService.useCoupon(team.getId(), member.getId());
        // then
        assertThat(teamMember.getDelayedFine()).isEqualTo(0L);
        assertThat(member.getFineImmunityCount()).isEqualTo(2);
    }

}
