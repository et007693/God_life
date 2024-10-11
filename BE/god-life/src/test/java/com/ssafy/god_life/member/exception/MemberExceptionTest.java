package com.ssafy.god_life.member.exception;

import com.ssafy.god_life.common.BaseTest;
import com.ssafy.god_life.member.service.MemberService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MemberExceptionTest extends BaseTest {

    @Autowired
    MemberService memberService;

    @Test
    void 존재하지_않는_멤버를_조회하면_예외가_발생한다() throws Exception {
        // given & when & then
        Assertions.assertThrows(MemberNotFoundException.class, () -> memberService.getMyPageInfoById(1L));
    }
}
