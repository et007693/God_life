package com.ssafy.god_life.personal.service;

import com.ssafy.god_life.common.BaseTest;
import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.member.repository.MemberRepository;
import com.ssafy.god_life.personal.domain.Personal;
import com.ssafy.god_life.personal.dto.response.CalendarInfoResponseDto;
import com.ssafy.god_life.personal.dto.response.PersonalBoardInfoResponseDto;
import com.ssafy.god_life.personal.history.repository.PersonalRuleHistoryRepository;
import com.ssafy.god_life.personal.history.service.PersonalRuleHistoryService;
import com.ssafy.god_life.personal.history.service.PersonalRuleHistoryServiceImpl;
import com.ssafy.god_life.personal.repository.PersonalRepository;
import com.ssafy.god_life.team.member.dto.request.SetTimeRequestDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class PersonalServiceTest extends BaseTest {

    @Autowired
    PersonalService personalService;

    @Autowired
    PersonalRuleHistoryService personalRuleHistoryService;

    @Autowired
    PersonalRepository personalRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PersonalRuleHistoryRepository personalRuleHistoryRepository;
    @Autowired
    private PersonalRuleHistoryServiceImpl personalRuleHistoryServiceImpl;

    @Transactional
    @Test
    void 개인미션을_조회한다() {
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("ssafy@naver.com")
                .homeName("sss")
                .latitudeSetting(0.0)
                .longitudeSetting(0.0)
                .personal(null)
                .build();

        memberRepository.save(member);

        Personal personal = Personal.builder()
                .rule("규칙")
                .expiredDate(LocalDateTime.now())
                .build();

        personalService.save(personal, member.getId());

        // when & then
        personalService.getDetailByMemberId(member.getId());
    }

    @Test
    void 당일_미션_달성_여부를_조회한다() throws Exception {
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("ssafy@naver.com")
                .personal(null)
                .build();

        Personal personal = Personal.builder()
                .rule("규칙")
                .build();

        memberRepository.save(member);
        personalService.save(personal, member.getId());

        // when
        boolean isCompletedToday = personalService.isCompletedToday(personal.getId());

        // then
        assertThat(isCompletedToday).isEqualTo(false);
    }

    @Test
    void 개인미션생성을_시도한다() throws Exception {
        // given
//        Member member = Member.builder()
//                .id(1L)
//                .nickname("ssafy")
//                .email("ssafy@naver.com")
//                .userKey("bc216ae2-56a3-45ef-bb8c-b257ecd53cfb")
//                .mainAccountNo("9999345084864528")
//                .personal(null)
//                .build();
//
//        Personal personal = Personal.builder()
//                .id(1L)
//                .rule("규칙")
//                .build();
//
//        memberRepository.save(member);
//        personalService.save(personal, member.getId());
//
//        PersonalMissionRequestDto personalMissionRequestDto = PersonalMissionRequestDto.builder()
//                .accountNo("9999345084864528")
//                .money(1000000)
//                .bankCode("090")
//                .rule("")
//                .build();
//        // when
//
//        personalService.createPersonalMission(member.getId(), personalMissionRequestDto);
        // then

    }

    @Test
    void 시간을_설정한다() throws Exception{
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("ssafy@naver.com")
                .homeName("sss")
                .latitudeSetting(0.0)
                .longitudeSetting(0.0)
                .personal(null)
                .build();
        memberRepository.save(member);

        Personal personal = Personal.builder()
                .rule("규칙")
                .expiredDate(LocalDateTime.now())
                .build();
        personalService.save(personal, member.getId());

        // when & then
        personalService.setTime(member.getId(), new SetTimeRequestDto("오전", LocalTime.now()));
    }

    @Test
    void 게시판을_조회한다() throws Exception{
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("ssafy@naver.com")
                .homeName("sss")
                .latitudeSetting(0.0)
                .longitudeSetting(0.0)
                .personal(null)
                .build();
        memberRepository.save(member);

        Personal personal = Personal.builder()
                .rule("규칙")
                .expiredDate(LocalDateTime.now())
                .build();
        personalService.save(personal, member.getId());

        MockMultipartFile picture = new MockMultipartFile(
                "picture",
                "thumbnail.png",
                MediaType.IMAGE_PNG_VALUE,
                "thumbnail".getBytes());

        // when
        personalRuleHistoryService.completeMission(picture, member.getId());
        PersonalBoardInfoResponseDto response = personalService.getBoardInfoByMemberId(member.getId(), 2024, 10);

        // then
        assertThat(response.getSuccessRate()).isEqualTo(100.0f);
        assertThat(response.getDayList().get(0).getDay()).isEqualTo(LocalDate.now().getDayOfMonth());

    }

    @Test
    void 캘린더를_조회한다() throws Exception{
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("ssafy@naver.com")
                .homeName("sss")
                .latitudeSetting(0.0)
                .longitudeSetting(0.0)
                .personal(null)
                .build();
        memberRepository.save(member);

        Personal personal = Personal.builder()
                .rule("규칙")
                .expiredDate(LocalDateTime.now())
                .build();
        personalService.save(personal, member.getId());

        MockMultipartFile picture = new MockMultipartFile(
                "picture",
                "thumbnail.png",
                MediaType.IMAGE_PNG_VALUE,
                "thumbnail".getBytes());

        // when
        personalRuleHistoryService.completeMission(picture, member.getId());
        CalendarInfoResponseDto response = personalService.getCalendarInfoByMemberId(member.getId(), 2024, 10);

        // then
        assertThat(response.getSuccessRate()).isEqualTo(100.0f);
        assertThat(response.getDayList().get(0).isCompleted()).isEqualTo(true);
        assertThat(response.getDayList().get(0).getDay()).isEqualTo(LocalDate.now().getDayOfMonth());
    }

}
