package com.ssafy.god_life.member.service;

import com.ssafy.god_life.common.BaseTest;
import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.member.dto.request.SetHomeRequestDto;
import com.ssafy.god_life.member.dto.response.MainPageResponseDto;
import com.ssafy.god_life.member.dto.response.MyPageResponseDto;
import com.ssafy.god_life.member.repository.MemberRepository;
import com.ssafy.god_life.personal.domain.Personal;
import com.ssafy.god_life.personal.history.repository.PersonalRuleHistoryRepository;
import com.ssafy.god_life.personal.service.PersonalService;
import com.ssafy.god_life.team.domain.Team;
import com.ssafy.god_life.team.history.domain.TeamRuleHistory;
import com.ssafy.god_life.team.history.repository.TeamRuleHistoryRepository;
import com.ssafy.god_life.team.member.domain.TeamMember;
import com.ssafy.god_life.team.member.repository.TeamMemberRepository;
import com.ssafy.god_life.team.repository.TeamRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class MemberServiceTest extends BaseTest {

    @Autowired
    MemberService memberService;

    @Autowired
    PersonalService personalService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PersonalRuleHistoryRepository personalRuleHistoryRepository;

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    TeamMemberRepository teamMemberRepository;

    @Autowired
    TeamRuleHistoryRepository teamRuleHistoryRepository;

    @Test
    void 마이페이지의_정보를_조회한다() throws Exception{
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("ssafy@naver.com")
                .fineImmunityCount(3)
                .mileage(1000)
                .build();

        memberRepository.save(member);
        // when
        MyPageResponseDto response = memberService.getMyPageInfoById(member.getId());
        
        // then
        assertThat(response.getNickname()).isEqualTo(member.getNickname());
        assertThat(response.getFineImmunityCount()).isEqualTo(member.getFineImmunityCount());
        assertThat(response.getMileage()).isEqualTo(member.getMileage());
    }

    @Test
    void 메인페이지의_정보를_조회한다() throws Exception{
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("ssafy@naver.com")
                .build();
        memberRepository.save(member);

        Personal personal = Personal.builder()
                .rule("운동하기")
                .build();

        personalService.save(personal, member.getId());

        Team team = Team.builder()
                .title("강김박")
                .fine(1000L)
                .rule("일찍 일어나기")
                .expiredDate(LocalDateTime.now())
                .build();
        teamRepository.save(team);

        Team team2 = Team.builder()
                .title("강김박2")
                .fine(1000L)
                .rule("운동하기")
                .expiredDate(LocalDateTime.now())
                .build();
        teamRepository.save(team2);

        TeamMember teamMember = TeamMember.builder()
                .member(member)
                .team(team)
                .build();
        teamMemberRepository.save(teamMember);

        TeamMember teamMember2 = TeamMember.builder()
                .member(member)
                .team(team2)
                .build();
        teamMemberRepository.save(teamMember2);

        TeamRuleHistory teamRuleHistory = TeamRuleHistory.builder()
                .isCompleted(true)
                .member(member)
                .team(team)
                .build();
        teamRuleHistoryRepository.save(teamRuleHistory);

        TeamRuleHistory teamRuleHistory2 = TeamRuleHistory.builder()
                .isCompleted(true)
                .member(member)
                .team(team2)
                .build();
        teamRuleHistoryRepository.save(teamRuleHistory2);
        // when
        MainPageResponseDto mainPageInfo = memberService.getMainPageInfoByMemberId(member.getId());

        // then
        assertThat(mainPageInfo.getPersonalRoomList().size()).isEqualTo(1);
        assertThat(mainPageInfo.getPersonalRoomList().get(0).getRule()).isEqualTo("운동하기");

        assertThat(mainPageInfo.getTeamRoomList().size()).isEqualTo(2);
    }

    @Test
    void 개인미션이_없는_메인페이지의_정보를_조회한다() throws Exception{
        // given
        Member member = Member.builder()
                .nickname("ssafy")
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

        Team team2 = Team.builder()
                .title("강김박2")
                .fine(1000L)
                .rule("운동하기")
                .expiredDate(LocalDateTime.now())
                .build();
        teamRepository.save(team2);

        TeamMember teamMember = TeamMember.builder()
                .member(member)
                .team(team)
                .build();
        teamMemberRepository.save(teamMember);

        TeamMember teamMember2 = TeamMember.builder()
                .member(member)
                .team(team2)
                .build();
        teamMemberRepository.save(teamMember2);

        TeamRuleHistory teamRuleHistory = TeamRuleHistory.builder()
                .isCompleted(true)
                .member(member)
                .team(team)
                .build();
        teamRuleHistoryRepository.save(teamRuleHistory);

        TeamRuleHistory teamRuleHistory2 = TeamRuleHistory.builder()
                .isCompleted(true)
                .member(member)
                .team(team2)
                .build();
        teamRuleHistoryRepository.save(teamRuleHistory2);
        // when
        MainPageResponseDto mainPageInfo = memberService.getMainPageInfoByMemberId(member.getId());

        // then
        assertThat(mainPageInfo.getPersonalRoomList().size()).isEqualTo(0);
        assertThat(mainPageInfo.getTeamRoomList().size()).isEqualTo(2);
    }

    @Test
    void 집을_등록한다() throws Exception{
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("ssafy@naver.com")
                .fineImmunityCount(3)
                .mileage(1000)
                .build();

        memberRepository.save(member);
        // when
        memberService.setHomeById(member.getId(), SetHomeRequestDto.builder()
                .locationName("ssafy")
                .lat(12.33)
                .lng(11.00)
                .build());
        // then
        assertThat(member.getHomeName()).isEqualTo("ssafy");
        assertThat(member.getLatitudeSetting()).isEqualTo(12.33);
        assertThat(member.getLongitudeSetting()).isEqualTo(11.00);
        assertThat(member.isLocationSet()).isEqualTo(true);
    }

}
