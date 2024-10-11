package com.ssafy.god_life.common;

import com.google.gson.Gson;
import com.ssafy.god_life.coupon.controller.CouponController;
import com.ssafy.god_life.coupon.history.service.CouponHistoryService;
import com.ssafy.god_life.coupon.service.CouponService;
import com.ssafy.god_life.global.dto.LoginMember;
import com.ssafy.god_life.global.dto.PrincipalDetail;
import com.ssafy.god_life.global.fintech.service.FintechService;
import com.ssafy.god_life.member.controller.MemberController;
import com.ssafy.god_life.member.domain.MemberRole;
import com.ssafy.god_life.member.repository.MemberRepository;
import com.ssafy.god_life.member.service.MemberService;
import com.ssafy.god_life.personal.controller.PersonalController;
import com.ssafy.god_life.personal.history.repository.PersonalRuleHistoryRepository;
import com.ssafy.god_life.personal.history.service.PersonalRuleHistoryService;
import com.ssafy.god_life.personal.repository.PersonalRepository;
import com.ssafy.god_life.personal.service.PersonalService;
import com.ssafy.god_life.team.betting.service.BettingService;
import com.ssafy.god_life.team.controller.TeamController;
import com.ssafy.god_life.team.history.service.TeamRuleHistoryService;
import com.ssafy.god_life.team.member.controller.TeamMemberController;
import com.ssafy.god_life.team.member.service.TeamMemberService;
import com.ssafy.god_life.team.service.TeamService;
import org.junit.jupiter.api.BeforeAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

@WebMvcTest(controllers = {
        MemberController.class,
        TeamController.class,
        PersonalController.class,
        CouponController.class,
        TeamMemberController.class
})
public abstract class ControllerTest {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected Gson gson;

    @MockBean
    protected MemberService memberService;

    @MockBean
    protected TeamService teamService;

    @MockBean
    protected TeamMemberService teamMemberService;

    @MockBean
    protected CouponService couponService;

    @MockBean
    protected CouponHistoryService couponHistoryService;

    @MockBean
    protected MemberRepository memberRepository;

    @MockBean
    protected FintechService fintechService;

    @MockBean
    protected PersonalService personalService;

    @MockBean
    protected BettingService bettingService;

    @MockBean
    protected PersonalRepository personalRepository;

    @MockBean
    protected PersonalRuleHistoryService personalRuleHistoryService;

    @MockBean
    protected PersonalRuleHistoryRepository personalRuleHistoryRepository;

    @MockBean
    protected TeamRuleHistoryService teamRuleHistoryService;

    public static PrincipalDetail principalDetail;

    @BeforeAll
    static void beforeAll() {
        principalDetail = new PrincipalDetail(new LoginMember(1L, "홍길동", MemberRole.USER.getValue()),
                Collections.singleton(new SimpleGrantedAuthority(MemberRole.USER.getValue())));
    }
}
