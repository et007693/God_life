package com.ssafy.god_life.personal.history.service;

import com.ssafy.god_life.common.BaseTest;
import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.member.repository.MemberRepository;
import com.ssafy.god_life.personal.domain.Personal;
import com.ssafy.god_life.personal.history.repository.PersonalRuleHistoryRepository;
import com.ssafy.god_life.personal.repository.PersonalRepository;
import com.ssafy.god_life.personal.service.PersonalService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class PersonalHistoryServiceTest extends BaseTest {

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

    @Test
    void 미션_성공_기록을_저장한다() throws Exception {
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("ssafy@naver.com")
                .personal(null)
                .build();

        memberRepository.save(member);

        Personal personal = Personal.builder()
                .rule("규칙")
                .build();

        personalService.save(personal, member.getId());
        // when
        personalRuleHistoryService.completeMission(new MockMultipartFile(
                "picture",
                "thumbnail.png",
                MediaType.IMAGE_PNG_VALUE,
                "thumbnail".getBytes()), member.getId());
        // then
        assertThat(personalRuleHistoryRepository.findTodayByPersonalId(personal.getId())
                .get().isCompleted()).isEqualTo(true);
    }

}
