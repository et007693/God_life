package com.ssafy.god_life.team.history.service;

import com.ssafy.god_life.common.BaseTest;
import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.member.dto.response.RoomInfoResponseDto;
import com.ssafy.god_life.member.repository.MemberRepository;
import com.ssafy.god_life.team.domain.Team;
import com.ssafy.god_life.team.history.domain.TeamRuleHistory;
import com.ssafy.god_life.team.history.repository.TeamRuleHistoryRepository;
import com.ssafy.god_life.team.member.domain.TeamMember;
import com.ssafy.god_life.team.member.repository.TeamMemberRepository;
import com.ssafy.god_life.team.member.service.TeamMemberService;
import com.ssafy.god_life.team.repository.TeamRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class TeamRuleHistoryServiceTest extends BaseTest {

    @Autowired
    TeamMemberService teamMemberService;

    @Autowired
    TeamRuleHistoryService teamRuleHistoryService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    TeamMemberRepository teamMemberRepository;

    @Autowired
    TeamRuleHistoryRepository teamRuleHistoryRepository;

    @Test
    void 멤버가_속한_팀의_당일_미션_달성_여부를_조회한다() throws Exception{
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("ssafy@naver.com")
                .personal(null)
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
        List<RoomInfoResponseDto> simpleTeamRuleHistoryToday = teamRuleHistoryService.getSimpleTeamRuleHistoryToday(member.getId());
        // then
        for (RoomInfoResponseDto roomInfoResponseDto : simpleTeamRuleHistoryToday) {
            System.out.println(roomInfoResponseDto.getRule());
        }
    }

    @Test
    void 팀_멤버의_미션_달성_여부를_저장한다() throws Exception{
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("ssafy@naver.com")
                .personal(null)
                .build();
        memberRepository.save(member);

        Team team = Team.builder()
                .title("강김박")
                .fine(1000L)
                .rule("일찍 일어나기")
                .expiredDate(LocalDateTime.now())
                .build();
        teamRepository.save(team);
        teamMemberService.save(team.getId(), member.getId());

        // when
        teamRuleHistoryService.completeMission(new MockMultipartFile(
                "picture",
                "thumbnail.png",
                MediaType.IMAGE_PNG_VALUE,
                "thumbnail".getBytes()), team.getId(), member.getId());
        // then
        assertThat(teamRuleHistoryRepository.findTodayByTeamIdAndMemberId(team.getId(), member.getId())
                .get().isCompleted()).isEqualTo(true);
    }

}
