package com.ssafy.god_life.team.service;

import com.ssafy.god_life.common.BaseTest;
import com.ssafy.god_life.global.fintech.dto.response.TeamPersonalTransactionResponseDto;
import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.member.repository.MemberRepository;
import com.ssafy.god_life.team.betting.domain.Betting;
import com.ssafy.god_life.team.betting.repository.BettingRepository;
import com.ssafy.god_life.team.domain.Team;
import com.ssafy.god_life.team.dto.response.*;
import com.ssafy.god_life.team.history.domain.TeamRuleHistory;
import com.ssafy.god_life.team.history.repository.TeamRuleHistoryRepository;
import com.ssafy.god_life.team.member.domain.TeamMember;
import com.ssafy.god_life.team.member.repository.TeamMemberRepository;
import com.ssafy.god_life.team.repository.TeamRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class TeamServiceTest extends BaseTest {

    @Autowired
    TeamService teamService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    TeamMemberRepository teamMemberRepository;

    @Autowired
    TeamRuleHistoryRepository teamRuleHistoryRepository;
    @Autowired
    private BettingRepository bettingRepository;

    @Test
    void 팀을_생성한다() throws Exception{
        // given & when
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
                .accountNo("00-000-00")
                .build();
        teamRepository.save(team);

        TeamMember teamMember = TeamMember.builder()
                .member(member)
                .team(team)
                .build();
        teamMemberRepository.save(teamMember);

        // then
        assertThat(team.getTitle()).isEqualTo("강김박");
        assertThat(teamMember.getMember().getId()).isEqualTo(member.getId());
        assertThat(teamMember.getTeam().getId()).isEqualTo(team.getId());
    }

    @Test
    void 팀_정보를_조회힌다() throws Exception{
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
                .isBettingOpen(false)
                .build();
        teamRepository.save(team);

        TeamMember teamMember = TeamMember.builder()
                .member(member)
                .team(team)
                .selectedTime(LocalTime.of(14, 10))
                .delayedFine(1000L)
                .build();
        teamMemberRepository.save(teamMember);

        TeamMember teamMember2 = TeamMember.builder()
                .member(member2)
                .team(team)
                .build();
        teamMemberRepository.save(teamMember2);

        TeamRuleHistory teamRuleHistory = TeamRuleHistory.builder()
                .isCompleted(true)
                .member(member)
                .team(team)
                .build();
        teamRuleHistoryRepository.save(teamRuleHistory);

        // when
        TeamResponseDto teamResponseDto = teamService.get(team.getId(), member.getId());

        // then
        assertThat(teamResponseDto.getMemberList().size()).isEqualTo(2);
        assertThat(teamResponseDto.getDelayedFine()).isEqualTo(1000L);
        assertThat(teamResponseDto.getRule()).isEqualTo(team.getRule());
        assertThat(teamResponseDto.getMeridiem()).isEqualTo("오후");
        assertThat(teamResponseDto.getTime()).isEqualTo(LocalTime.of(2, 10));

    }

    @Test
    void 정산하기_정보_조회() throws Exception {
        // given
        Member member = Member.builder()
                .nickname("송주한")
                .email("testEmail15@test.testcodes.mm")
                .fineImmunityCount(3)
                .userKey("546be87d-7bf9-4670-81e5-f1e2002aa42e")
                .mainAccountNo("9998812829524648")
                .mileage(1000)
                .build();
        memberRepository.save(member);

        Member member2 = Member.builder()
                .nickname("박진우")
                .email("testEmail15@test.testcodee.mm")
                .fineImmunityCount(3)
                .userKey("138a680b-cfd5-41fc-932a-71e4531a2e54")
                .mainAccountNo("9994446545264368")
                .mileage(1000)
                .build();
        memberRepository.save(member2);

        Team team = Team.builder()
                .title("강김박")
                .fine(1000L)
                .rule("일찍 일어나기")
                .expiredDate(LocalDateTime.now())
                .accountNo("9995909077035770")
                .memberId(member.getId())
                .build();
        teamRepository.save(team);

        TeamMember teamMember = TeamMember.builder()
                .member(member)
                .team(team)
                .selectedTime(LocalTime.of(0, 0))
                .delayedFine(1000L)
                .prefixFine(40000000L)
                .build();
        teamMemberRepository.save(teamMember);

        TeamMember teamMember2 = TeamMember.builder()
                .member(member2)
                .team(team)
                .prefixFine(10000000L)
                .build();
        teamMemberRepository.save(teamMember2);



        // when
        AdjustmentResponseDto adjustmentResponseDto = teamService.getAdjustment(team.getId(), member.getId());

        // then
        assertThat(adjustmentResponseDto).isNotNull();
        assertThat(adjustmentResponseDto.getMemberList().size()).isEqualTo(2);
        assertThat(adjustmentResponseDto.getMemberList().get(1).getTotalFine()).isEqualTo(10000000L);
        assertThat(adjustmentResponseDto.getMemberList().get(0).getTotalFinePercent()).isEqualTo(80.0);
        assertThat(adjustmentResponseDto.getAccountBank()).isEqualTo("싸피은행");
        assertThat(adjustmentResponseDto.getFineGathered()).isEqualTo(0);
        assertThat(adjustmentResponseDto.getRefundAmount()).isEqualTo(0);
        assertThat(adjustmentResponseDto.getLeaderName()).isEqualTo("송주한");
    }

    @Test
    void 이체_전_계좌정보를_조회한다() throws Exception {
        // given & when
        Member member = Member.builder()
                .nickname("ssafy")
                .email("ssafy@naver.com")
                .personal(null)
                .mainAccountNo("9995598342174428")
                .userKey("138a680b-cfd5-41fc-932a-71e4531a2e54")
                .build();
        memberRepository.save(member);

        Team team = Team.builder()
                .title("강김박")
                .fine(1000L)
                .rule("일찍 일어나기")
                .expiredDate(LocalDateTime.now())
                .accountNo("9990030015497453")
                .build();
        teamRepository.save(team);

        // then
        Assertions.assertNotEquals(null,teamService.transferAccountInfo(member.getId(), team.getId()));

    }
//    @Test
//    void 정산하기후_삭제() throws Exception {
//        // given
//        Member member = Member.builder()
//                .nickname("송주한")
//                .email("testEmail15@test.testcodes.mm")
//                .fineImmunityCount(3)
//                .userKey("546be87d-7bf9-4670-81e5-f1e2002aa42e")
//                .mainAccountNo("9990263422745078")
//                .mileage(1000)
//                .build();
//        memberRepository.save(member);
//
//        Member member2 = Member.builder()
//                .nickname("박진우")
//                .email("testEmail15@test.testcodee.mm")
//                .fineImmunityCount(3)
//                .userKey("546be87d-7bf9-4670-81e5-f1e2002aa42e")
//                .mainAccountNo("9991652753576544")
//                .mileage(1000)
//                .build();
//        memberRepository.save(member2);
//
//        Team team = Team.builder()
//                .title("강김박")
//                .fine(1000L)
//                .rule("일찍 일어나기")
//                .expiredDate(LocalDateTime.now())
//                .accountNo("9990263422745078")
//                .build();
//        teamRepository.save(team);
//
//        TeamMember teamMember = TeamMember.builder()
//                .member(member)
//                .team(team)
//                .selectedTime(LocalTime.of(0, 0))
//                .delayedFine(1000L)
//                .prefixFine(1000000000L)
//                .build();
//        teamMemberRepository.save(teamMember);
//
//        TeamMember teamMember2 = TeamMember.builder()
//                .member(member2)
//                .team(team)
//                .prefixFine(996000164L)
//                .build();
//        teamMemberRepository.save(teamMember2);
//
//        AdjustmentRequestDto adjustmentRequestDto = new AdjustmentRequestDto();
//        adjustmentRequestDto.setTeamId(team.getId());
//
//        // when
//        teamService.postAdjustment(member.getId(), adjustmentRequestDto);
//
//        // then
//        assertThat(teamMemberRepository.findByTeamId(team.getId())).isEmpty();
////        assertThat(teamRuleHistoryRepository.findByTeamId(team.getId())).isEmpty();
//    }

    // 돌릴 때 실행은 되는데 다같이 돌리면 실행안됨
//    @Test
//    void 개인벌금이체기록을_조회한다() throws Exception {
//        // given & when
//
//        Member teamMember = Member.builder()
//                .nickname("ssafy")
//                .email("ssafy@naver.com")
//                .personal(null)
//                .mainAccountNo("9990147758721585")
//                .userKey("b2ac6430-6d38-424d-84b5-ac10a8e07f97")
//                .build();
//        memberRepository.save(teamMember);
//
//        Member member = Member.builder()
//                .nickname("ssafy")
//                .email("ssafy@naver.com")
//                .personal(null)
//                .mainAccountNo("9996001894566507")
//                .userKey("bebfb817-d8ba-4c3c-9322-e1126c0f3a3a")
//                .build();
//        memberRepository.save(member);
//
//        Team team = Team.builder()
//                .title("강김박")
//                .fine(1000L)
//                .rule("일찍 일어나기")
//                .expiredDate(LocalDateTime.now())
//                .accountNo("9993099031728860")
//                .memberId(teamMember.getId())
//                .build();
//        teamRepository.save(team);
//
//        // then
//        Assertions.assertNotEquals(null, teamService.transactionHistoryListByMemberIdAndTeamId(teamMember.getId(), team.getId()));
//    }

    @Test
    void 게시판을_조회한다() throws Exception{
        // given
        Member member = Member.builder()
                .nickname("송주한")
                .email("testEmail15@test.testcodes.mm")
                .fineImmunityCount(3)
                .userKey("546be87d-7bf9-4670-81e5-f1e2002aa42e")
                .mainAccountNo("9990263422745078")
                .mileage(1000)
                .build();
        memberRepository.save(member);

        Member member2 = Member.builder()
                .nickname("박진우")
                .email("testEmail15@test.testcodee.mm")
                .fineImmunityCount(3)
                .userKey("546be87d-7bf9-4670-81e5-f1e2002aa42e")
                .mainAccountNo("9991652753576544")
                .mileage(1000)
                .build();
        memberRepository.save(member2);

        Team team = Team.builder()
                .title("강김박")
                .fine(1000L)
                .rule("일찍 일어나기")
                .expiredDate(LocalDateTime.now())
                .accountNo("9990263422745078")
                .build();
        teamRepository.save(team);

        TeamMember teamMember = TeamMember.builder()
                .member(member)
                .team(team)
                .selectedTime(LocalTime.of(0, 0))
                .delayedFine(1000L)
                .prefixFine(1000000000L)
                .build();
        teamMemberRepository.save(teamMember);

        TeamMember teamMember2 = TeamMember.builder()
                .member(member2)
                .team(team)
                .prefixFine(996000164L)
                .build();
        teamMemberRepository.save(teamMember2);

        TeamRuleHistory teamRuleHistory = TeamRuleHistory.builder()
                .team(team)
                .member(member)
                .build();
        teamRuleHistoryRepository.save(teamRuleHistory);
        // when
        teamRuleHistory.complete("123");
        TeamBoardInfoResponseDto response = teamService.getBoardInfoByIdAndMemberId(team.getId(), member.getId(), 2024, 10);

        // then
        assertThat(response.getDayList().size()).isEqualTo(1);
        assertThat(response.getDayList().get(0).getDay()).isEqualTo(LocalDate.now().getDayOfMonth());
        assertThat(response.getSuccessRate()).isEqualTo(100.0f);


    }


    @Test
    void 캘린더를_조회한다() throws Exception{
        // given
        Member member = Member.builder()
                .nickname("송주한")
                .email("testEmail15@test.testcodes.mm")
                .fineImmunityCount(3)
                .userKey("546be87d-7bf9-4670-81e5-f1e2002aa42e")
                .mainAccountNo("9990263422745078")
                .mileage(1000)
                .build();
        memberRepository.save(member);

        Member member2 = Member.builder()
                .nickname("박진우")
                .email("testEmail15@test.testcodee.mm")
                .fineImmunityCount(3)
                .userKey("546be87d-7bf9-4670-81e5-f1e2002aa42e")
                .mainAccountNo("9991652753576544")
                .mileage(1000)
                .build();
        memberRepository.save(member2);

        Team team = Team.builder()
                .title("강김박")
                .fine(1000L)
                .rule("일찍 일어나기")
                .expiredDate(LocalDateTime.now())
                .accountNo("9990263422745078")
                .build();
        teamRepository.save(team);

        TeamMember teamMember = TeamMember.builder()
                .member(member)
                .team(team)
                .selectedTime(LocalTime.of(0, 0))
                .delayedFine(1000L)
                .prefixFine(1000000000L)
                .build();
        teamMemberRepository.save(teamMember);

        TeamMember teamMember2 = TeamMember.builder()
                .member(member2)
                .team(team)
                .prefixFine(996000164L)
                .build();
        teamMemberRepository.save(teamMember2);

        TeamRuleHistory teamRuleHistory = TeamRuleHistory.builder()
                .team(team)
                .member(member)
                .build();
        teamRuleHistoryRepository.save(teamRuleHistory);
        // when
        teamRuleHistory.complete("123");
        TeamCalendarInfoResponseDto response = teamService.getTeamCalendarInfoByIdAndMemberId(team.getId(), member.getId(), 2024, 10);

        // then
        assertThat(response.getDayList().size()).isEqualTo(1);
        assertThat(response.getSuccessRate()).isEqualTo(100.0f);
        assertThat(response.getDayList().get(0).getDay()).isEqualTo(LocalDate.now().getDayOfMonth());


    }

    @Test
    void 베팅을_생성한다() throws Exception{
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
        teamService.makeBetting(team.getId());

        // then
        assertThat(team.getTargetId()).isEqualTo(member2.getId());
        assertThat(team.getIsBettingOpen()).isTrue();
    }

    @Test
    void 베팅정보를_조회한다() throws Exception{
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
                .targetId(member2.getId())
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
        BettingInfoResponseDto bettingInfo = teamService.getBettingInfo(team.getId());

        // then
        assertThat(bettingInfo.getTargetId()).isEqualTo(member2.getId());
        assertThat(bettingInfo.getTargetName()).isEqualTo(member2.getNickname());
        assertThat(bettingInfo.getTargetProfileImage()).isEqualTo(member2.getProfileImageURL());
        assertThat(bettingInfo.getRule()).isEqualTo(team.getRule());
        assertThat(bettingInfo.getPrize()).isEqualTo(1000L);
    }


    @Test
    void 베팅의_결과를_정산합니다() throws Exception{
        // given
        Member member = Member.builder()
                .nickname("송주한")
                .email("testEmail15@test.testcodes.mm")
                .fineImmunityCount(3)
                .userKey("b2ac6430-6d38-424d-84b5-ac10a8e07f97")
                .mainAccountNo("9990263422745078")
                .mileage(1000)
                .build();
        memberRepository.save(member);

        Member member2 = Member.builder()
                .nickname("박진우")
                .email("testEmail15@test.testcodee.mm")
                .fineImmunityCount(3)
                .userKey("b2ac6430-6d38-424d-84b5-ac10a8e07f97")
                .mainAccountNo("9994446545264368")
                .mileage(1000)
                .build();
        memberRepository.save(member2);

        Team team = Team.builder()
                .title("강김박")
                .fine(1000L)
                .rule("일찍 일어나기")
                .expiredDate(LocalDateTime.now())
                .accountNo("9991980584927168")
                .isBettingOpen(true)
                .targetId(member.getId())
                .memberId(member.getId())
                .build();
        teamRepository.save(team);

        TeamMember teamMember = TeamMember.builder()
                .member(member)
                .team(team)
                .selectedTime(LocalTime.of(0, 0))
                .delayedFine(1000L)
                .prefixFine(1000000000L)
                .build();
        teamMemberRepository.save(teamMember);

        Betting bettingMember = Betting.builder()
                .betSuccess(true)
                .member(member)
                .team(team)
                .build();
        bettingRepository.save(bettingMember);

        Betting bettingMember2 = Betting.builder()
                .betSuccess(false)
                .member(member2)
                .team(team)
                .build();
        bettingRepository.save(bettingMember2);

        TeamRuleHistory teamRuleHistory = TeamRuleHistory.builder()
                .team(team)
                .member(member)
                .build();
        teamRuleHistoryRepository.save(teamRuleHistory);
        // when
        teamRuleHistory.complete("123");
        teamService.resultBet();

        // then
        Team updatedTeam = teamRepository.findById(team.getId()).orElseThrow(() -> new RuntimeException("해당 팀이 없습니다."));
        assertThat(updatedTeam.getIsBettingOpen()).isFalse();
    }

    @Test
    void 거래내역을_조회한다() throws Exception{
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

        Team team = Team.builder()
                .title("강김박")
                .fine(1000L)
                .rule("일찍 일어나기")
                .expiredDate(LocalDateTime.now())
                .accountNo("9991980584927168")
                .isBettingOpen(true)
                .targetId(member.getId())
                .memberId(member.getId())
                .build();
        teamRepository.save(team);

        TeamMember teamMember = TeamMember.builder()
                .member(member)
                .team(team)
                .selectedTime(LocalTime.of(14, 10))
                .delayedFine(1000L)
                .build();
        teamMemberRepository.save(teamMember);

        TeamRuleHistory teamRuleHistory1 = TeamRuleHistory.builder()
                .isCompleted(false)
                .member(member)
                .charged(200L)
                .team(team)
                .build();
        teamRuleHistoryRepository.save(teamRuleHistory1);

        TeamRuleHistory teamRuleHistory2 = TeamRuleHistory.builder()
                .isCompleted(false)
                .member(member)
                .charged(200L)
                .team(team)
                .build();
        teamRuleHistoryRepository.save(teamRuleHistory2);

        TeamRuleHistory teamRuleHistory3 = TeamRuleHistory.builder()
                .isCompleted(false)
                .member(member)
                .charged(200L)
                .team(team)
                .build();
        teamRuleHistoryRepository.save(teamRuleHistory3);

        // when
        TeamPersonalTransactionResponseDto teamPersonalTransactionResponseDto = teamService.transactionHistoryListByMemberIdAndTeamId(member.getId(), team.getId());

        //then
        System.out.println(teamPersonalTransactionResponseDto.getList().toString());
        Assertions.assertNotEquals(0, teamPersonalTransactionResponseDto.getList().size());

    }
}
